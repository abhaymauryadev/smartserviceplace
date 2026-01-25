import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import { createNotification } from "@/lib/notifications";
import Service from "@/models/Service";
import User from "@/models/User";

export async function PATCH(req, { params }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { status } = await req.json();
        if (!["accepted", "rejected", "completed", "cancelled"].includes(status)) {
            return NextResponse.json({ message: "Invalid status" }, { status: 400 });
        }

        await connectDB();

        const booking = await Booking.findById(id).populate("service");
        if (!booking) {
            return NextResponse.json({ message: "Booking not found" }, { status: 404 });
        }

        // Ensure only the provider can update the status (or the user can cancel)
        if (booking.provider.toString() !== session.user.id && status !== "cancelled") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        if (status === "cancelled" && booking.user.toString() !== session.user.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        booking.status = status;
        await booking.save();

        // Notify User
        try {
            const title = status === "accepted" ? "Booking Accepted" : "Booking Rejected";
            const message = status === "accepted"
                ? `Your booking for "${booking.service?.title}" has been accepted by the provider.`
                : `Your booking for "${booking.service?.title}" has been rejected.`;

            await createNotification({
                user: booking.user,
                title,
                message,
                type: "booking",
                actionUrl: "/dashboard/user/bookings",
                icon: status === "accepted" ? "✅" : "❌"
            });
        } catch (notifError) {
            console.error("Failed to send notification:", notifError);
        }

        return NextResponse.json(booking);
    } catch (error) {
        console.error("Error updating booking:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

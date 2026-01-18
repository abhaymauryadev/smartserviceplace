import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Notification from "@/models/Notification";

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const { searchParams } = new URL(req.url);
        const filter = { user: session.user.id };

        const type = searchParams.get("type");
        if (type && type !== "all") {
            filter.type = type;
        }

        const notifications = await Notification.find(filter).sort({ createdAt: -1 });

        return NextResponse.json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return NextResponse.json(
            { message: "Failed to fetch notifications", error: error.message },
            { status: 500 }
        );
    }
}

export async function PATCH(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { ids, action } = await req.json();
        await connectDB();

        if (action === "markAsRead") {
            let updateFilter = { user: session.user.id };
            if (ids && ids.length > 0) {
                updateFilter._id = { $in: ids };
            }

            await Notification.updateMany(updateFilter, { status: "read" });
            return NextResponse.json({ message: "Notifications marked as read" });
        }

        return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    } catch (error) {
        console.error("Error updating notifications:", error);
        return NextResponse.json(
            { message: "Failed to update notifications", error: error.message },
            { status: 500 }
        );
    }
}

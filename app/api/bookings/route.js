import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import { createNotification } from "@/lib/notifications";
import Service from "@/models/Service";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const bookings = await Booking.find({
      $or: [{ user: session.user.id }, { provider: session.user.id }],
    })
      .populate("service")
      .populate("user", "name")
      .populate("provider", "name");

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectDB();

    const booking = await Booking.create({
      ...body,
      user: session.user.id,
    });

    // Notify Provider
    try {
      const service = await Service.findById(booking.service);
      await createNotification({
        user: booking.provider,
        title: "New Booking Received",
        message: `You have a new booking for "${service?.title || 'your service'}" from ${session.user.name}.`,
        type: "booking",
        actionUrl: "/dashboard/provider/bookings",
        icon: "📅"
      });
    } catch (notifError) {
      console.error("Failed to send notification:", notifError);
      // Don't fail the booking if notification fails
    }

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}



import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET(req) {
  try {
    const session = await getServerSession(req, authOptions);
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
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }

  try {
    const session = await getServerSession(req, authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Count bookings by status for this user/provider
    const [newRequests, upcoming, completed, cancelled] = await Promise.all([
      Booking.countDocuments({ user: session.user.id, status: "new" }),
      Booking.countDocuments({ user: session.user.id, status: "upcoming" }),
      Booking.countDocuments({ user: session.user.id, status: "completed" }),
      Booking.countDocuments({ user: session.user.id, status: "cancelled" }),
    ]);

    return NextResponse.json({
      newRequests,
      upcoming,
      completed,
      cancelled,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }


}

export async function POST(req) {
  try {
    const session = await getServerSession(req, authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectDB();

    const booking = await Booking.create({
      ...body,
      user: session.user.id,
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

// export async function GET(req) {
  
// }

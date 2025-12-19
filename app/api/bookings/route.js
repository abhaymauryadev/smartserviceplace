import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET() {
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
}

export async function POST(req) {
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

  return NextResponse.json(booking, { status: 201 });
}

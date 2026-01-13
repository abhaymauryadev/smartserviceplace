import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import ProviderCalendar from "@/components/calendar/ProviderCalendar";

async function getBookings(providerId) {
  await connectDB();

  const bookings = await Booking.find({
    provider: providerId,
    status: { $in: ["confirmed", "pending"] },
  })
    .populate("service")
    .lean();

  return bookings.map((b) => ({
    id: b._id.toString(),
    title: b.service?.title || "Booking",
    start: b.startTime,   // MUST be ISO date
    end: b.endTime,       // MUST be ISO date
    status: b.status,
  }));
}

export default async function CalendarPage() {
  const session = await getServerSession(authOptions);
  const events = await getBookings(session.user.id);

  return <ProviderCalendar events={events} />;
}

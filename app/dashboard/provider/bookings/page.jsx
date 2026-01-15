import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

import BookingsHeader from "@/components/booking/BookingsHeader";
import BookingStatus from "@/components/booking/BookingStatus";
import BookingFilters from "@/components/booking/BookingFilters";
import BookingTabs from "@/components/booking/BookingTabs";
import BookingCard from "@/components/booking/BookingCard";
import EmptyBookings from "@/components/booking/EmptyBookings";

async function getBookings(providerId) {
  await connectDB();
  return Booking.find({ provider: providerId })
    .populate("service")
    .populate("user", "name")
    .lean();
}

export default async function ProviderBookingsPage() {
  const session = await getServerSession(authOptions);
  const bookings = await getBookings(session.user.id);

  return (
    <div className="p-4 sm:p-6 space-y-6 text-black">
      <BookingsHeader user={session.user} />

      <BookingStatus bookings={JSON.parse(JSON.stringify(bookings))} />
    
      <BookingFilters />

      <BookingTabs  />

      {bookings.length === 0 ? (
        <EmptyBookings />
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}

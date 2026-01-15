"use client";

export default function EmptyBookings({ message = "No bookings found." }) {
  return (
    <div className="text-center text-gray-500 py-10">
      {message}
    </div>
  );
}
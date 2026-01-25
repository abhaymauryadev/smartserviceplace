"use client";

import BookingCard from "./BookingCard";

export default function ProviderBookingsList({ bookings, onUpdateStatus }) {
    const onAccept = (booking) => onUpdateStatus(booking._id, "accepted");
    const onReject = (booking) => onUpdateStatus(booking._id, "rejected");

    return (
        <div className="space-y-4">
            {bookings.map((booking) => (
                <BookingCard
                    key={booking._id}
                    booking={booking}
                    onAccept={onAccept}
                    onReject={onReject}
                />
            ))}
        </div>
    );
}

"use client";

import { useState } from "react";
import BookingCard from "./BookingCard";
import { toast } from "react-hot-toast";

export default function ProviderBookingsList({ initialBookings }) {
    const [bookings, setBookings] = useState(initialBookings);

    const handleUpdateStatus = async (bookingId, newStatus) => {
        try {
            const response = await fetch(`/api/bookings/${bookingId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update status");
            }

            const updatedBooking = await response.json();

            setBookings((prev) =>
                prev.map((b) => (b._id === bookingId ? { ...b, status: updatedBooking.status } : b))
            );

            toast.success(`Booking ${newStatus} successfully!`);
        } catch (error) {
            console.error("Error updating booking status:", error);
            toast.error(error.message || "Something went wrong");
        }
    };

    const onAccept = (booking) => handleUpdateStatus(booking._id, "accepted");
    const onReject = (booking) => handleUpdateStatus(booking._id, "rejected");

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

"use client";

import { useState } from "react";
import BookingTabs from "./BookingTabs";
import ProviderBookingsList from "./ProviderBookingsList";
import EmptyBookings from "./EmptyBookings";
import { toast } from "react-hot-toast";

export default function ProviderBookingsMain({ initialBookings }) {
    const [bookings, setBookings] = useState(initialBookings);
    const [selectedTab, setSelectedTab] = useState("newRequests");

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
                prev.map((b) =>
                    b._id === bookingId ? { ...b, status: updatedBooking.status } : b
                )
            );

            toast.success(`Booking ${newStatus} successfully!`);
        } catch (error) {
            console.error("Error updating booking status:", error);
            toast.error(error.message || "Something went wrong");
        }
    };

    const getFilteredBookings = () => {
        switch (selectedTab) {
            case "newRequests":
                return bookings.filter((b) => b.status === "pending");
            case "upcoming":
                return bookings.filter((b) => b.status === "accepted");
            case "completed":
                return bookings.filter((b) => b.status === "completed");
            case "cancelled":
                return bookings.filter((b) => ["cancelled", "rejected"].includes(b.status));
            default:
                return bookings;
        }
    };

    const filteredBookings = getFilteredBookings();

    return (
        <>
            <BookingTabs onTabChange={setSelectedTab} />

            {filteredBookings.length === 0 ? (
                <EmptyBookings />
            ) : (
                <ProviderBookingsList
                    bookings={filteredBookings}
                    onUpdateStatus={handleUpdateStatus}
                />
            )}
        </>
    );
}

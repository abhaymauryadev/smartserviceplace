"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

/* ✅ Tailwind-safe status colors */
const statusStyles = {
  green: "bg-green-100 text-green-700",
  blue: "bg-blue-100 text-blue-700",
  gray: "bg-gray-100 text-gray-700",
  red: "bg-red-100 text-red-700",
  yellow: "bg-yellow-100 text-yellow-700",
};

// Helper function to get status display info
const getStatusInfo = (status) => {
  const statusMap = {
    pending: { label: "Pending", color: "yellow", note: "Waiting for provider confirmation" },
    accepted: { label: "Confirmed", color: "blue", note: "Booking confirmed" },
    "in-progress": { label: "In Progress", color: "green", note: "Service in progress" },
    completed: { label: "Completed", color: "gray", note: "Service completed successfully" },
    cancelled: { label: "Cancelled", color: "red", note: "Booking cancelled" },
    rejected: { label: "Rejected", color: "red", note: "Booking rejected by provider" },
  };
  return statusMap[status] || { label: status, color: "gray", note: "" };
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });
};

// Helper function to format time range
const formatTimeRange = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const startStr = start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const endStr = end.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return `${startStr} – ${endStr}`;
};

export default function DashboardUI({ user }) {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/bookings");

        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const bookings = await res.json();
        console.log("Fetched bookings:", bookings);

        // Transform and separate bookings
        const upcoming = [];
        const history = [];

        bookings.forEach((booking) => {
          const statusInfo = getStatusInfo(booking.status);

          const transformedBooking = {
            id: booking._id,
            title: booking.service?.name || "Service",
            provider: booking.service?.businessName || booking.provider?.name || "Provider",
            status: statusInfo.label,
            statusColor: statusInfo.color,
            name: booking.provider?.name || "Provider",
            note: statusInfo.note,
            date: formatDate(booking.startTime),
            time: formatTimeRange(booking.startTime, booking.endTime),
            rawStatus: booking.status,
          };

          // Separate upcoming from history
          if (["pending", "accepted", "in-progress"].includes(booking.status)) {
            upcoming.push(transformedBooking);
          } else {
            history.push(transformedBooking);
          }
        });

        setUpcomingBookings(upcoming);
        setBookingHistory(history);
        setError(null);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const renderCard = (data) => (
    <div className="bg-white rounded-xl shadow-sm p-5 border flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="font-semibold text-base sm:text-lg text-black">
            {booking.title}
          </h3>
          <p className="text-sm text-gray-500">
            with {booking.provider}
          </p>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${statusStyles[booking.statusColor]
            }`}
        >
          {booking.status}
        </span>
      </div>

      {/* Provider */}
      <div className="flex items-center gap-3 mt-4">
        <Image
          src="/assets/avatar.png"
          alt="Provider"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="font-medium text-sm text-black">
            {booking.name}
          </p>
          <p className="text-xs text-gray-500">
            {booking.note}
          </p>
        </div>
      </div>

      {/* Date */}
      <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600 mt-4 gap-1">
        <span>{booking.date}</span>
        <span>{booking.time}</span>
      </div>

      {/* Actions */}
      <div className="mt-5 flex gap-3 text-black">
        {activeTab === "upcoming" ? (
          <>
            <button className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700">
              Contact
            </button>
            <button className="flex-1 border rounded-lg py-2 text-sm font-medium hover:bg-gray-50">
              Reschedule
            </button>
          </>
        ) : (
          <button className="flex-1 border rounded-lg py-2 text-sm font-medium hover:bg-gray-50">
            View Receipt
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-50 h-full overflow-y-auto">
      {/* Header */}
      <h1 className="text-xl sm:text-2xl font-bold text-black">
        Welcome, {user?.name}
      </h1>
      <p className="text-gray-600 mb-6 text-sm sm:text-base">
        Manage your bookings and profile.
      </p>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-medium">Error loading bookings</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {/* Tabs */}
          <div className="flex gap-4 sm:gap-6 border-b mb-6 overflow-x-auto">
            {["upcoming", "history"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 font-medium whitespace-nowrap ${activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-black"
                  }`}
              >
                {tab === "upcoming" ? "Upcoming Bookings" : "Booking History"}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {(activeTab === "upcoming"
              ? upcomingBookings
              : bookingHistory
            ).map((booking, i) => (
              <div key={booking.id || i}>{renderCard(booking)}</div>
            ))}
          </div>

          {/* Empty State */}
          {((activeTab === "upcoming" && upcomingBookings.length === 0) ||
            (activeTab === "history" && bookingHistory.length === 0)) && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-16 w-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {activeTab === "upcoming" ? "upcoming" : "past"} bookings
                </h3>
                <p className="text-gray-500">
                  {activeTab === "upcoming"
                    ? "You don't have any upcoming bookings yet."
                    : "You don't have any booking history yet."}
                </p>
              </div>
            )}
        </>
      )}
    </div>
  );
}

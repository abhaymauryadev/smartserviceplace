"use client";

import React, { useState } from "react";
import Image from "next/image";

/* ✅ Tailwind-safe status colors */
const statusStyles = {
  green: "bg-green-100 text-green-700",
  blue: "bg-blue-100 text-blue-700",
  gray: "bg-gray-100 text-gray-700",
  red: "bg-red-100 text-red-700",
};

export default function DashboardUI({ user }) {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingBookings = [
    {
      title: "Deep House Cleaning",
      provider: "ProClean Services",
      status: "In Progress",
      statusColor: "green",
      name: "John Doe",
      note: "Provider is on the way",
      date: "Tue, 28 May",
      time: "2:00 PM – 4:00 PM",
    },
    {
      title: "Lawn Mowing",
      provider: "GreenScape Experts",
      status: "Confirmed",
      statusColor: "blue",
      name: "Jane Smith",
      note: "Booking confirmed",
      date: "Fri, 31 May",
      time: "10:00 AM",
    },
  ];

  const bookingHistory = [
    {
      title: "Window Cleaning",
      provider: "ShinyGlass Co.",
      status: "Completed",
      statusColor: "gray",
      name: "Alex Johnson",
      note: "Service completed successfully",
      date: "Mon, 20 May",
      time: "11:00 AM – 12:00 PM",
    },
    {
      title: "Carpet Shampoo",
      provider: "FreshFloors Ltd.",
      status: "Cancelled",
      statusColor: "red",
      name: "Emily Davis",
      note: "Booking cancelled by user",
      date: "Sat, 18 May",
      time: "3:00 PM – 5:00 PM",
    },
  ];

  const renderCard = (booking) => (
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
          className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${
            statusStyles[booking.statusColor]
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

      {/* Tabs */}
      <div className="flex gap-4 sm:gap-6 border-b mb-6 overflow-x-auto">
        {["upcoming", "history"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 font-medium whitespace-nowrap ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {tab === "upcoming" ? "Upcoming Bookings" : "Booking History"}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        xl:grid-cols-3 
        gap-6
      ">
        {(activeTab === "upcoming"
          ? upcomingBookings
          : bookingHistory
        ).map((booking, i) => (
          <div key={i}>{renderCard(booking)}</div>
        ))}
      </div>
    </div>
  );
}

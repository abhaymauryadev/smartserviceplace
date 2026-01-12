"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function DashboardUI({ user }) {
    const [activeTab, setActiveTab] = useState("upcoming");

    // Simulated booking data
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
        <div className="bg-white rounded-xl shadow-sm p-5 border">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-lg text-black">{booking.title}</h3>
                    <p className="text-sm text-gray-500">with {booking.provider}</p>
                </div>
                <span
                    className={`text-xs px-3 py-1 rounded-full bg-${booking.statusColor}-100 text-${booking.statusColor}-700`}
                >
                    {booking.status}
                </span>
            </div>

            <div className="flex items-center gap-3 mt-4">
                <Image
                    src="/assets/"
                    alt="Provider"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <div>
                    <p className="font-medium text-sm text-black">{booking.name}</p>
                    <p className="text-xs text-gray-500">{booking.note}</p>
                </div>
            </div>

            <div className="flex justify-between text-sm text-gray-600 mt-4">
                <span>{booking.date}</span>
                <span>{booking.time}</span>
            </div>

            {activeTab === "upcoming" ? (
                <div className="flex gap-3 mt-5">
                    <button className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 cursor-pointer">
                        Contact
                    </button>
                    <button className="text-black flex-1 border rounded-lg py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer">
                        Reschedule
                    </button>
                </div>
            ) : (
                <div className="flex gap-3 mt-5">
                    <button className="flex-1 border rounded-lg py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer">
                        View Receipt
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold capitalize text-black">
                Welcome, {user?.name}
            </h1>
            <p className="text-gray-600 mb-6">Manage your bookings and profile.</p>

            {/* Tabs */}
            <div className="flex gap-6 border-b mb-6">
                <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`pb-3 font-medium ${activeTab === "upcoming"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-black"
                        }`}
                >
                    Upcoming Bookings
                </button>
                <button
                    onClick={() => setActiveTab("history")}
                    className={`pb-3 font-medium ${activeTab === "history"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-black"
                        }`}
                >
                    Booking History
                </button>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 w-[45rem]">
                {activeTab === "upcoming"
                    ? upcomingBookings.map((b, i) => <div key={i}>{renderCard(b)}</div>)
                    : bookingHistory.map((b, i) => <div key={i}>{renderCard(b)}</div>)}
            </div>
        </div>
    );
}

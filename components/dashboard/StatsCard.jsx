"use client";

import { TrendingUp, Calendar, Star, Briefcase } from "lucide-react";

export default function StatsCards({ data }) {
  const stats = [
    {
      title: "Total Earnings",
      value: data?.totalEarnings ? `₹${data.totalEarnings.toLocaleString()}` : "₹0",
      icon: TrendingUp,
      change: data?.earningsChange || "0%",
      color: "green",
    },
    {
      title: "Total Bookings",
      value: data?.totalBookings || "0",
      icon: Calendar,
      change: data?.bookingsChange || "0%",
      color: "blue",
    },
    {
      title: "Active Services",
      value: data?.activeServices || "0",
      icon: Briefcase,
      change: data?.servicesChange || "0 changed",
      color: "gray",
    },
    {
      title: "Average Rating",
      value: data?.averageRating || "0.0",
      icon: Star,
      change: data?.ratingChange || "+0.0",
      color: "purple",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="bg-white border rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <span className={`text-xs text-${stat.color}-600 font-semibold`}>
                {stat.change}
              </span>
            </div>

            <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
              <Icon size={18} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

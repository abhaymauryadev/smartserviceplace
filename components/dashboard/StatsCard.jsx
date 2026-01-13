"use client";

import { TrendingUp, Calendar, Star, Briefcase } from "lucide-react";

const stats = [
  {
    title: "Total Earnings",
    value: "₹12,450",
    icon: TrendingUp,
    change: "+12.5%",
    color: "green",
  },
  {
    title: "Total Bookings",
    value: "1,204",
    icon: Calendar,
    change: "+8.2%",
    color: "blue",
  },
  {
    title: "Active Services",
    value: "8",
    icon: Briefcase,
    change: "0 changed",
    color: "gray",
  },
  {
    title: "Average Rating",
    value: "4.9",
    icon: Star,
    change: "+0.2",
    color: "purple",
  },
];

export default function StatsCards() {
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
              <span className={`text-xs text-${stat.color}-600`}>
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

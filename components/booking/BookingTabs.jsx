"use client";
import { useState, useEffect } from "react";

export default function BookingTabs({ onTabChange }) {
  const [counts, setCounts] = useState({
    newRequests: 0,
    upcoming: 0,
    completed: 0,
    cancelled: 0,
  });

  const [selectedTab, setSelectedTab] = useState("newRequests");

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch("/api/bookings/counts"); // ✅ add leading slash
        const data = await res.json();
        setCounts(data);
      } catch (error) {
        console.error("Failed to fetch booking counts", error);
      }
    };
    fetchCounts();
  }, []);

  const tabs = [
    { key: "newRequests", label: "New Requests", value: counts.newRequests },
    { key: "upcoming", label: "Upcoming", value: counts.upcoming },
    { key: "completed", label: "Completed", value: counts.completed },
    { key: "cancelled", label: "Cancelled", value: counts.cancelled },
  ];

  const handleTabClick = (key) => {
    setSelectedTab(key);
    onTabChange(key); // pass status key to parent
  };

  return (
    <div className="flex gap-6 border-b text-sm overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => handleTabClick(tab.key)}
          className={`pb-3 whitespace-nowrap ${
            selectedTab === tab.key
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-black"
          }`}
        >
          {tab.label} ({tab.value})
        </button>
      ))}
    </div>
  );
}
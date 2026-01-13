"use client";

export default function BookingTabs() {
  const tabs = [
    "New Requests (5)",
    "Upcoming (12)",
    "Completed (42)",
    "Cancelled (3)",
  ];

  return (
    <div className="flex gap-6 border-b text-sm overflow-x-auto">
      {tabs.map((tab, i) => (
        <button
          key={i}
          className={`pb-3 whitespace-nowrap ${
            i === 0
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-black"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

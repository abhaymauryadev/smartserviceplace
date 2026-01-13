"use client";

import { Search } from "lucide-react";

export default function ServicesFilters() {
  return (
    <div className="flex flex-col lg:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        <input
          placeholder="Search by service name..."
          className="w-full pl-9 pr-3 py-2 border rounded-md text-sm"
        />
      </div>

      {/* Status */}
      <div className="flex gap-2 flex-wrap">
        {["All", "Active", "Paused", "Draft"].map((s) => (
          <button
            key={s}
            className="px-3 py-1.5 border rounded-md text-sm hover:bg-gray-100"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { Search } from "lucide-react";

export default function BookingFilters() {
  return (
    <div className="flex flex-col lg:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        <input
          placeholder="Search by client name or service"
          className="w-full pl-9 pr-3 py-2 border rounded-md text-sm"
        />
      </div>

      <select className="border rounded-md px-3 py-2 text-sm">
        <option>Date Range</option>
      </select>

      <select className="border rounded-md px-3 py-2 text-sm">
        <option>Service Type</option>
      </select>
    </div>
  );
}

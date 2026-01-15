"use client";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { Search } from "lucide-react";

export default function BookingFilters() {
  const initialBookings = [];
  const user = {};

  const [data, setData] = useState(initialBookings);

  // Filters as state
  const [filters, setFilters] = useState({
    search: "",
    dateRange: "",
    serviceType: "",
    status: "",
  });

  // Debounced search value (optional)
  const debouncedSearch = useDebounce(filters.search, 300);

  // Handle Filter Change
  const onFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-3">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        <input
          placeholder="Search by client name or service"
          className="w-full pl-9 pr-3 py-2 border rounded-md text-sm"
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
        />
      </div>

      {/* Date Range */}
      <select
        className="border rounded-md px-3 py-2 text-sm"
        value={filters.dateRange}
        onChange={(e) => onFilterChange("dateRange", e.target.value)}
      >
        <option value="">Date Range</option>
        <option value="thisWeek">This Week</option>
        <option value="thisMonth">This Month</option>
        <option value="lastMonth">Last Month</option>
      </select>

      {/* Service Type */}
      <select
        className="border rounded-md px-3 py-2 text-sm"
        value={filters.serviceType}
        onChange={(e) => onFilterChange("serviceType", e.target.value)}
      >
        <option value="">Service Type</option>
        <option value="type1">Service Type 1</option>
        <option value="type2">Service Type 2</option>
      </select>
    </div>
  );
}
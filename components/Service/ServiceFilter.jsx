"use client";

export default function ServiceFilter({ onFilter }) {
  return (
    <div className="flex gap-3 mb-4">
      <input
        type="text"
        placeholder="Search service..."
        className="border p-2 rounded w-full"
        onChange={(e) => onFilter(e.target.value)}
      />
    </div>
  );
}

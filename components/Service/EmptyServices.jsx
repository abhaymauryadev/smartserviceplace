"use client";

import { Plus } from "lucide-react";

export default function EmptyServices() {
  return (
    <div className="border-2 border-dashed rounded-xl p-8 text-center max-w-sm">
      <div className="mx-auto w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
        <Plus className="text-blue-600" />
      </div>

      <h3 className="font-semibold text-black mb-1">
        Add your first service
      </h3>

      <p className="text-sm text-gray-500 mb-4">
        You haven’t added any services yet. Click below to get started.
      </p>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
        + Add New Service
      </button>
    </div>
  );
}

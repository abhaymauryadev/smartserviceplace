"use client";

export default function ServicesHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-black">
          Manage Your Services
        </h1>
        <p className="text-sm text-gray-500">
          Add, edit, and manage your service listings.
        </p>
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
        + Add New Service
      </button>
    </div>
  );
}

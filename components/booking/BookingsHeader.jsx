"use client";

export default function BookingsHeader({ user }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-black">Bookings</h1>
        <p className="text-sm text-gray-500">
          Welcome, {user.name}!
        </p>
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
        + New Service
      </button>
    </div>
  );
}

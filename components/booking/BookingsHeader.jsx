"use client";

import { useRouter } from "next/navigation";

export default function BookingsHeader({ user }) {
  const router = useRouter();
  return (
    <div className="flex flexcol sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-black">Bookings</h1>
        <p className="text-sm text-gray-500">
          Welcome, {user.name}!
        </p>
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 " aria-label="New Service"
       onClick={() => router.push("/dashboard/provider/services")}>
        + New Service
      </button>
    </div>
  );
}

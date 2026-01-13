"use client";

import Image from "next/image";

export default function BookingCard({ booking }) {
  return (
    <div className="bg-white border rounded-xl p-4 space-y-3">
      <div className="flex justify-between items-start gap-4">
        <div className="flex gap-3">
          <Image
            src="/avatar.png"
            alt="User"
            width={40}
            height={40}
            className="rounded-full"
          />

          <div>
            <p className="font-semibold">{booking.user?.name}</p>
            <p className="text-sm text-gray-500">
              {booking.service?.title}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              📅 Oct 28, 2023 · ⏱ 4 hours · 💰 ₹450
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="bg-red-100 text-red-600 px-3 py-1.5 rounded-md text-sm hover:bg-red-200">
            Reject
          </button>
          <button className="bg-green-100 text-green-700 px-3 py-1.5 rounded-md text-sm hover:bg-green-200">
            Accept
          </button>
        </div>
      </div>

      {booking.notes && (
        <p className="text-sm text-gray-600 border-t pt-3">
          <strong>Notes:</strong> “{booking.notes}”
        </p>
      )}
    </div>
  );
}

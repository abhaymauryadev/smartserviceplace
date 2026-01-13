"use client";

import Image from "next/image";
import { Pencil, Trash2, Calendar } from "lucide-react";

const statusStyles = {
  active: "bg-green-100 text-green-700",
  paused: "bg-yellow-100 text-yellow-700",
  draft: "bg-gray-100 text-gray-700",
};

export default function ServiceCard({ service }) {
  const status = service.status?.toLowerCase() || "draft";

  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col">
      {/* Image */}
      <div className="relative h-40">
        <Image
          src={service.image || "/placeholder.jpg"}
          alt={service.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-black text-sm">
            {service.title}
          </h3>

          <span
            className={`text-xs px-2 py-1 rounded-full ${statusStyles[status]}`}
          >
            {service.status}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {service.description}
        </p>

        <p className="font-semibold mt-3">
          ₹{service.price}{" "}
          <span className="text-sm font-normal text-gray-500">
            / session
          </span>
        </p>

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-4">
          <button className="flex-1 flex items-center justify-center gap-1 border rounded-md py-1.5 text-sm hover:bg-gray-50">
            <Pencil size={14} /> Edit
          </button>

          <button className="p-2 border rounded-md hover:bg-gray-50">
            <Calendar size={14} />
          </button>

          <button className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

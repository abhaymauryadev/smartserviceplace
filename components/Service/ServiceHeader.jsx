"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ServiceForm from "./ServiceForm";

export default function ServicesHeader() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black">
            Manage Your Services
          </h1>
          <p className="text-sm text-gray-500">
            Add, edit, and manage your service listings.
          </p>
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
          onClick={() => setIsModalOpen(true)}
        >
          + Add New Service
        </button>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm h-full">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200">
            {/* Close Button is handled inside Form or we can add one here */}
            <ServiceForm onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

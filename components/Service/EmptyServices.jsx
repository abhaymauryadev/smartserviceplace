"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import ServiceForm from "./ServiceForm";

export default function EmptyServices() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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

      <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
       onClick={() => setIsModalOpen(true)}>
        + Add New Service
      </button>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200">
            {/* Close Button is handled inside Form or we can add one here */}
            <ServiceForm onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
      </div>
  );
}

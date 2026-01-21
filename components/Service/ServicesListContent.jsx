"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ServiceSideBar from "@/components/common/ServiceSideBar";
import { Filter } from "lucide-react";

export default function ServicesListContent({ services }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-white">
            {/* Mobile Header with Filter Toggle */}
            <div className="lg:hidden flex items-center justify-between p-4 border-b">
                <h1 className="text-xl font-bold text-black">Services</h1>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                    <Filter size={18} />
                    Filters
                </button>
            </div>

            <ServiceSideBar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-black">
                <div className="hidden lg:flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Available Services</h1>
                    <p className="text-gray-500">{services.length} services found</p>
                </div>

                {services.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <p className="text-xl text-gray-500">No services found match your criteria.</p>
                    </div>
                )}

                {services.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => {
                            const description = service.description || "";
                            const truncatedDescription = description.length > 80
                                ? `${description.slice(0, 80)}...`
                                : description;

                            return (
                                <div
                                    key={service._id}
                                    className="group border border-gray-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 bg-white"
                                >
                                    <div className="relative h-48 w-full bg-gray-50">
                                        {service.images && service.images.length > 0 ? (
                                            <Image
                                                src={service.images[0]}
                                                alt={service.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition duration-500"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400">
                                                No Image
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-blue-600 shadow-sm">
                                            ₹{service.price}
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <h2 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                            {service.title}
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-2 line-clamp-2 min-h-[40px]">
                                            {truncatedDescription}
                                        </p>

                                        <div className="mt-6 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                                                    {service.provider?.name?.charAt(0) || "P"}
                                                </div>
                                                <span className="text-xs text-gray-600 font-medium">
                                                    {service.provider?.name || "Provider"}
                                                </span>
                                            </div>

                                            <Link
                                                href={`/services/${service._id}`}
                                                className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
                                            >
                                                Details
                                                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}


import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/sections/Footer';
import Link from 'next/link';
import { Search, CalendarCheck, MessageCircle, CreditCard } from "lucide-react";

// 1. Extract Card Component
function Card({ title, description }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">
                {title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    );
}

// 2. Extract TimelineItem Component
function TimelineItem({ align, icon, title, description }) {
    const isLeft = align === "left";

    return (
        <div className="relative mb-16 flex items-center justify-between">
            {/* Left Card */}
            {isLeft && (
                <div className="w-5/12">
                    <Card title={title} description={description} />
                </div>
            )}

            {/* Icon */}
            <div className="absolute left-1/2 -translate-x-1/2 z-10">
                <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">
                    {icon}
                </div>
            </div>

            {/* Right Card */}
            {!isLeft && (
                <div className="w-5/12 ml-auto">
                    <Card title={title} description={description} />
                </div>
            )}
        </div>
    );
}

// 3. Main Page Component
export default function HowItWorksPage() {
    return (
        <main className="bg-gray-50 min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gray-100 text-black py-20">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple. Transparent. Reliable.</h1>
                    <p className="text-xl text-gray-900 max-w-3xl mx-auto">
                        Whether you're looking to get a task done or grow your service business, ServeSphere connects you with the right people in just a few clicks.
                    </p>

                    <div className="flex justify-center items-center gap-6 pt-12 w-full">
                        <Link
                            href="/services"
                            className="px-8 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Browse Services
                        </Link>

                        <Link
                            href="/register"
                            className="px-8 py-3 border border-gray-300 text-black hover:bg-gray-200 rounded transition"
                        >
                            Become a Provider
                        </Link>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6">

                    {/* Header */}
                    <div className="text-center mb-20">
                        <p className="text-sm font-semibold text-blue-600 tracking-wide uppercase">
                            Customer Journey
                        </p>
                        <h2 className="text-4xl font-bold text-gray-900 mt-2">
                            How to Book a Service
                        </h2>
                    </div>

                    {/* Timeline */}
                    <div className="relative">

                        {/* Vertical Line */}
                        <div className="absolute left-1/2 top-0 h-full w-px bg-gray-200 -translate-x-1/2" />

                        {/* Step 1 */}
                        <TimelineItem
                            align="right"
                            icon={<Search size={18} />}
                            title="1. Search and Discover"
                            description="Enter the service you need and your location. Filter results by price, ratings, and availability to find your perfect match."
                        />

                        {/* Step 2 */}
                        <TimelineItem
                            align="left"
                            icon={<CalendarCheck size={18} />}
                            title="2. Compare & Book"
                            description="Review provider profiles, previous work photos, and verified customer feedback. Pick a time slot that works for you and book instantly."
                        />

                        {/* Step 3 */}
                        <TimelineItem
                            align="right"
                            icon={<MessageCircle size={18} />}
                            title="3. Real-time Communication"
                            description="Use our built-in secure chat to discuss details, share photos of the task, and stay updated on the provider's arrival."
                        />

                        {/* Step 4 */}
                        <TimelineItem
                            align="left"
                            icon={<CreditCard size={18} />}
                            title="4. Secure Payment & Review"
                            description="Payment is held securely and only released once the job is marked complete. Leave a review to help others in the community."
                        />

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

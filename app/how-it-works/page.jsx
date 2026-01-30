"use client";
import React, { useState, useRef, useEffect } from "react";
import Navbar from '@/components/common/Navbar';
import Footer from '@/sections/Footer';
import Link from 'next/link';
import Image from 'next/image';
import gsap from "gsap";
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

const faqs = [
    {
        q: "What is this product used for?",
        a: "It helps teams streamline workflows, improve usability, and ship faster with confidence.",
    },
    {
        q: "Is this suitable for small teams?",
        a: "Yes. It works equally well for solo founders, startups, and large organizations.",
    },
    {
        q: "Does it support modern frameworks?",
        a: "Absolutely. It is designed to integrate seamlessly with modern frontend stacks.",
    },
    {
        q: "Is customer support available?",
        a: "Yes, we provide fast and reliable support to help you succeed.",
    },
];
// 3. Main Page Component
export default function HowItWorksPage() {


    const [activeIndex, setActiveIndex] = useState(null);
    const contentRefs = useRef([]);

    useEffect(() => {
        contentRefs.current.forEach((el, i) => {
            if (!el) return;

            if (i === activeIndex) {
                gsap.to(el, {
                    height: "auto",
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out",
                });
            } else {
                gsap.to(el, {
                    height: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                });
            }
        });
    }, [activeIndex]);
    return (
        <main className="bg-gray-50 min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gray-100 text-black py-20 px-6">
                <div className="max-w-7xl mx-auto text-center">

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                        Simple. Transparent. Reliable.
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-gray-900 max-w-3xl mx-auto">
                        Whether you're looking to get a task done or grow your service business,
                        ServeSphere connects you with the right people in just a few clicks.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-12">
                        <Link
                            href="/services"
                            className="w-full sm:w-auto px-8 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-center"
                        >
                            Browse Services
                        </Link>

                        <Link
                            href="/register"
                            className="w-full sm:w-auto px-8 py-3 border border-gray-300 text-black hover:bg-gray-200 rounded transition text-center"
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


            <section className="bg-white py-20 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 text-black">

                    {/* Image */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <Image
                            src="/assets/hero-image.png"
                            alt="Platform illustration"
                            width={500}
                            height={500}
                            priority
                            className="rounded-3xl object-contain"
                        />
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <h1 className="text-3xl md:text-4xl font-bold">
                            Your Peace of Mind is Our Priority
                        </h1>

                        <div>
                            <h2 className="text-xl md:text-2xl font-semibold mb-2">
                                Certified Professionals
                            </h2>
                            <p className="text-gray-600 text-base md:text-lg">
                                Each provider is thoroughly vetted, background-checked, and
                                verified to ensure consistent quality.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl md:text-2xl font-semibold mb-2">
                                Effortless Scheduling
                            </h2>
                            <p className="text-gray-600 text-base md:text-lg">
                                Book services instantly with clear availability and upfront
                                pricing—no surprises, just convenience.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl md:text-2xl font-semibold mb-2">
                                Trusted Transactions
                            </h2>
                            <p className="text-gray-600 text-base md:text-lg">
                                Complete payments safely through our platform, released only
                                once your service is delivered.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            <section className="py-32 bg-gray-100 text-black">
                <h2 className="text-4xl font-bold text-center mb-20">
                    Frequently Asked Questions
                </h2>

                <div className="max-w-3xl mx-auto space-y-4 px-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="border border-gray-200 rounded-xl bg-white shadow-sm"
                        >
                            <button
                                onClick={() =>
                                    setActiveIndex(activeIndex === i ? null : i)
                                }
                                className="w-full flex justify-between items-center p-6 text-left"
                            >
                                <span className="font-medium text-gray-900">
                                    {faq.q}
                                </span>
                                <span className="text-xl">
                                    {activeIndex === i ? "−" : "+"}
                                </span>
                            </button>

                            <div
                                ref={(el) => (contentRefs.current[i] = el)}
                                className="overflow-hidden h-0 opacity-0"
                            >
                                <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white text-black py-20 px-6">
                <div className="max-w-6xl mx-auto text-center">

                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Get Started?
                    </h2>

                    <p className="text-base md:text-lg text-gray-600 mb-10">
                        Join thousands of satisfied customers who rely on
                        <br className="hidden sm:block" />
                        Smart Service Place for all their home service needs.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-sm hover:bg-blue-700 transition">
                            Need a Service?
                        </button>

                        <button className="w-full sm:w-auto bg-gray-100 text-black px-6 py-3 rounded-sm hover:bg-gray-200 transition">
                            Become a Provider
                        </button>
                    </div>

                </div>
            </section>
            <Footer />
        </main>
    );
}

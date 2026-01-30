"use client";
import { useEffect, useState } from "react";
import Navbar from '@/components/common/Navbar';
import Footer from '@/sections/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, DollarSign, Clock, TrendingUp } from 'lucide-react';

export default function ForProvidersPage() {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);


    useEffect(() => {
        if (paused) return;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [paused]);

    const testimonials = [
        {
            text:
                "Smart Service Place completely changed my business. Before, I was spending hours looking for jobs. Now, they come to me while I’m on the job. My revenue has doubled in six months.",
            name: "David Miller",
            role: "Premium Handyman Services",
            color: "bg-orange-400",
        },
        {
            text:
                "The scheduling tools are a lifesaver. I love that I can block off time for my kids’ soccer games and the platform just handles the rest. It’s the freedom I always wanted.",
            name: "Elena Rodriguez",
            role: "Eco-Friendly Home Cleaning",
            color: "bg-emerald-400",
        },
    ];
    const benefits = [
        {
            icon: <DollarSign className="w-10 h-10 text-blue-600" />,
            title: "Earn More",
            description: "Set your own prices and keep more of what you earn. We charge minimal fees."
        },
        {
            icon: <Clock className="w-10 h-10 text-blue-600" />,
            title: "Flexible Schedule",
            description: "Work when you want. You have full control over your availability."
        },
        {
            icon: <Briefcase className="w-10 h-10 text-blue-600" />,
            title: "Grow Your Business",
            description: "Access thousands of customers looking for your specific skills."
        },
        {
            icon: <TrendingUp className="w-10 h-10 text-blue-600" />,
            title: "Tools for Success",
            description: "Get a dedicated dashboard to manage bookings, payments, and reviews."
        }
    ];

    return (
        <main className="bg-gray-50 min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-white text-black py-24 px-6">
                <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16">

                    {/* Text Content */}
                    <div className="max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                            Be Your Own Boss <span className="text-blue-600">Earn More</span>
                            <br /> with Smart Service Place
                        </h1>

                        <p className="text-base md:text-lg text-gray-500 mb-10">
                            Join the leading marketplace for local services. Get more leads,
                            manage your bookings, and get paid securely all in one place.
                        </p>

                        <Link
                            href="/register?role=provider"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-sm text-lg transition w-full sm:w-auto text-center"
                        >
                            Become a Provider
                        </Link>
                    </div>

                    {/* Image */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <Image
                            src="/assets/hero-image.png"
                            alt="Hero illustration"
                            width={500}
                            height={500}
                            priority
                            className="rounded-3xl object-contain"
                        />
                    </div>

                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Why Join As a Provider?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:border-blue-600 transition-colors">
                                <div className="mb-4 bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works for providers */}
            <section className="bg-white text-black py-24">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 px-6">

                    {/* Left Image */}
                    <div className="relative w-full lg:w-1/2">
                        <Image
                            src="/assets/hero-image.png"
                            alt="Success story"
                            width={520}
                            height={520}
                            className="rounded-3xl object-cover"
                            priority
                        />

                        <div className="absolute top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-lg text-center">
                            <p className="text-lg font-bold">4.9/5</p>
                            <p className="text-xs">Average Rating</p>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div
                        className="w-full lg:w-1/2"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            Success Stories
                        </h2>

                        {/* Carousel */}
                        <div className="relative overflow-hidden">
                            <div
                                className="flex transition-transform duration-700 ease-in-out"
                                style={{ transform: `translateX(-${index * 100}%)` }}
                            >
                                {testimonials.map((item, i) => (
                                    <div key={i} className="min-w-full">
                                        <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">
                                            <p className="text-gray-600 italic mb-4">
                                                “{item.text}”
                                            </p>

                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-10 h-10 rounded-full ${item.color}`}
                                                ></div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {item.role}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dots */}
                        <div className="flex gap-2 mt-6">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setIndex(i)}
                                    className={`w-2.5 h-2.5 rounded-full transition ${index === i ? "bg-blue-600" : "bg-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* Common Questions */}
            <section className="bg-white py-24">
                <div className="max-w-3xl mx-auto px-6">

                    {/* Heading */}
                    <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-12">
                        Common Questions
                    </h2>

                    {/* FAQ Item 1 */}
                    <div className="border-b pb-8 mb-8">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                            How much does it cost to join?
                        </h3>
                        <p className="text-gray-500 leading-relaxed">
                            Joining Smart Service marketplace is free. We only charge a small service fee on
                            completed bookings, so we only make money when you do.
                        </p>
                    </div>

                    {/* FAQ Item 2 */}
                    <div className="border-b pb-8 mb-8">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                            How do I get paid?
                        </h3>
                        <p className="text-gray-500 leading-relaxed">
                            Payments are processed 24 hours after the service is marked as
                            complete. Funds are deposited directly to your linked bank account
                            via Stripe.
                        </p>
                    </div>

                    {/* FAQ Item 3 */}
                    <div className="border-b pb-8">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                            What services can I offer?
                        </h3>
                        <p className="text-gray-500 leading-relaxed">
                            We support over 50 service categories, including home cleaning,
                            plumbing, electrical, landscaping, tutoring, and more.
                        </p>
                    </div>

                </div>
            </section>
            {/* CTA Section */}
            <section className="bg-blue-600 py-16 text-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-6">Ready to take your business to the next level?</h2>
                    <p className="text-xl mb-8 text-blue-100">Sign up today and start receiving job requests in minutes.</p>
                    <Link
                        href="/register?role=provider"
                        className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg inline-block"
                    >
                        Get Started Now
                    </Link>
                </div>
            </section>



            <Footer />
        </main>
    );
}

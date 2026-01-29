
import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/sections/Footer';
import Link from 'next/link';
import { Briefcase, DollarSign, Clock, TrendingUp } from 'lucide-react';

export default function ForProvidersPage() {
    const benefits = [
        {
            icon: <DollarSign className="w-10 h-10 text-green-600" />,
            title: "Earn More",
            description: "Set your own prices and keep more of what you earn. We charge minimal fees."
        },
        {
            icon: <Clock className="w-10 h-10 text-green-600" />,
            title: "Flexible Schedule",
            description: "Work when you want. You have full control over your availability."
        },
        {
            icon: <Briefcase className="w-10 h-10 text-green-600" />,
            title: "Grow Your Business",
            description: "Access thousands of customers looking for your specific skills."
        },
        {
            icon: <TrendingUp className="w-10 h-10 text-green-600" />,
            title: "Tools for Success",
            description: "Get a dedicated dashboard to manage bookings, payments, and reviews."
        }
    ];

    return (
        <main className="bg-gray-50 min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-gray-900 text-white py-24 overflow-hidden">
                {/* Background Overlay or Image could go here */}
                <div className="absolute inset-0 bg-black/50 z-0"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Grow Your Business with Us
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-10">
                        Join thousands of professionals finding new customers and building their reputation on Smart Service Marketplace.
                    </p>
                    <Link
                        href="/register?role=provider"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-full text-lg transition-transform transform hover:scale-105"
                    >
                        Become a Provider
                    </Link>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Why Join As a Provider?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {   benefits.map((benefit, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:border-green-200 transition-colors">
                                <div className="mb-4 bg-green-50 w-16 h-16 rounded-lg flex items-center justify-center">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </div>
                        ))}
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

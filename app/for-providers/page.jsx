
import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/sections/Footer';
import Link from 'next/link';
import Image from 'next/image';
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
            <section className="relative flex justify-evenly items-center bg-white text-black py-24 overflow-hidden">
                {/* Background Overlay or Image could go here */}
                {/* <div className="absolute inset-0 bg-black/50 z-0"></div> */}
                <div className="relative z-10 max-w-4xl  px-2 flex flex-col items-center text-center ">
                    <h1 className="text-xl md:text-5xl font-extrabold mb-6 tracking-tight">
                        Be your Own Boss <span className="text-blue-600">Earn More</span> <br /> with Smart Service Place
                    </h1>
                    <p className="text-base md:text-xl text-gray-500 max-w-2xl mb-10">
                       Join the leading marketplace for local services. Get more leads, manage your bookings, and get paid securely all in one place
                    </p>
                    <Link
                        href="/register?role=provider"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-20 rounded-sm text-lg  "
                    >
                        Become a Provider
                    </Link>
                </div>

                <div >
                    <Image src="/assets/hero-image.png" alt="Hero illustration" width={500} height={500} priority className="object-contain rounded-3xl" />
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Why Join As a Provider?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
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

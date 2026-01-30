import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen bg-gray-100 px-6">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16 py-20">

        {/* Left: Text */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-black mb-6 leading-tight">
            Find & Book Trusted <br />
            Local Services, <br />
            Instantly.
          </h1>

          <p className="text-gray-600 mb-8 text-base sm:text-lg">
            From home cleaning to handyman tasks, connect with verified
            professionals in your area.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/services"
              className="px-6 py-3 bg-blue-500 text-white rounded text-center hover:bg-blue-600 transition"
            >
              Browse Services
            </Link>

            <Link
              href="/register"
              className="px-6 py-3 border border-gray-300 text-black rounded text-center hover:bg-gray-200 transition"
            >
              Become a Provider
            </Link>
          </div>
        </div>

        {/* Right: Image */}
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
  );
}

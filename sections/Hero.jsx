import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-between px-8 ">
      {/* Left side: text + buttons */}
      <div className="max-w-7xl  flex flex-col justify-center items-center ">
        <h1 className="text-7xl font-bold mb-4">
          Find & Book Trusted <br />
          Local Services, <br />
          Instantly.
        </h1>

        <p className="text-gray-600 mb-6 w-full ">
          From home cleaning to handyman tasks, connect with verified <br /> professional in your area.
        </p>

        <div className="flex gap-38 w-full">
          <Link
            href="/services"
            className="px-16 py-3 bg-black text-white rounded"
          >
            Browse Services
          </Link>

          <Link
            href="/register"
            className="px-16 py-3 border rounded"
          >
            Become a Provider
          </Link>
        </div>
      </div>

      {/* Right side: image */}
      <div className="relative w-1/2 flex justify-center  ">
        <Image
          src="/assets/hero-image.png"
          alt="Hero illustration"
          width={500}
          height={500}
          priority
          className="object-contain rounded-3xl"
        />
      </div>
    </section>
  );
}
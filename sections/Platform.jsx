import React from "react";
import Image from "next/image";

export default function Platform() {
  return (
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
  );
}

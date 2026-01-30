import React from "react";
import { Search, Users, CreditCard } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="bg-gray-200 py-20 px-6">
      <div className="max-w-7xl mx-auto text-black">

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          How It Works
        </h1>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Booking a service is simple and seamless. In just a few steps,
          you’ll be connected with the right professional for your needs.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Search size={36} className="text-blue-600" />,
              title: "Search for a Service",
              desc: "Share what you’re looking for and where you need it.",
            },
            {
              icon: <Users size={36} className="text-blue-600" />,
              title: "Select Your Provider",
              desc: "Explore verified profiles, review ratings, and choose the best fit.",
            },
            {
              icon: <CreditCard size={36} className="text-blue-600" />,
              title: "Book and Pay Securely",
              desc: "Confirm your appointment and complete payment with confidence.",
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2">
                {step.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

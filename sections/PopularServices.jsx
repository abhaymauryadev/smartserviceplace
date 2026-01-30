import React from "react";
import { BrushCleaning, GraduationCap, Blinds } from "lucide-react";
import { MdPlumbing } from "react-icons/md"

export default function PopularServices() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-black">

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Popular Services
        </h1>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <BrushCleaning size={40} className="text-blue-600" />,
              title: "Home Cleaning",
              desc: "Expert cleaning services for your home.",
            },
            {
              icon: <MdPlumbing size={40} className="text-blue-600" />,
              title: "Plumbing",
              desc: "Reliable and efficient plumbing services.",
            },
            {
              icon: <GraduationCap size={40} className="text-blue-600" />,
              title: "Tutoring",
              desc: "Personalized tutoring services for all subjects.",
            },
            {
              icon: <Blinds size={40} className="text-blue-600" />,
              title: "Window Cleaning",
              desc: "Crystal clear windows, inside and out.",
            },
          ].map((service, idx) => (
            <div
              key={idx}
              className="bg-gray-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>

              <h3 className="text-lg font-semibold mb-2">
                {service.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

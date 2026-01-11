import React from "react";
import { BrushCleaning, GraduationCap, Blinds } from "lucide-react";
import { MdPlumbing } from "react-icons/md"

export default function PopularServices() {
  return (
    <div className="h-full  ">
      <div>
        <h1 className="text-4xl text-center font-bold pt-16 pb-16 text-black">
          Popular Services
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-5 gap-5 max-w-8xl mx-auto">
          {[
            {
                icon: <BrushCleaning size={50} color="blue" />,
              title: "Home Cleaning",
              desc: "Expert Cleaning Service for your home.",
            },
            {
                icon: <MdPlumbing size={50} color="blue" />,
              title: "Plumbing",
              desc: "Reliable and efficient plumbing services.",
            },
            {
                icon: <GraduationCap size={50} color="blue" />,
              title: "Tutoring",
              desc: "Personlazied tutoring services for all subjects",
            },
            {
                icon: <Blinds size={50} color="blue" />,    
              title: "Window Cleaning",
              desc: "Crystal clear windows, inside and out.",
            },
          ].map((service, idx) => (
            <div
              key={idx}
              className=" w-72 bg-gray-200  h-60 flex flex-col justify-center items-center rounded-lg shadow-sm text-center space-y-2"
            >
              {service.icon}
              <h1 className="text-lg font-semibold">{service.title}</h1>
              <p className="text-sm text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

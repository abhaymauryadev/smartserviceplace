"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const row1 = [
  { text: "Exactly what our team needed.", name: "Rahul", role: "Founder" },
  { text: "Usability is top-notch.", name: "Priya", role: "PM" },
  { text: "This product changed my workflow completely.", name: "Aarav", role: "UI Designer" },
  { text: "Clean UI and smooth experience.", name: "Neha", role: "Frontend Dev" },
];

const row2 = [
  { text: "Performance and UX are excellent.", name: "Kunal", role: "Developer" },
  { text: "Animations feel premium.", name: "Sneha", role: "Designer" },
  { text: "Highly recommended.", name: "Amit", role: "Startup Owner" },
];

export default function Testimonials() {
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    gsap.to(topRef.current, {
      xPercent: -50,
      duration: 25,
      repeat: -1,
      ease: "linear",
    });

    gsap.to(bottomRef.current, {
      xPercent: 50,
      duration: 25,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <section className="py-32  bg-overflow-hidden text-black bg-gray-200">
      <h2 className="text-4xl font-bold text-center mb-20">
        Testimonials
      </h2>

      {/* ROW 1 */}
      <div className="overflow-hidden">
        <div
          ref={topRef}
          className="flex gap-6 w-max mx-auto"
        >
          {[...row1, ...row1].map((t, i) => (
            <Card key={i} {...t} />
          ))}
        </div>
      </div>

      {/* ROW 2 */}
      <div className="overflow-hidden mt-12">
        <div
          ref={bottomRef}
          className="flex gap-6 w-max ml-[20%]"
        >
          {[...row2, ...row2].map((t, i) => (
            <Card key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ text, name, role }) {
  return (
    <div className="min-w-[320px] rounded-xl border border-gray-200 bg-gray-100 p-6 shadow-sm">
      <p className="text-gray-700 mb-6 text-[15px] leading-relaxed">
        “{text}”
      </p>
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  );
}

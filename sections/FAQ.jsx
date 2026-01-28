"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const faqs = [
  {
    q: "What is this product used for?",
    a: "It helps teams streamline workflows, improve usability, and ship faster with confidence.",
  },
  {
    q: "Is this suitable for small teams?",
    a: "Yes. It works equally well for solo founders, startups, and large organizations.",
  },
  {
    q: "Does it support modern frameworks?",
    a: "Absolutely. It is designed to integrate seamlessly with modern frontend stacks.",
  },
  {
    q: "Is customer support available?",
    a: "Yes, we provide fast and reliable support to help you succeed.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  useEffect(() => {
    contentRefs.current.forEach((el, i) => {
      if (!el) return;

      if (i === activeIndex) {
        gsap.to(el, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    });
  }, [activeIndex]);

  return (
    <section className="py-32 bg-white text-black">
      <h2 className="text-4xl font-bold text-center mb-20">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto space-y-4 px-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl bg-white shadow-sm"
          >
            <button
              onClick={() =>
                setActiveIndex(activeIndex === i ? null : i)
              }
              className="w-full flex justify-between items-center p-6 text-left"
            >
              <span className="font-medium text-gray-900">
                {faq.q}
              </span>
              <span className="text-xl">
                {activeIndex === i ? "−" : "+"}
              </span>
            </button>

            <div
              ref={(el) => (contentRefs.current[i] = el)}
              className="overflow-hidden h-0 opacity-0"
            >
              <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

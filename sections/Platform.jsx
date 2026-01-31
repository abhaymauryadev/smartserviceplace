"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Platform() {
  const sectionsRef = useRef([]);
  const imagesRef = useRef([]);

  const data = [
    {
      title: "Your Peace of Mind is Our Priority",
      desc: [
        {
          title: "Certified Professionals",
          description:
            "Each provider is thoroughly vetted, background-checked, and verified to ensure consistent quality."
        },
        {
          title: "Effortless Scheduling",
          description:
            "Book services instantly with clear availability and upfront pricing—no surprises, just convenience."
        },
        {
          title: "Trusted Transactions",
          description:
            "Complete payments safely through our platform, released only once your service is delivered."
        }
      ],
      img: "/assets/hero-image.png",
      bg: "bg-[#ffffff]",
    },
    {
      title: "Effortless Scheduling",
      desc: "Book services instantly with clear availability and pricing.",
      img: "/assets/Login-image.png",
      bg: "bg-[#e5e7eb]",
    },
    {
      title: "Trusted Transactions",
      desc: "Secure payments released only after service completion.",
      img: "/assets/preview.png",
      bg: "bg-[#ffffff]",
    },
  ];

  useEffect(() => {
    sectionsRef.current.forEach((trigger, i) => {
      const image = imagesRef.current[i];
      if (!image || !trigger) return;

      gsap.fromTo(
        image,
        { clipPath: "inset(0 0 0 0)" },
        {
          clipPath: "inset(0 0 100% 0)",
          ease: "none",
          scrollTrigger: {
            trigger: trigger,
            start: "top top",
            end: "bottom top",
            scrub: true,
            markers: true,
          },
        }
      );
    });
  }, []);

  return (
    <div className="grid grid-cols-1 relative">
      {/* Content Layer (Backgrounds & Text) */}
      <div className="col-start-1 row-start-1 z-0">
        {data.map((item, i) => (
          <section
            key={i}
            ref={(el) => (sectionsRef.current[i] = el)}
            className={`relative h-screen flex items-center px-12 ${item.bg}`}
          >
            <div className="w-1/2 pl-[10%] space-y-6 text-black">
              <h2 className="text-4xl font-bold">{item.title}</h2>
              {Array.isArray(item.desc) ? (
                <div className="space-y-4">
                  {item.desc.map((feature, idx) => (
                    <div key={idx}>
                      <h3 className="font-semibold text-xl">{feature.title}</h3>
                      <p className="text-base text-gray-700">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-lg leading-relaxed">{item.desc}</p>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Images Layer (Sticky) */}
      <div className="col-start-1 row-start-1 z-10 h-screen sticky top-0 pointer-events-none">
        <div className="relative w-full h-full">
          {data.map((item, i) => (
            <div
              key={i}
              ref={(el) => (imagesRef.current[i] = el)}
              className="absolute right-12 top-0 bottom-0 m-auto w-[35vmax] h-[26vmax] overflow-hidden"
              style={{ zIndex: data.length - i }}
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover rounded-3xl"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

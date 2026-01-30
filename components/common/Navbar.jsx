"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl">
      <div className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 font-bold text-lg"
        >
          <Image
            src="/favicon.svg"
            alt="logo"
            width={40}
            height={40}
            priority
            className="rounded-full"
          />
          <span className="suggested:text-xl text-black">
            Smart Service Marketplace
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-black">
          <Link href="/services">Services</Link>
          <Link href="/how-it-works">How It Works</Link>
          <Link href="/for-providers">For Providers</Link>

          <Link
            href="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-black focus:outline-none"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg px-6 py-6 space-y-4 text-black flex flex-col">
          <Link href="/services" onClick={() => setMenuOpen(false)}>
            Services
          </Link>
          <Link href="/how-it-works" onClick={() => setMenuOpen(false)}>
            How It Works
          </Link>
          <Link href="/for-providers" onClick={() => setMenuOpen(false)}>
            For Providers
          </Link>

          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="block bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-md"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}

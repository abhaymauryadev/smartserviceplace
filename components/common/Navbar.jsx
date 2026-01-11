"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="  px-6 py-4 flex justify-between items-center top-0 sticky bg-white/50 backdrop-blur-xl z-50">
      <div className="flex justify-center items-center gap-3 ">
        <Link
          href="/"
          className="flex justify-center items-center font-bold text-lg gap-3"
        >
          <Image
            src="/favicon.svg"
            alt="logo"
            width={50}
            height={50}
            priority
            className="rounded-full"
          />

          <h1 className="text-2xl text-black"> Smart Service Marketplace</h1>
        </Link>
      </div>

      <div className="flex gap-8 items-center text-black">
        <Link href="/services">Services</Link>
        <Link href="/services">How It Works</Link>
        <Link href="/services">For Providers</Link>

        {/* {session ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={() => signOut()} className="text-sm text-red-500">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )} */}

        <div className="flex gap-4 ">
          <Link
            href="/login"
            className="hover:border px-4 py-2 w-24 text-center  rounded "
          >
            Login
          </Link>
          <Link
            href="/register"
            className="hover:border-none border px-4 py-2 w-24 text-center text-white  bg-blue-500 rounded hover:bg-blue-600"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className=" border-b px-6 py-4 flex justify-between items-center top-0 sticky bg-white/50">
      <div className="flex justify-center items-center gap-3 ">
        <Image
          src="/favicon.svg"
          alt="logo"
          width={50}
          height={50}
          priority
          className="rounded-full"
        />
        <Link href="/" className="font-bold text-lg">
          Smart Service Marketplace
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <Link href="/services">Services</Link>

        {session ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={() => signOut()} className="text-sm text-red-500">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-lg">
        ServiceHub
      </Link>

      <div className="flex gap-4 items-center">
        <Link href="/services">Services</Link>

        {session ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button
              onClick={() => signOut()}
              className="text-sm text-red-500"
            >
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

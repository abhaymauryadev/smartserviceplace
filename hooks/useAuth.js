"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAuth({ required = false, role } = {}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!required) return;

    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (role && session?.user?.role !== role) {
      router.push("/unauthorized");
    }
  }, [status, session, role, required, router]);

  return {
    user: session?.user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    role: session?.user?.role,
  };
}
// Wrapper around NextAuth to simplify auth + role checks.
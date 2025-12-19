import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>

        <nav className="space-y-3 text-sm">
          {session.user.role === "user" && (
            <>
              <Link href="/dashboard/user">Home</Link>
              <Link href="/dashboard/user/bookings">My Bookings</Link>
              <Link href="/dashboard/user/profile">Profile</Link>
            </>
          )}

          {session.user.role === "provider" && (
            <>
              <Link href="/dashboard/provider">Home</Link>
              <Link href="/dashboard/provider/services">My Services</Link>
              <Link href="/dashboard/provider/bookings">Bookings</Link>
              <Link href="/dashboard/provider/analytics">Analytics</Link>
            </>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}

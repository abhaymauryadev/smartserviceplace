import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Sidebar from "@/components/common/Sidebar";
import LogoutButton from "@/components/common/LogoutButton";
export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex h-screen">
      <Sidebar user={session.user} />

      {/* Main */}
      <main className="flex-1 bg-white overflow-y-auto w-full">{children}</main>
    </div>
  );
}

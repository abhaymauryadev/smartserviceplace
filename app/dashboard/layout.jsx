import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/common/LogoutButton";
import SidebarNav from "@/components/common/SidebarNav";
import Image from "next/image";
import { LogOut } from "lucide-react";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-5 flex flex-col border-r shadow-md">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-black">
          <Image
            src="/favicon.svg"
            alt="logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          Smart Service
        </h2>

        <nav className="space-y-2 text-sm flex flex-col flex-1">
          <SidebarNav role={session.user.role} />
        </nav>

        <div className="flex justify-start items-center gap-3">
          <LogOut color="red" size={20} />
          <LogoutButton />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-white">{children}</main>
    </div>
  );
}

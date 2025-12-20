import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Redirect based on user role
  if (session.user.role === "provider") {
    redirect("/dashboard/provider");
  } else if (session.user.role === "user") {
    redirect("/dashboard/user");
  }

  // Fallback (shouldn't reach here if roles are properly set)
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-600 mt-2">Redirecting...</p>
    </div>
  );
}


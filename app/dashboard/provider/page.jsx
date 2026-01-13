import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import StatsCards from "../../../components/dashboard/StatsCard";
import EarningsChart from "@/components/dashboard/EarningsChart";
import QuickActions from "@/components/dashboard/QuickActions";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";

export default async function ProviderDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-4 sm:p-6 space-y-6 text-black">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-sm text-gray-500">
            Welcome back, {session.user.name}! Here's what's happening today.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
          + Create Booking
        </button>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EarningsChart />
        <QuickActions />
      </div>

      {/* Table */}
      <UpcomingAppointments />
    </div>
  );
}

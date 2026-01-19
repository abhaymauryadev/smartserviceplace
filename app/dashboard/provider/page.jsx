import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import StatsCards from "../../../components/dashboard/StatsCard";
import EarningsChart from "@/components/dashboard/EarningsChart";
import QuickActions from "@/components/dashboard/QuickActions";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import Service from "@/models/Service";
import User from "@/models/User";

export default async function ProviderDashboard() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "provider") {
    redirect("/dashboard/user");
  }

  await connectDB();
  const providerId = session?.user?.id;

  // Fetch Stats Data
  const bookings = await Booking.find({ provider: providerId });
  const services = await Service.find({ provider: providerId });

  // Fetch Upcoming Appointments with populated data
  const upcomingAppointments = await Booking.find({
    provider: providerId,
    status: { $in: ["pending", "accepted", "confirmed"] }, // Assuming these are active statuses
    bookingDate: { $gte: new Date() }, // Only future bookings
  })
    .sort({ bookingDate: 1 })
    .limit(5)
    .populate("user", "name")
    .populate("service", "title");

  const totalEarnings = bookings
    .filter((b) => b.status === "completed")
    .reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

  const totalBookings = bookings.length;
  const activeServices = services.filter((s) => s.isActive).length;

  const totalReviews = services.reduce((acc, s) => acc + (s.totalReviews || 0), 0);
  const weightedRating =
    totalReviews > 0
      ? services.reduce(
        (acc, s) => acc + (s.rating || 0) * (s.totalReviews || 0),
        0
      ) / totalReviews
      : 0;

  const statsData = {
    totalEarnings,
    totalBookings,
    activeServices,
    averageRating: weightedRating.toFixed(1),
    // Placeholder changes until historical data is implemented
    earningsChange: "+0%",
    bookingsChange: "+0%",
    servicesChange: "0 changed",
    ratingChange: "+0.0",
  };

  // Calculate Last 7 Days Earnings
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const earningsLabels = last7Days.map((date) =>
    date.toLocaleDateString("en-US", { weekday: "short" })
  );

  const earningsData = last7Days.map((date) => {
    const dayStart = new Date(date.setHours(0, 0, 0, 0));
    const dayEnd = new Date(date.setHours(23, 59, 59, 999));

    return bookings
      .filter((b) => {
        const bDate = new Date(b.bookingDate);
        return (
          b.status === "completed" && bDate >= dayStart && bDate <= dayEnd
        );
      })
      .reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  });

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
      <StatsCards data={statsData} />

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EarningsChart data={earningsData} labels={earningsLabels} />
        <QuickActions />
      </div>

      {/* Table */}
      <UpcomingAppointments appointments={JSON.parse(JSON.stringify(upcomingAppointments))} />
    </div>
  );
}

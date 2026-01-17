import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import Service from "@/models/Service";
import EarningsPageClient from "@/components/dashboard/EarningsPageClient";
import mongoose from "mongoose";

export default async function ProviderEarningsPage() {
  const session = await getServerSession(authOptions);
  await connectDB();

  const providerId = session?.user?.id;

  // Fetch all bookings for the provider
  const bookings = await Booking.find({ provider: providerId })
    .populate("service", "title category")
    .populate("user", "name");

  // Calculate revenue statistics
  const completedBookings = bookings.filter((b) => b.status === "completed");
  const totalRevenue = completedBookings.reduce(
    (acc, b) => acc + (b.totalAmount || 0),
    0
  );

  // This month's revenue
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisMonthBookings = completedBookings.filter(
    (b) => new Date(b.bookingDate) >= startOfMonth
  );
  const thisMonth = thisMonthBookings.reduce(
    (acc, b) => acc + (b.totalAmount || 0),
    0
  );

  // Pending clearance (pending payment status)
  const pendingClearance = bookings
    .filter((b) => b.paymentStatus === "pending")
    .reduce((acc, b) => acc + (b.totalAmount || 0), 0);

  // Available balance (for now, same as total revenue - in real app, subtract withdrawals)
  const availableBalance = totalRevenue;

  // Aggregate earnings by service category
  const categoryMap = {};
  completedBookings.forEach((booking) => {
    const category = booking.service?.category || "Other";
    if (!categoryMap[category]) {
      categoryMap[category] = 0;
    }
    categoryMap[category] += booking.totalAmount || 0;
  });

  const radarLabels = Object.keys(categoryMap);
  const radarData = Object.values(categoryMap);

  // Recent transactions (last 10)
  const recentTransactions = bookings
    .sort((a, b) => new Date(b.bookingDate) - new Date(b.bookingDate))
    .slice(0, 10);

  // Serialize data for client component
  const statsData = {
    totalRevenue: totalRevenue.toFixed(2),
    thisMonth: thisMonth.toFixed(2),
    pendingClearance: pendingClearance.toFixed(2),
    availableBalance: availableBalance.toFixed(2),
    totalRevenueChange: "+0%", // Placeholder
    thisMonthChange: "+0%", // Placeholder
  };

  const radarChartData = {
    labels: radarLabels.length > 0 ? radarLabels : ["No Data"],
    data: radarData.length > 0 ? radarData : [0],
  };

  const transactions = JSON.parse(JSON.stringify(recentTransactions));

  return (
    <EarningsPageClient
      statsData={statsData}
      radarData={radarChartData}
      transactions={transactions}
    />
  );
}

"use client";

export default function BookingStatus({ bookings = [] }) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Helper to check if a date is in a specific month/year
  const isInMonth = (dateString, month, year) => {
    if (!dateString) return false;
    const d = new Date(dateString);
    return d.getMonth() === month && d.getFullYear() === year;
  };

  // Helper to check if a date is in the current week
  const isThisWeek = (dateString) => {
    if (!dateString) return false;
    const d = new Date(dateString);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
    startOfWeek.setHours(0, 0, 0, 0);
    return d >= startOfWeek;
  };

  // 1. New Requests (Pending)
  const newRequests = bookings.filter(b => b.status === "pending").length;
  const newRequestsThisWeek = bookings.filter(b => b.status === "pending" && isThisWeek(b.createdAt)).length;

  // 2. Earnings (Paid or Completed)
  const getEarnings = (month, year) => {
    return bookings
      .filter(b =>
        (b.paymentStatus === "paid" || b.status === "completed") &&
        isInMonth(b.createdAt, month, year)
      )
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  };

  const earningsThisMonth = getEarnings(currentMonth, currentYear);

  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const earningsLastMonth = getEarnings(lastMonth, lastMonthYear);

  let earningsTrend = 0;
  if (earningsLastMonth > 0) {
    earningsTrend = ((earningsThisMonth - earningsLastMonth) / earningsLastMonth) * 100;
  } else if (earningsThisMonth > 0) {
    earningsTrend = 100;
  }

  // 3. Upcoming Jobs
  const upcoming = bookings.filter(b =>
    (b.status === "accepted" || b.status === "confirmed") &&
    new Date(b.startTime) > now
  ).length;

  // Trend: Accepted jobs comparison
  const getAcceptedCount = (month, year) => bookings.filter(b =>
    (b.status === "accepted" || b.status === "confirmed") &&
    isInMonth(b.createdAt, month, year)
  ).length;

  const acceptedThisMonth = getAcceptedCount(currentMonth, currentYear);
  const acceptedLastMonth = getAcceptedCount(lastMonth, lastMonthYear);

  let upcomingTrend = 0;
  if (acceptedLastMonth > 0) {
    upcomingTrend = ((acceptedThisMonth - acceptedLastMonth) / acceptedLastMonth) * 100;
  } else if (acceptedThisMonth > 0) {
    upcomingTrend = 100;
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Stat
        title="New Requests"
        value={newRequests}
        sub={`+${newRequestsThisWeek} this week`}
      />
      <Stat
        title="Earnings this Month"
        value={formatCurrency(earningsThisMonth)}
        sub={`${earningsTrend >= 0 ? '+' : ''}${earningsTrend.toFixed(1)}% vs last month`}
        red={earningsTrend < 0}
        green={earningsTrend > 0}
      />
      <Stat
        title="Upcoming Jobs"
        value={upcoming}
        sub={`${upcomingTrend >= 0 ? '+' : ''}${upcomingTrend.toFixed(1)}% vs last month`}
        green={upcomingTrend > 0}
        red={upcomingTrend < 0}
      />
    </div>
  );
}

function Stat({ title, value, sub, red, green }) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <p className={`text-sm mt-1 ${red ? "text-red-600" : green ? "text-green-600" : "text-gray-500"
        }`}>
        {sub}
      </p>
    </div>
  );
}

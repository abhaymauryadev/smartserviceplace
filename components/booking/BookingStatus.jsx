"use client";

export default function BookingStatus({ bookings }) {
  const newRequests = bookings.filter(b => b.status === "pending").length;
  const upcoming = bookings.filter(b => b.status === "confirmed").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Stat title="New Requests" value={newRequests} sub="+2 this week" />
      <Stat title="Earnings this Month" value="$3,250" sub="-5% vs last month" red />
      <Stat title="Upcoming Jobs" value={upcoming} sub="+10% vs last month" />
    </div>
  );
}

function Stat({ title, value, sub, red }) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <p className={`text-sm mt-1 ${red ? "text-red-600" : "text-green-600"}`}>
        {sub}
      </p>
    </div>
  );
}

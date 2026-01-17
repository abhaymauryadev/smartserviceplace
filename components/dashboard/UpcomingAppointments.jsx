"use client";

export default function UpcomingAppointments({ appointments = [] }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white border rounded-xl p-4 overflow-x-auto">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Upcoming Appointments</h3>
        <button className="text-sm text-blue-600">View All</button>
      </div>

      {appointments.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">
          No upcoming appointments.
        </p>
      ) : (
        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="text-left py-2">Client</th>
              <th className="text-left">Service</th>
              <th className="text-left">Date & Time</th>
              <th className="text-left">Status</th>
              <th className="text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="py-2">{a.user?.name || "Unknown"}</td>
                <td>{a.service?.title || "Unknown"}</td>
                <td>
                  {formatDate(a.bookingDate)}
                  <div className="text-xs text-gray-500">
                    {formatTime(a.startTime)} – {formatTime(a.endTime)}
                  </div>
                </td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs capitalize ${a.status === "confirmed" || a.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : a.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td>₹{a.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

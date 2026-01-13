"use client";

const appointments = [
  {
    client: "Alice Smith",
    service: "Kitchen Deep Clean",
    date: "Oct 24, 2023",
    time: "2:00 – 4:00 PM",
    status: "Confirmed",
    amount: "₹150",
  },
  {
    client: "Bob Jones",
    service: "Lawn Mowing",
    date: "Oct 25, 2023",
    time: "10:00 – 11:00 AM",
    status: "Pending",
    amount: "₹45",
  },
];

export default function UpcomingAppointments() {
  return (
    <div className="bg-white border rounded-xl p-4 overflow-x-auto">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Upcoming Appointments</h3>
        <button className="text-sm text-blue-600">View All</button>
      </div>

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
              <td className="py-2">{a.client}</td>
              <td>{a.service}</td>
              <td>
                {a.date}
                <div className="text-xs text-gray-500">{a.time}</div>
              </td>
              <td>
                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                  {a.status}
                </span>
              </td>
              <td>{a.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

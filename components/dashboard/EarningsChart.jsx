"use client";

export default function EarningsChart() {
  const data = [40, 65, 45, 80, 100, 60, 30];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="bg-white border rounded-xl p-4 lg:col-span-2">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Earnings Overview</h3>
        <span className="text-sm text-gray-500">Last 7 days</span>
      </div>

      <div className="flex items-end gap-3 h-48">
        {data.map((value, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div
              className={`w-full rounded-md ${
                i === 4 ? "bg-blue-600" : "bg-blue-100"
              }`}
              style={{ height: `${value}%` }}
            />
            <span className="text-xs mt-2 text-gray-500">{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

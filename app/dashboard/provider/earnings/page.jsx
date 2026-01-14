import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function ProviderEarningsPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-6 text-black p-7 ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black">Earnings & Revenue</h1>
          <p className="text-sm text-gray-500">
            Track your financial performance and payouts
          </p>
        </div>

        <div className="flex gap-3">
          <button className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
            Export CSV
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
            Withdraw Funds
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value="$14,240.50" badge="+12.5%" />
        <StatCard title="This Month" value="$2,840.00" badge="+5.2%" />
        <StatCard title="Pending Clearance" value="$450.00" />
        <StatCard title="Available Balance" value="$1,200.00" highlight />
      </div>

      {/* Charts + Payouts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Earnings */}
        <div className="lg:col-span-2 bg-white border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Monthly Earnings</h3>
            <select className="border rounded px-2 py-1 text-sm">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>

          {/* Chart placeholder */}
          <div className="h-56 flex items-center justify-center text-gray-400">
            Chart integration (Recharts / Chart.js)
          </div>
        </div>

        {/* Recent Payouts */}
        <div className="bg-white border rounded-xl p-5">
          <h3 className="font-semibold mb-4">Recent Payouts</h3>

          <ul className="space-y-3">
            <PayoutItem date="Oct 15, 2023" amount="$1,450.00" />
            <PayoutItem date="Sep 30, 2023" amount="$980.00" />
            <PayoutItem date="Sep 15, 2023" amount="$1,250.00" />
          </ul>

          <button className="mt-4 text-sm text-blue-600 hover:underline">
            View All Payouts
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white border rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h3 className="font-semibold">Transaction History</h3>
          <input
            placeholder="Search transactions..."
            className="border rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-2 text-left">Service</th>
                <th className="py-2 text-left">Customer</th>
                <th className="py-2 text-left">Date</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              <TransactionRow
                service="Premium Kitchen Cleaning"
                customer="Alice Smith"
                date="Oct 24, 2023"
                status="Completed"
                amount="+$150.00"
              />
              <TransactionRow
                service="Lawn Mowing Service"
                customer="Bob Jones"
                date="Oct 22, 2023"
                status="Completed"
                amount="+$45.00"
              />
              <TransactionRow
                service="Home Massage Therapy"
                customer="Charlie Miller"
                date="Oct 20, 2023"
                status="Pending"
                amount="+$90.00"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, badge, highlight }) {
  return (
    <div
      className={`p-4 rounded-xl border bg-white ${highlight ? "ring-2 ring-blue-500" : ""
        }`}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
      {badge && (
        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded mt-2 inline-block">
          {badge}
        </span>
      )}
    </div>
  );
}

function PayoutItem({ date, amount }) {
  return (
    <li className="flex items-center justify-between">
      <div>
        <p className="font-medium text-sm">Bank Transfer</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
      <span className="text-sm font-semibold">{amount}</span>
    </li>
  );
}

function TransactionRow({ service, customer, date, status, amount }) {
  return (
    <tr>
      <td className="py-3">{service}</td>
      <td className="py-3 text-gray-600">{customer}</td>
      <td className="py-3 text-gray-600">{date}</td>
      <td className="py-3">
        <span
          className={`text-xs px-2 py-1 rounded ${status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {status}
        </span>
      </td>
      <td className="py-3 text-right font-medium">{amount}</td>
    </tr>
  );
}

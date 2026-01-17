"use client";

import RadarChart from "@/components/dashboard/RadarChart";

export default function EarningsPageClient({
    statsData,
    radarData,
    transactions,
}) {
    return (
        <div className="space-y-6 text-black p-7">
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
                <StatCard
                    title="Total Revenue"
                    value={`₹${statsData?.totalRevenue || 0}`}
                    badge={statsData?.totalRevenueChange || "+0%"}
                />
                <StatCard
                    title="This Month"
                    value={`₹${statsData?.thisMonth || 0}`}
                    badge={statsData?.thisMonthChange || "+0%"}
                />
                <StatCard
                    title="Pending Clearance"
                    value={`₹${statsData?.pendingClearance || 0}`}
                />
                <StatCard
                    title="Available Balance"
                    value={`₹${statsData?.availableBalance || 0}`}
                    highlight
                />
            </div>

            {/* Charts + Payouts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Monthly Earnings */}
                <div className="lg:col-span-2 bg-white border rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Earnings by Category</h3>
                    </div>

                    {/* Radar Chart */}
                    <RadarChart data={radarData?.data} labels={radarData?.labels} />
                </div>

                {/* Recent Payouts */}
                <div className="bg-white border rounded-xl p-5">
                    <h3 className="font-semibold mb-4">Recent Payouts</h3>

                    <ul className="space-y-3">
                        <PayoutItem date="Oct 15, 2023" amount="₹1,450.00" />
                        <PayoutItem date="Sep 30, 2023" amount="₹980.00" />
                        <PayoutItem date="Sep 15, 2023" amount="₹1,250.00" />
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
                            {transactions && transactions.length > 0 ? (
                                transactions.map((txn, i) => (
                                    <TransactionRow
                                        key={i}
                                        service={txn.service?.title || "Unknown Service"}
                                        customer={txn.user?.name || "Unknown Customer"}
                                        date={new Date(txn.bookingDate).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                        status={txn.status}
                                        amount={`₹${txn.totalAmount}`}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-4 text-center text-gray-500">
                                        No transactions found
                                    </td>
                                </tr>
                            )}
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
                    className={`text-xs px-2 py-1 rounded capitalize ${status === "completed"
                            ? "bg-green-100 text-green-700"
                            : status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                        }`}
                >
                    {status}
                </span>
            </td>
            <td className="py-3 text-right font-medium">{amount}</td>
        </tr>
    );
}

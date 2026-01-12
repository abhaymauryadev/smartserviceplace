import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";
import Image from "next/image";
import Header from "@/components/common/Header";

async function getBookings(userId) {
  try {
    await connectDB();
    const bookings = await Booking.find({ user: userId })
      .populate("service")
      .populate("provider", "name")
      .lean();
    return bookings || [];
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
}

export default async function UserBookingsPage() {
  const session = await getServerSession(authOptions);
  const bookings = await getBookings(session?.user?.id);

  return (
    <>
      <h1 className="text-xl font-bold mb-4">My Bookings</h1>

      {bookings.length === 0 && (
        <p className="text-gray-500">No bookings yet.</p>
      )}

      {bookings.length > 0 && (
        <ul className="space-y-3">
          {bookings.map((b) => (
            <li
              key={b._id}
              className="border rounded p-4 bg-white"
            >
              <p className="font-medium">{b.service?.title || "Service"}</p>
              <p className="text-sm text-gray-600">
                Status: {b.status}
              </p>
            </li>
          ))}
        </ul>
      )}
        {/* Main */}
      <main className="flex-1">
        {/* Header */}
      
        <Header/>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          {/* Left Form */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Book a Service</h1>
              <p className="text-gray-500 text-sm">
                Tell us what you need, and we’ll match you with a professional.
              </p>
            </div>

            {/* Step 1 */}
            <section className="bg-white border rounded-xl p-5">
              <h2 className="font-semibold mb-4">
                1. Select a Category
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {["Cleaning", "Repairs", "Moving", "Electrical", "Painting", "Gardening"].map(
                  (item) => (
                    <div
                      key={item}
                      className={`border rounded-lg p-4 text-center text-sm cursor-pointer ${
                        item === "Cleaning"
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            </section>

            {/* Step 2 */}
            <section className="bg-white border rounded-xl p-5">
              <h2 className="font-semibold mb-4">
                2. Service Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select className="border rounded-lg px-3 py-2 text-sm">
                  <option>Deep House Cleaning</option>
                </select>

                <input
                  value="123 Main St, Apartment 4B"
                  readOnly
                  className="border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <textarea
                placeholder="Describe the service you need..."
                className="mt-4 w-full border rounded-lg p-3 text-sm"
                rows={4}
              />
            </section>

            {/* Step 3 */}
            <section className="bg-white border rounded-xl p-5">
              <h2 className="font-semibold mb-4">
                3. Preferred Date & Time
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="date"
                  className="border rounded-lg px-3 py-2 text-sm"
                />
                <select className="border rounded-lg px-3 py-2 text-sm">
                  <option>Morning (08:00 AM - 12:00 PM)</option>
                </select>
              </div>
            </section>
          </div>

          {/* Right Summary */}
          <aside className="space-y-4">
            <div className="bg-white border rounded-xl p-5">
              <h3 className="font-semibold mb-4">
                Booking Summary
              </h3>

              <div className="text-sm space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-500">Category</span>
                  <span className="text-blue-600">Cleaning</span>
                </p>

                <p className="flex justify-between">
                  <span className="text-gray-500">Service</span>
                  <span>Deep House Cleaning</span>
                </p>

                <p className="flex justify-between">
                  <span className="text-gray-500">Date & Time</span>
                  <span className="text-gray-400">Select date</span>
                </p>

                <hr />

                <p className="flex justify-between font-semibold">
                  <span>Estimated Total</span>
                  <span className="text-blue-600">$120.00</span>
                </p>
              </div>

              <button className="w-full mt-4 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium">
                Confirm Booking →
              </button>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-sm">
              <p className="font-medium mb-1">Need Help?</p>
              <p className="text-gray-600">
                Chat with our support team for assistance.
              </p>
              <button className="mt-3 text-green-700 font-medium">
                Start Chat
              </button>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

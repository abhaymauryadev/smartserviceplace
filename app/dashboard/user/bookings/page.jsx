import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

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
    </>
  );
}

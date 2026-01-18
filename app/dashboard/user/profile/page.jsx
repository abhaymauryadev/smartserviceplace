import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Booking from "@/models/Booking";
import ProfileForm from "./ProfileForm";

async function getUserWithStats(userId) {
  try {
    await connectDB();

    // Fetch user data
    const user = await User.findById(userId).select("-password").lean();

    if (!user) {
      return { user: null, bookingCount: 0 };
    }

    // Count user's bookings
    const bookingCount = await Booking.countDocuments({ user: userId });

    // Serialize user data
    const serializedUser = {
      ...user,
      _id: user._id.toString(),
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
    };

    return {
      user: serializedUser,
      bookingCount,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { user: null, bookingCount: 0 };
  }
}

export default async function UserProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="p-6">
        <p className="text-red-600">Please log in to view your profile.</p>
      </div>
    );
  }

  const { user, bookingCount } = await getUserWithStats(session.user.id);

  if (!user) {
    return (
      <div className="p-6">
        <p className="text-red-600">User not found.</p>
      </div>
    );
  }

  return <ProfileForm initialUser={user} bookingCount={bookingCount} />;
}

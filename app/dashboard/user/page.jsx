import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function UserDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">
        Welcome, {session.user.name}
      </h1>
      <p className="text-gray-600">
        Manage your bookings and profile.
      </p>
    </>
  );
}

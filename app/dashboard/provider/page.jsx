import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function ProviderDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">
        Provider Panel
      </h1>
      <p className="text-gray-600">
        Manage services, bookings, and earnings.
      </p>
    </>
  );
}

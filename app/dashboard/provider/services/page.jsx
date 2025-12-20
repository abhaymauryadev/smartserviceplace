import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Service from "@/models/Service";

async function getServices(providerId) {
  try {
    await connectDB();
    const services = await Service.find({ provider: providerId })
      .populate("provider", "name")
      .lean();
    return services || [];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export default async function ProviderServicesPage() {
  const session = await getServerSession(authOptions);
  const services = await getServices(session?.user?.id);

  return (
    <>
      <h1 className="text-xl font-bold mb-4">My Services</h1>

      {services.length === 0 && (
        <p className="text-gray-500">No services yet.</p>
      )}

      {services.length > 0 && (
        <ul className="space-y-3">
          {services.map((s) => (
            <li
              key={s._id}
              className="border rounded p-4 bg-white"
            >
              <p className="font-medium">{s.title}</p>
              <p className="text-sm">₹{s.price}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

import Link from "next/link";
import { connectDB } from "@/lib/db";
import Service from "@/models/Service";

async function getServices() {
  try {
    await connectDB();
    const services = await Service.find({ isActive: true })
      .populate("provider", "name")
      .lean();
    return services || [];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Available Services
      </h1>

      {services.length === 0 && (
        <p className="text-gray-500">No services found.</p>
      )}

      {services.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => {
            const description = service.description || "";
            const truncatedDescription = description.length > 80 
              ? `${description.slice(0, 80)}...` 
              : description;

            return (
              <div
                key={service._id}
                className="border rounded p-4"
              >
                <h2 className="font-semibold text-lg">
                  {service.title}
                </h2>

                <p className="text-sm text-gray-600 mt-1">
                  {truncatedDescription}
                </p>

                <p className="mt-2 font-medium">
                  ₹{service.price}
                </p>

                <Link
                  href={`/services/${service._id}`}
                  className="inline-block mt-3 text-sm underline"
                >
                  View Details
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

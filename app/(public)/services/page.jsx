import Link from "next/link";
import { connectDB } from "@/lib/db";
import Service from "@/models/Service";
import Image from "next/image";

async function getServices() {
  try {
    await connectDB();
    const services = await Service.find({ isActive: true })
      .populate("provider", "name")
      .lean()
    return services || [];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 text-black">
      <h1 className="text-3xl font-bold mb-6">
        {/* <Image src="" alt="" width={500} height={500} /> */}
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
                className="border rounded-xl overflow-hidden group hover:shadow-md transition bg-white"
              >
                <div className="relative h-48 w-full bg-gray-100">
                  {service.images && service.images.length > 0 ? (
                    <Image
                      src={service.images[0]} 
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="font-semibold text-lg line-clamp-1">
                    {service.title}
                  </h2>

                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {truncatedDescription}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="font-bold text-lg text-blue-600">
                      ₹{service.price}
                    </p>

                    <Link
                      href={`/services/${service._id}`}
                      className="text-sm font-medium text-gray-900 hover:text-blue-600 transition"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

import Link from "next/link";

async function getServices() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/services`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }

  return res.json();
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

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="border rounded p-4"
          >
            <h2 className="font-semibold text-lg">
              {service.title}
            </h2>

            <p className="text-sm text-gray-600 mt-1">
              {service.description.slice(0, 80)}...
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
        ))}
      </div>
    </main>
  );
}

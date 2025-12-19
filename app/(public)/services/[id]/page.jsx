import { notFound } from "next/navigation";

async function getService(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function ServiceDetailsPage({ params }) {
  const service = await getService(params.id);

  if (!service) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-3">
        {service.title}
      </h1>

      <p className="text-gray-600 mb-4">
        {service.description}
      </p>

      <p className="font-semibold mb-2">
        Price: ₹{service.price}
      </p>

      <p className="text-sm text-gray-500">
        Provider: {service.provider?.name}
      </p>

      <button className="mt-6 px-6 py-3 bg-black text-white rounded">
        Book Service
      </button>
    </main>
  );
}

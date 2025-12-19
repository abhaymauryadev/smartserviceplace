import Link from "next/link";

export default function ServiceCard({ service }) {
  return (
    <div className="border rounded p-4 bg-white">
      <h3 className="font-semibold">{service.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">
        {service.description}
      </p>
      <p className="mt-2 font-medium">₹{service.price}</p>

      <Link
        href={`/services/${service._id}`}
        className="text-sm underline mt-3 inline-block"
      >
        View Details
      </Link>
    </div>
  );
}

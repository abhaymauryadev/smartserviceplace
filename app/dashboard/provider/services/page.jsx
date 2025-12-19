async function getServices() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/services`,
    { cache: "no-store" }
  );
  return res.json();
}

export default async function ProviderServicesPage() {
  const services = await getServices();

  return (
    <>
      <h1 className="text-xl font-bold mb-4">My Services</h1>

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
    </>
  );
}

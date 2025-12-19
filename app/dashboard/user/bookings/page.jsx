async function getBookings() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings`,
    { cache: "no-store" }
  );
  return res.json();
}

export default async function UserBookingsPage() {
  const bookings = await getBookings();

  return (
    <>
      <h1 className="text-xl font-bold mb-4">My Bookings</h1>

      {bookings.length === 0 && (
        <p className="text-gray-500">No bookings yet.</p>
      )}

      <ul className="space-y-3">
        {bookings.map((b) => (
          <li
            key={b._id}
            className="border rounded p-4 bg-white"
          >
            <p className="font-medium">{b.service.title}</p>
            <p className="text-sm text-gray-600">
              Status: {b.status}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

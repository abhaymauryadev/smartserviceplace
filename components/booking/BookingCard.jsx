export default function BookingCard({ booking }) {
  return (
    <div className="border rounded p-4 bg-white">
      <p className="font-medium">{booking.service.title}</p>
      <p className="text-sm text-gray-600">
        Status: {booking.status}
      </p>
    </div>
  );
}

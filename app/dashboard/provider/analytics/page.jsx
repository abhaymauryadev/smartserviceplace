export default function ProviderAnalyticsPage() {
  return (
    <>
      <h1 className="text-xl font-bold mb-4">
        Analytics
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 border rounded">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <p className="text-2xl font-bold">24</p>
        </div>

        <div className="bg-white p-4 border rounded">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-2xl font-bold">₹18,500</p>
        </div>

        <div className="bg-white p-4 border rounded">
          <p className="text-sm text-gray-500">Rating</p>
          <p className="text-2xl font-bold">4.6 ⭐</p>
        </div>
      </div>
    </>
  );
}

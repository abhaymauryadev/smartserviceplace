import Image from "next/image";

export default function NotificationsPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen text-black">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
            3 New
          </span>
        </div>

        <div className="flex gap-2">
          <button className="border px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100">
            ✓ Mark all as read
          </button>
          <button className="border p-2 rounded-lg hover:bg-gray-100">
            ⚙
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6 text-sm sticky top-0">
        <button className="pb-3 text-blue-600 border-b-2 border-blue-600 font-medium">
          All
        </button>
        <button className="pb-3 text-gray-500 hover:text-black">
          Unread
        </button>
        <button className="pb-3 text-gray-500 hover:text-black">
          Bookings
        </button>
        <button className="pb-3 text-gray-500 hover:text-black">
          System
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4 overflow-y-auto">
        {/* Notification 1 */}
        <div className="bg-white border rounded-xl p-5 flex gap-4">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            🏠
          </div>

          <div className="flex-1">
            <div className="flex justify-between">
              <p className="font-semibold">
                Upcoming Booking Reminder
              </p>
              <span className="text-xs text-gray-400">
                2 mins ago
              </span>
            </div>

            <p className="text-sm text-gray-600 mt-1">
              Your Deep House Cleaning service with ProClean Services is scheduled
              for tomorrow at 2:00 PM. Please ensure someone is home.
            </p>

            <button className="text-sm text-blue-600 mt-2 font-medium">
              View Booking Details
            </button>
          </div>

          <span className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
        </div>

        {/* Notification 2 */}
        <div className="bg-white border rounded-xl p-5 flex gap-4">
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            💳
          </div>

          <div className="flex-1">
            <div className="flex justify-between">
              <p className="font-semibold">
                Payment Method Expiring
              </p>
              <span className="text-xs text-gray-400">
                1 hour ago
              </span>
            </div>

            <p className="text-sm text-gray-600 mt-1">
              Your card ending in •••• 4242 is set to expire soon. Please update
              your payment information.
            </p>

            <button className="text-sm text-blue-600 mt-2 font-medium">
              Update Payment
            </button>
          </div>

          <span className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
        </div>

        {/* Notification 3 */}
        <div className="bg-white border rounded-xl p-5 flex gap-4">
          <Image
            src="/assets/images/placeholder.png"
            alt="User"
            width={40}
            height={40}
            className="rounded-full"
          />

          <div className="flex-1">
            <div className="flex justify-between">
              <p className="font-semibold">
                New Message from Jane Smith
              </p>
              <span className="text-xs text-gray-400">
                3 hours ago
              </span>
            </div>

            <p className="text-sm text-gray-600 mt-1">
              "Hi Alex, I've arrived at the location for the Lawn Mowing service.
              I'll get started right away."
            </p>

            <button className="text-sm text-blue-600 mt-2 font-medium">
              Reply
            </button>
          </div>

          <span className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
        </div>

        {/* Read Notification */}
        <div className="bg-gray-50 border rounded-xl p-5 flex gap-4 opacity-70">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            ✔
          </div>

          <div className="flex-1">
            <div className="flex justify-between">
              <p className="font-semibold">
                Service Completed
              </p>
              <span className="text-xs text-gray-400">
                Yesterday
              </span>
            </div>

            <p className="text-sm text-gray-600 mt-1">
              Your Lawn Mowing service has been completed. Please rate your
              provider, Jane Smith.
            </p>

            <button className="text-sm text-blue-600 mt-2 font-medium">
              Rate Service
            </button>
          </div>
        </div>

        {/* Promo */}
        <div className="bg-gray-50 border rounded-xl p-5 flex gap-4 opacity-70">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            🎁
          </div>

          <div className="flex-1">
            <div className="flex justify-between">
              <p className="font-semibold">
                Seasonal Offer: 20% Off
              </p>
              <span className="text-xs text-gray-400">
                2 days ago
              </span>
            </div>

            <p className="text-sm text-gray-600 mt-1">
              Get 20% off your next deep cleaning. Use code CLEAN20 at checkout.
              Valid until June 30th.
            </p>

            <button className="text-sm text-blue-600 mt-2 font-medium">
              Copy Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

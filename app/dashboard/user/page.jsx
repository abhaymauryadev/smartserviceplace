import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import Header from "@/components/common/Header";

export default async function UserDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <>
    <Header/>
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold text-black">
        Welcome, {session?.user?.name}
      </h1>
      <p className="text-gray-600 mb-6">
        Manage your bookings and profile.
      </p>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">
        <button className="pb-3 text-blue-600 border-b-2 border-blue-600 font-medium">
          Upcoming Bookings
        </button>
        <button className="pb-3 text-gray-500 hover:text-black">
          Booking History
        </button>
        <button className="pb-3 text-gray-500 hover:text-black">
          My Profile
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-sm p-5 border">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg text-black">Deep House Cleaning</h3>
              <p className="text-sm text-gray-500">
                with ProClean Services
              </p>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
              In Progress
            </span>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <Image
              src="/assets/"
              alt="Provider"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="font-medium text-sm text-black">John Doe</p>
              <p className="text-xs text-gray-500">
                Provider is on the way
              </p>
            </div>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mt-4">
            <span>Tue, 28 May</span>
            <span>2:00 PM – 4:00 PM</span>
          </div>

          <div className="flex gap-3 mt-5">
            <button className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 cursor-pointer">
              Contact
            </button>
            <button className=" text-black flex-1 border rounded-lg py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer">
              Reschedule
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-sm p-5 border">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg text-black">Lawn Mowing</h3>
              <p className="text-sm text-gray-500">
                with GreenScape Experts
              </p>
            </div>
            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full ">
              Confirmed
            </span>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <Image
              src="/assets/"
              alt="Provider"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="font-medium text-sm text-black">Jane Smith</p>
              <p className="text-xs text-gray-500">
                Booking confirmed
              </p>
            </div>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mt-4">
            <span>Fri, 31 May</span>
            <span>10:00 AM</span>
          </div>

          <div className="flex gap-3 mt-5">
            <button className=" text-black cursor-pointer flex-1 border rounded-lg py-2 text-sm font-medium hover:bg-gray-50">
              View Details
            </button>
            <button className="flex-1 bg-red-100 text-red-600 rounded-lg py-2 text-sm font-medium hover:bg-red-200 cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

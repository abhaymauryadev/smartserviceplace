import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";

export default async function UserProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">My Profile</h1>
        <button className="border text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100">
          Share Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-black">
        {/* Left Sidebar */}
        <aside className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white border rounded-xl p-5 text-center">
            <div className="relative w-24 h-24 mx-auto mb-3">
              <Image
                src="/assets/images/placeholder.png"
                alt="Avatar"
                fill
                className="rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 bg-blue-600 text-white w-7 h-7 flex items-center justify-center rounded-full text-xs">
                ✎
              </span>
            </div>

            <h3 className="font-semibold">{session?.user?.name}</h3>
            <p className="text-xs text-gray-500 mb-4">
              Member since May 2023
            </p>

            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="font-semibold">12</p>
                <p className="text-gray-500 text-xs">Bookings</p>
              </div>
              <div>
                <p className="font-semibold">4.9</p>
                <p className="text-gray-500 text-xs">Rating</p>
              </div>
              <div>
                <p className="font-semibold">2</p>
                <p className="text-gray-500 text-xs">Reviews</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-white border rounded-xl p-4 space-y-2 text-sm">
            <p className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg font-medium">
              Personal Information
            </p>
            <p className="px-3 py-2 text-gray-600">Login & Security</p>
            <p className="px-3 py-2 text-gray-600">Payments & Payouts</p>
            <p className="px-3 py-2 text-gray-600">Preferences</p>
          </div>

          {/* Completion */}
          <div className="bg-white border rounded-xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Profile Completion</span>
              <span className="font-medium">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full w-[85%]" />
            </div>

            <div className="mt-4 bg-yellow-50 border border-yellow-100 rounded-lg p-3 text-xs">
              <p className="font-medium mb-1">
                Add a phone number
              </p>
              <p className="text-gray-600">
                Verify your phone to secure your account.
              </p>
            </div>
          </div>
        </aside>

        {/* Right Content */}
        <section className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <div className="bg-white border rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">
                Personal Information
              </h2>
              <button className="text-blue-600 text-sm font-medium">
                Edit
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="text-gray-500 text-xs">
                  First Name
                </label>
                <input
                  value="Alex"
                  readOnly
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                />
              </div>

              <div>
                <label className="text-gray-500 text-xs">
                  Last Name
                </label>
                <input
                  value="Morgan"
                  readOnly
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                />
              </div>

              <div>
                <label className="text-gray-500 text-xs">
                  Email Address
                </label>
                <input
                  value={session?.user?.email ?? ""}
                  readOnly
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                />
              </div>

              <div>
                <label className="text-gray-500 text-xs">
                  Phone Number
                </label>
                <input
                  value="+1 (555) 000-0000"
                  readOnly
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-gray-500 text-xs">
                Bio
              </label>
              <textarea
                rows={3}
                readOnly
                className="w-full border rounded-lg p-3 bg-gray-50 text-sm"
                defaultValue="Hi, I'm Alex. I love keeping my home organized and I'm looking for great local services."
              />
            </div>

            <div className="text-right mt-4">
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium">
                Save Changes
              </button>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white border rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Address</h2>
              <button className="text-blue-600 text-sm font-medium">
                + Add New
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="border rounded-lg p-4 flex justify-between items-center bg-blue-50">
                <div>
                  <p className="font-medium">
                    Home <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full ml-2">Primary</span>
                  </p>
                  <p className="text-gray-600">
                    123 Maple Street, Apt 4B
                  </p>
                  <p className="text-gray-500 text-xs">
                    Springfield, IL 62704
                  </p>
                </div>
                ✎
              </div>

              <div className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">Office</p>
                  <p className="text-gray-600">
                    456 Corporate Blvd, Suite 200
                  </p>
                  <p className="text-gray-500 text-xs">
                    Springfield, IL 62701
                  </p>
                </div>
                ✎
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

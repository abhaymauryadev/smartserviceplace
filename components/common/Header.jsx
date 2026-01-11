import { Search } from "lucide-react";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Header() {
    const session = await getServerSession(authOptions);
  return (
    <header className="w-full sticky top-0 bg-white border-b px-6 py-3 flex items-center justify-between">
      
      {/* Search */}
      <div className="relative w-full max-w-md ">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search/>
        </span>
        <input
          type="text"
          placeholder="Search for services..."
          className="w-full pl-10 pr-4 py-3 text-black rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* User Info */}
      <div className="flex items-center justify-center gap-3 ml-6">
        <div className="text-right leading-tight">
          <p className="text-sm font-semibold text-gray-900">
            {session?.user?.name}
          </p>
          <p className="text-xs text-gray-500">
            {session?.user?.email}
          </p>
        </div>

        <Image
          src="/assets/"
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>

    </header>
  );
}

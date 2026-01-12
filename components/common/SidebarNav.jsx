"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    CirclePlus,
    User,
    Bell,
} from "lucide-react";

export default function SidebarNav({ role }) {
    const pathname = usePathname();

    const isActive = (path, exact = false) =>
        exact
            ? pathname === path
            : pathname === path || pathname.startsWith(path + "/");

    const linkClass = (path, exact = false) =>
        `flex items-center gap-2 p-2 rounded transition ease-in-out duration-300
     ${isActive(path, exact)
            ? "bg-blue-500 text-white"
            : "text-black hover:bg-blue-200"
        }`;

    if (role === "user") {
        return (
            <>
                <Link href="/dashboard/user">
                    <div className={linkClass("/dashboard/user", true)}>
                        <LayoutDashboard size={18} />
                        Dashboard
                    </div>
                </Link>

                <Link href="/dashboard/user/bookings">
                    <div className={linkClass("/dashboard/user/bookings")}>
                        <CirclePlus size={18} />
                        Book a Service
                    </div>
                </Link>

                <Link href="/dashboard/user/profile">
                    <div className={linkClass("/dashboard/user/profile")}>
                        <User size={18} />
                        Profile
                    </div>
                </Link>

                <Link href="/dashboard/user/notifications">
                    <div className={linkClass("/dashboard/user/notifications")}>
                        <Bell size={18} />
                        Notifications
                    </div>
                </Link>
            </>
        );
    }

    if (role === "provider") {
        return (
            <>
                <Link href="/dashboard/provider">
                    <div className={linkClass("/dashboard/provider", true)}>
                        <LayoutDashboard size={18} />
                        Home
                    </div>
                </Link>

                <Link href="/dashboard/provider/services">
                    <div className={linkClass("/dashboard/provider/services")}>
                        My Services
                    </div>
                </Link>

                <Link href="/dashboard/provider/bookings">
                    <div className={linkClass("/dashboard/provider/bookings")}>
                        Bookings
                    </div>
                </Link>

                <Link href="/dashboard/provider/analytics">
                    <div className={linkClass("/dashboard/provider/analytics")}>
                        Analytics
                    </div>
                </Link>
            </>
        );
    }

    return null;
}

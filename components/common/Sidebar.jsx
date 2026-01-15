"use client";

import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import Image from "next/image";
import SidebarNav from "./SidebarNav";
import LogoutButton from "./LogoutButton";
import { usePathname } from "next/navigation";

export default function Sidebar({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Close sidebar when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            {/* Mobile Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md border text-black"
                aria-label="Toggle Menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white p-5 flex flex-col border-r border-gray-300 shadow-lg transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
        `}
            >
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-black">
                    <Image
                        src="/favicon.svg"
                        alt="logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    Smart Service
                </h2>

                <nav className="space-y-2 text-sm flex flex-col flex-1">
                    <SidebarNav role={user.role} />
                </nav>

                <div className="flex justify-start items-center gap-3 ">
                    <LogOut color="red" size={20} />
                    <LogoutButton />
                </div>
            </aside>
        </>
    );
}

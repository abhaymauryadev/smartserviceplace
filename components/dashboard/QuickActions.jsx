"use client";

import Link from "next/link";
// import ServiceForm from "./ServiceForm";
import { Plus, Calendar, Wallet, ChevronRight } from "lucide-react";

const actions = [
  { label: "Add New Service", icon: Plus, href: "/dashboard/provider/services" },
  { label: "View Calendar", icon: Calendar, href: "/dashboard/provider/calendar" },
  { label: "Withdraw Funds", icon: Wallet, href: "/dashboard/provider/withdraw" },
];

export default function QuickActions() {
  return (
    <div className="bg-white border rounded-xl p-4 space-y-3">
      <h3 className="font-semibold">Quick Actions</h3>

      {actions.map((action, i) => {
        const Icon = action.icon;
        return (
          <Link
            key={i} 
            href={action.href}
            className="w-full flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 text-sm"
          >
            <span className="flex items-center gap-2">
              <Icon size={16} /> {action.label}
            </span>
            <ChevronRight size={16} />
          </Link>
        );
      })}
    </div>
  );
}

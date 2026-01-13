"use client";

import { Plus, Calendar, Wallet } from "lucide-react";

const actions = [
  { label: "Add New Service", icon: Plus },
  { label: "View Calendar", icon: Calendar },
  { label: "Withdraw Funds", icon: Wallet },
];

export default function QuickActions() {
  return (
    <div className="bg-white border rounded-xl p-4 space-y-3">
      <h3 className="font-semibold">Quick Actions</h3>

      {actions.map((action, i) => {
        const Icon = action.icon;
        return (
          <button
            key={i}
            className="w-full flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 text-sm"
          >
            <span className="flex items-center gap-2">
              <Icon size={16} /> {action.label}
            </span>
            →
          </button>
        );
      })}
    </div>
  );
}

"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Logout Button */}
      <button
        onClick={() => setOpen(true)}
        className="mt-auto text-left text-red-400 hover:text-red-500"
      >
        Logout
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 ">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-3">
                <LogOut color="red" />
              </div>

              <h2 className="text-lg font-semibold text-gray-900">
                Log out
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Are you sure you want to log out?
                <br />
                You will need to sign in again.
              </p>

              <div className="flex gap-3 mt-6 w-full">
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 border rounded-md py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex-1 bg-red-600 text-white rounded-md py-2 text-sm hover:bg-red-700"
                >
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

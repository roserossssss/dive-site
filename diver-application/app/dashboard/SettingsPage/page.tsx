"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bell, HelpCircle, Info } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Title Section */}
      <div className="fixed top-0 left-0 w-full bg-white z-10 p-4 rounded-t-2xl md:pl-80">
        <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-[#001526] text-center md:text-left mt-2">Settings</h2>
      </div>

      {/* Main Content */}
      <main className="flex-1 mt-16 ml-2 md:ml-10 lg:ml-12 p-4">
        <div className="space-y-11">
          {/* Notifications */}
          <div>
            <h3 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-[#001526]">
              <Bell size={24} className="text-[#001526]" /> Notifications
            </h3>

            <div className="flex items-center justify-between mt-3 p-4 w-full md:w-80 bg-white rounded-3xl shadow-md border">
              <label htmlFor="notifications-toggle" className="text-[#001526] font-medium">
                Enable Notification
              </label>
              <label className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  id="notifications-toggle"
                  className="sr-only peer"
                  checked={notificationsEnabled}
                  onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                  aria-label="Enable or disable notifications"
                />
                <div
                  className={`w-14 h-8 border-2 border-gray-500 peer-focus:ring-2 rounded-full peer transition ${
                    notificationsEnabled ? "bg-gray-300" : "border-gray-500"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-[#2C7DA0] rounded-full transition-transform ${
                      notificationsEnabled ? "translate-x-6" : ""
                    }`}
                  />
                </div>
              </label>
            </div>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-[#001526]">
              <HelpCircle size={24} className="text-[#001526]" /> Need Help?
            </h3>
            <button
              onClick={() => router.push("/dashboard/SettingsPage/NeedHelp")}
              className="mt-3 w-full md:w-80 p-4 border rounded-3xl flex justify-between items-center bg-white shadow-md hover:bg-gray-100 transition"
            >
              <span className="text-[#001526] font-medium">Help and Support</span>
              <span className="text-[#001526]">&gt;</span>
            </button>
          </div>

          {/* About Section */}
          <div>
            <h3 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-[#001526]">
              <Info size={24} className="text-[#001526]" /> Learn more about us
            </h3>
            <button
              onClick={() => router.push("/dashboard/SettingsPage/About")}
              className="mt-3 w-full md:w-80 p-4 border rounded-3xl flex justify-between items-center bg-white shadow-md hover:bg-gray-100 transition"
            >
              <span className="text-[#001526] font-medium">About</span>
              <span className="text-[#001526]">&gt;</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
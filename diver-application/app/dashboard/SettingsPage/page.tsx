"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bell, HelpCircle, Info } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter(); 
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <main className="flex-1 p-10 pt-0">
        <h2 className="text-4xl text-black font-bold mb-4">Settings</h2>

        {/* Notifications */}
        <div className="mb-6 mt-8">
          <h3 className="flex items-center gap-2 text-2xl font-bold text-black">
            <Bell size={24} className="text-black" /> Notifications
          </h3>

          <div className="flex items-center justify-between mt-3 p-4 w-80 bg-white rounded-xl shadow-md border">
            <label htmlFor="notifications-toggle" className="text-black font-medium">
              Enable Notification
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
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
                  className={`absolute top-1 left-1 w-6 h-6 bg-teal-700 rounded-full transition-transform ${
                    notificationsEnabled ? "translate-x-6" : ""
                  }`}
                />
              </div>
            </label>
          </div>
        </div>

        {/* Help Section */}
        <div className="mb-6">
          <h3 className="flex items-center gap-2 text-2xl font-bold text-black">
            <HelpCircle size={24} className="text-black" /> Need Help?
          </h3>
          <button 
            onClick={() => router.push("/dashboard/SettingsPage/NeedHelp")} 
            className="mt-3 w-80 p-4 border rounded-xl flex justify-between items-center bg-white shadow-md hover:bg-gray-100 transition"
          >
            <span className="text-black font-medium">Help and Support</span>
            <span className="text-black">&gt;</span>
          </button>
        </div>

        {/* About Section */}
        <div>
          <h3 className="flex items-center gap-2 text-2xl font-bold text-black">
            <Info size={24} className="text-black" /> Learn more about us
          </h3>
          <button 
           onClick={() => router.push("/dashboard/SettingsPage/About")} 
           className="mt-3 w-80 p-4 border rounded-xl flex justify-between items-center bg-white shadow-md hover:bg-gray-100 transition">
            <span className="text-black font-medium">About</span>
            <span className="text-black">&gt;</span>
          </button>
        </div>
      </main>
    </div>
  );
}

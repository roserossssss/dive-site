"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bell, HelpCircle, Info, ChevronRight} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Title Section */}
      <div className="fixed top-0 left-0 w-full bg-[#001526] z-10 p-4 rounded-t-2xl md:pl-80">
        <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-white text-center md:text-left mt-2">Settings</h2>
      </div>

      {/* Main Content */}
      <main className="flex-1 mt-16 ml-2 md:ml-10 lg:ml-12 p-4">
        <div className="space-y-11">
          {/* Notifications */}
          <div>
            <h3 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-white">
              <Bell size={24} className="text-white" /> Notifications
            </h3>

            <div className="flex items-center justify-between mt-3 p-4 w-full md:w-80 bg-[#001526] rounded-3xl shadow-md border">
              <label htmlFor="notifications-toggle" className="text-white font-medium">
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
                  className={`w-14 h-8 border-2 border-[#001526] peer-focus:ring-2 rounded-full peer transition ${
                    notificationsEnabled ? "bg-white" : "border-gray-500"
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
            <h3 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-white">
              <HelpCircle size={24} className="text-white" /> Need Help?
            </h3>
            <button
              onClick={() => router.push("/Admin-Dashboard/SettingsPage/NeedHelp")}
              className="mt-3 w-full md:w-80 p-4 border rounded-3xl flex justify-between items-center bg-[#001526] shadow-md"
            >
              <span className="text-white font-medium">Help and Support</span>
              <span className="text-white transition duration-300 ease-in-out">
                <ChevronRight size={24} strokeWidth={3} />
                </span>
            </button>
          </div>

          {/* About Section */}
          <div>
            <h3 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-white">
              <Info size={24} className="text-white" /> Learn more about us
            </h3>
            <button
              onClick={() => router.push("/Admin-Dashboard/SettingsPage/About")}
              className="mt-3 w-full md:w-80 p-4 border rounded-3xl flex justify-between items-center bg-[#001526] shadow-md"
            >
              <span className="text-white font-medium">About</span>
              <span className="text-white transition duration-300 ease-in-out">
                <ChevronRight size={24} strokeWidth={3} />
                </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
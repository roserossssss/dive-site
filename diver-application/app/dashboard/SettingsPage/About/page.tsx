"use client";

import { useRouter } from "next/navigation";
import { HelpCircle, ArrowRight } from "lucide-react";

export default function AboutUsPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-white">
      {/* Main Content */}
      <main className="flex-1 p-10 pt-0 relative">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <HelpCircle size={30} /> Learn more about us
          </h2>

          {/* Leave Button */}
          <button
            onClick={() => router.push("/dashboard/SettingsPage")}
            className="bg-[#2C6D89] hover:bg-[#1E4D62] text-white rounded-xl p-3 shadow-lg transition duration-300 relative right-6"
            title="Go back to Settings"
            aria-label="Go back to Settings"
          >
            <ArrowRight size={25} />
          </button>
        </div>

        {/* About Us Content */}
        <div className="mt-10 mx-auto  p-15 bg-[#D9E7EC] text-black rounded-2xl shadow-lg border-2 lg:w-[870px] lg:h-[650px] flex flex-col items-center justify-center">
          {/* Logo */}
          <div className="lg:w-[270px] lg:h-[270px]  flex justify-center lg:-mt-20 mt-10 m-12">
            <img src="/masterliveboards.svg" alt="Master LiveBoards Logo" className="object-contain" />
          </div>

          <div className="text-center mt-10 px-8">
            <p className="text-lg text-gray-800">
              Master Liveboards is your ultimate companion for logging, managing, and enhancing your diving experiences.
              Whether you're a beginner or a seasoned diver, our platform provides the tools you need to track dives, manage
              certifications, and ensure safety—all in one place.
            </p>
            <p className="text-2xl text-[#001526] mt-20 font-bold">Dive Deeper, Dive Smarter with Master LiveBoards!</p>
          </div>
        </div>
      </main>
    </div>
  );
}

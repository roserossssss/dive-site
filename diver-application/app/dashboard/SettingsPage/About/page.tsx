"use client";

import { useRouter } from "next/navigation";
// import { HelpCircle } from "lucide-react";
import { IoIosArrowBack } from "react-icons/io";
import Image from 'next/image';

export default function AboutUsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row">
      {/* Title Section */}
      <div className="fixed top-0 left-0 w-full bg-white z-10 p-4 rounded-t-2xl md:pl-80">
        <div className="flex items-center justify-between md:justify-start">
          <IoIosArrowBack
            size={30}
            className="cursor-pointer mr-3 mt-2 text-[#001526]"
            onClick={() => router.push("/dashboard/SettingsPage")}
            title="Go back to Settings"
            aria-label="Go back to Settings"
          />
          <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-[#001526] text-center flex-1 md:flex-none mt-2 mr-10">
            Learn more about us
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mt-16 mx-auto p-4 flex justify-center items-center">
        <div className="mt-6 mx-auto p-6 bg-[#D9E7EC] text-[#001526] rounded-2xl shadow-lg border-2 lg:w-[870px] lg:h-[650px] flex flex-col items-center justify-center">
          {/* Logo */}
          <div className="w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] flex justify-center mb-1 lg:mb-2">
            <Image width={20} height={20} src="/images/dive_light_logo_name.svg" alt="Master LiveBoards Logo" className="object-contain" />
          </div>

          <div className="text-center mt-1 lg:mt-2 px-4 lg:px-8">
            <div className="mb-1 lg:mb-2">
              <p className="text-base lg:text-lg text-[#001526]">
                Master Liveboards is your ultimate companion for logging, managing, and enhancing your diving experiences.
                Whether you&apos;re a beginner or a seasoned diver, our platform provides the tools you need to track dives, manage
                certifications, and ensure safety—all in one place.
              </p>
            </div>
            <div className="text-center mb-4 mt-5 lg:mt-8 px-4 lg:px-8">
              <p className="text-xl lg:text-2xl text-[#001526] font-bold">
                Dive Deeper, Dive Smarter with Master LiveBoards!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
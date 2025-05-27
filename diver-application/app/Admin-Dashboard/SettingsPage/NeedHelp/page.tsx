"use client";

import { useRouter } from "next/navigation";
import { LifeBuoy, Monitor, BarChart3, Mail } from "lucide-react";
import { GiTropicalFish } from "react-icons/gi";
import { IoIosArrowBack } from "react-icons/io";

export default function HelpPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row">
      {/* Title Section */}
      <div className="fixed top-0 left-0 w-full bg-[#001526] z-10 p-4 rounded-t-2xl md:pl-80">
        <div className="flex items-center justify-between md:justify-start">
          <IoIosArrowBack
            size={30}
            className="cursor-pointer mr-3 mt-2 text-white transition duration-300 ease-in-out"
            onClick={() => router.push("/Admin-Dashboard/SettingsPage")}
            title="Go back to Settings"
            aria-label="Go back to Settings"
          />
          <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-white text-center flex-1 md:flex-none mt-2 mr-10">
            Need Help?
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:mt-10 mt-8 mx-auto p-4">
        {/* Help Cards Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-7 justify-items-center">
          <HelpCard
            icon={<GiTropicalFish size={130} className="text-[#001526]" />}
            title="New to the Admin Side?"
            description="Easily manage everything by exploring each section of the admin panel."
          />

          <HelpCard
            icon={<Monitor size={130} className="text-[#001526]" />}
            title="Admin Role"
            description="Oversee diver accounts with access to their dive uploads, certifications, personal and medical details."
          />

          <HelpCard
            icon={<BarChart3 size={130} className="text-[#001526]" />}
            title="Analytics Dashboard"
            description="View dive statistics, activity trends, and performance reports in one place."
          />

          <HelpCard
            icon={<Mail size={130} className="text-[#001526]" />}
            title="Contact Support"
            description="For further assistance, reach support at: masterliveaboards@gmail.com"
          />
        </div>
      </main>
    </div>
  );
}

// Help Card Component
function HelpCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[#D9E7EC] p-6 rounded-xl text-center flex flex-col items-center justify-center w-[350px] h-[350px] md:w-[530px] md:h-[350px]">
      <div className="text-[#001526] text-[120px] flex justify-center">
        {icon}
      </div>
      <h3 className="mt-4 text-2xl font-bold text-[#001526]">{title}</h3>
      <p className="mt-2 text-base text-[#001526] px-2">{description}</p>
    </div>
  );
}
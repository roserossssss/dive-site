"use client";

import { useRouter } from "next/navigation";
import { LifeBuoy, Monitor, FileText, Heart, RefreshCcw, Mail } from "lucide-react";
import { IoIosArrowBack } from "react-icons/io";

export default function HelpPage() {
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
            Need Help?
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mt-16 mx-auto p-4">
        {/* Help Cards */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 justify-items-center">
          <HelpCard
            icon={<LifeBuoy size={130} className="text-[#001526]" />}
            title="New to Master Liveboards?"
            description="Set up your account, verify your profile, and start logging dives."
          />

          <HelpCard
            icon={<Monitor size={130} className="text-[#001526]" />}
            title="Dive Management"
            description="Upload your certifications to keep digital records of your licenses."
          />

          <HelpCard
            icon={<FileText size={130} className="text-[#001526]" />}
            title="Dive Certification"
            description="Keep track of your dives and maintain accurate records."
          />

          <HelpCard
            icon={<Heart size={130} className="text-[#001526]" />}
            title="Medical Profile and Safety"
            description="Add medical details for dive operators to access important health information."
          />

          <HelpCard
            icon={<RefreshCcw size={130} className="text-[#001526]" />}
            title="Troubleshooting & FAQs"
            description="Reset your password and recover your account if needed."
          />

          <HelpCard
            icon={<Mail size={130} className="text-[#001526]" />}
            title="Contact Support"
            description="For further assistance, reach support at: masterliveboards@gmail.com"
          />
        </div>
      </main>
    </div>
  );
}

// Help Card Component
function HelpCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-[#D9E7EC] p-6 rounded-xl shadow-lg shadow-gray-400 text-center flex flex-col items-center justify-center w-[335px] h-[357px]">
      <div className="text-[#001526] text-[120px] flex justify-center">{icon}</div>
      <h3 className="mt-4 text-2xl font-bold text-[#001526]">{title}</h3>
      <p className="mt-2 text-base text-[#001526]">{description}</p>
    </div>
  );
}
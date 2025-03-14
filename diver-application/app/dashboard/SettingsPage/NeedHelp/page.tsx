"use client";

import { useRouter } from "next/navigation";
import { LifeBuoy, Monitor, FileText, Heart, RefreshCcw, Mail,  ArrowRight } from "lucide-react";

export default function HelpPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-white relative">

     {/* Main Content */}
     <main className="flex-1 p-10 pt-0 relative">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
            <LifeBuoy size={30} /> Need Help?
          </h2>

          {/* Leave Button */}
          <button
          onClick={() => router.push("/dashboard/SettingsPage")}
          className="bg-[#2C6D89] hover:bg-[#1E4D62] text-white rounded-xl p-3 shadow-lg transition duration-300 relative right-11"
          title="Go back to Settings"
          aria-label="Go back to Settings"
          >
            <ArrowRight size={25} />
            </button>
            </div>
        
        {/* Help Cards */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 justify-items-center">
          <HelpCard icon={<LifeBuoy size={130} />} title="New to Master Liveboards?" 
            description="Set up your account, verify your profile, and start logging dives." />
          
          <HelpCard icon={<Monitor size={130} />} title="Dive Management" 
            description="Upload your certifications to keep digital records of your licenses." />
          
          <HelpCard icon={<FileText size={130} />} title="Dive Certification" 
            description="Keep track of your dives and maintain accurate records." />
          
          <HelpCard icon={<Heart size={130} />} title="Medical Profile and Safety" 
            description="Add medical details for dive operators to access important health information." />
          
          <HelpCard icon={<RefreshCcw size={130} />} title="Troubleshooting & FAQs" 
            description="Reset your password and recover your account if needed." />
          
          <HelpCard icon={<Mail size={130} />} title="Contact Support" 
            description="For further assistance, reach support at: masterliveboards@gmail.com" />
        </div>
      </main>
    </div>
  );
}

// Help Card Component
function HelpCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-[#D9E7EC] p-6 rounded-xl shadow-lg shadow-gray-400 text-center flex flex-col items-center justify-center w-[335px] h-[357px]">
      <div className="text-[#374957] text-[120px] flex justify-center">{icon}</div>
      <h3 className="mt-4 text-2xl font-bold text-[#374957]">{title}</h3>
      <p className=" mt-2 text-lg text-[#374957]">{description}</p>
    </div>
  );
}

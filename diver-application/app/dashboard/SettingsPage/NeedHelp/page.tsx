"use client";

import { useRouter } from "next/navigation";
import { LifeBuoy, Monitor, FileText, Heart, RefreshCcw, Mail } from "lucide-react";

export default function HelpPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-white">

      {/* Main Content */}
      <main className="flex-1 p-10 pt-0">
        <h2 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
          <LifeBuoy size={30} /> Need Help?
        </h2>

        {/* Help Cards */}
        <div className="mt-6 grid grid-cols-3 gap-6">
          <HelpCard icon={<LifeBuoy size={40} />} title="New to Master Liveboards?" 
            description="Set up your account, verify your profile, and start logging dives." />
          
          <HelpCard icon={<Monitor size={40} />} title="Dive Management" 
            description="Upload your certifications to keep digital records of your licenses." />
          
          <HelpCard icon={<FileText size={40} />} title="Dive Certification" 
            description="Keep track of your dives and maintain accurate records." />
          
          <HelpCard icon={<Heart size={40} />} title="Medical Profile and Safety" 
            description="Add medical details for dive operators to access important health information." />
          
          <HelpCard icon={<RefreshCcw size={40} />} title="Troubleshooting & FAQs" 
            description="Reset your password and recover your account if needed." />
          
          <HelpCard icon={<Mail size={40} />} title="Contact Support" 
            description="For further assistance, reach support at: masterliveboards@gmail.com" />
        </div>
      </main>
    </div>
  );
}

// Help Card Component
function HelpCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-[#D9E7EC] p-6 rounded-xl shadow-lg text-center flex flex-col items-center justify-center w-[340px] h-[360px]">
      <div className="text-[#374957] text-[130px] flex justify-center">{icon}</div>
      <h3 className="mt-4 text-3xl font-bold text-[#374957]">{title}</h3>
      <p className="text-gray-600 mt-2 text-lg text-[#374957]">{description}</p>
    </div>
  );
}


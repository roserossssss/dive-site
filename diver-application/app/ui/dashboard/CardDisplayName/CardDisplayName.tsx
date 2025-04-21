"use client";

import Link from 'next/link';
import Image from 'next/image';

interface ProfileData {
  name: string;
}

export default function WelcomeCard() {

  const userProfile: ProfileData = {
    name: "John Doe"
  };

  return (
    <div className="bg-[#2C7DA0] text-white lg:p-6 lg:pl-12 p-8 rounded-lg shadow-md w-full h-full mx-auto grid lg:grid-cols-[1.5fr_1fr] md:grid-cols-2 gap-4">
      <div className="flex flex-col justify-center text-center lg:text-left">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome, {userProfile.name}!
        </h1>
        
        <p className="text-[14px] text-white mb-5">
          Stay updated with your dive history and make every dive count!
        </p>
        <Link
          href="/dashboard/DiveManagement" 
          className="inline-block"
        >
          <button className="bg-[#001526] text-white text-sm font-semibold py-3 px-4 rounded-lg w-full transition-colors hover:bg-[#002233]">
            Check Dive Logs
          </button>
        </Link>
      </div>
    
      <div className="flex justify-center items-center">
        <Image
          src="/images/db_welcome_user.svg" 
          alt="Dive Welcome Illustration" 
          className="w-auto h-40" 
          width={250}
          height={250}
          priority={true}
        />
      </div>
    </div>
  );
}
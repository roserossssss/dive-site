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
    <div className="bg-[#2C7DA0] text-white p-8 rounded-lg shadow-md w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          Welcome, {userProfile.name}
        </h1>
        
        <p className="text-xs text-white text-opacity-70 mb-4">
          Stay updated with your dive history and make every dive count!
        </p>
        
        <Link 
          href="/dashboard/DiveManagement" 
          className="inline-block"
        >
          <button className="bg-[#001526] text-white text-sm font-semibold py-3 px-4 rounded-lg w-full transition-colors hover:bg-opacity-90">
            Check Dive Logs →
          </button>
        </Link>
      </div>
    
      <div className="flex justify-center items-center">

              <Image
          src="/images/db_welcome_user.svg" 
          alt="Dive Welcome Illustration" 
          className="w-auto h-36" 
          width={250}
          height={250}
          priority={true}
        />
      </div>
    </div>
  );
}
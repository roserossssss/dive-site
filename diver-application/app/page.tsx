import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-200 flex justify-center">
      {/* Background Image */}
      <Image 
        src="/images/page_bg_v2.jpg"  
        alt="Landing Page"
        layout="fill"
        objectFit="cover"
        priority 
        className="absolute inset-0"
      />

      <div className="relative flex flex-col lg:flex-row w-full">
        <div className="w-full lg:m-20 p-4">
          <div className="mt-[6rem] lg:mt-12 lg:ml-[6.3rem] flex justify-center lg:justify-start">
            {/* Logo */}
            <Image 
              src="/images/landing_page_logo.png" 
              alt="logo" 
              width={300} 
              height={300}
            />
          </div>

          {/* Body */}
          <div className="mt-4 lg:ml-28 text-center lg:text-left">
            <h1 className="text-3xl lg:text-5xl font-bold mt-8 text-[#001526]">
              Truly Inspirational
            </h1>
            <h1 className="text-3xl lg:text-5xl font-bold mt-2 text-[#001526]">
              Diving Experiences
            </h1>
            <h2 className="text-lg lg:text-[22px] mt-8 text-[#001526]">
              Dive smarter with an all-in-one platform to track your dives, stay organized, <br className="hidden lg:block" />
              analyze your progress, and make every dive count!
            </h2>

            {/* Sign-up button */}
            <div className="mt-56 lg:mt-32 flex justify-center lg:justify-start">
              <Link href="/Authentication/signup">
                <button className="w-44 lg:w-48 bg-[#D9E7EC] text-[#001526] py-3 rounded-3xl hover:bg-blue-700 transition font-semibold">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
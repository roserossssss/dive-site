import Image from "next/image";
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

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

      {/* Top Right Auth Buttons */}
      <div className="absolute top-6 right-10 flex gap-4 z-10">
      <Link href="/contact">
      <button className="px-5 py-2 rounded-full text-xs md:text-sm text-[#001526] font-semibold bg-transparent hover:bg-[#005f80]/40 hover:text-white hover:text-opacity-90 transition">
      Contact Us
      </button>
      </Link>
      <Link href="/Authentication/login">
      <button className="px-5 py-2 rounded-full text-xs md:text-sm text-[#001526] font-semibold bg-transparent hover:bg-[#005f80]/40 hover:text-white hover:text-opacity-90 transition">
      Log In
      </button>
      </Link>
      <Link href="/Authentication/signup">
      <button className="px-5 py-2 rounded-full text-xs md:text-sm text-white font-semibold bg-[#005f80] hover:bg-[#00384e] transition">
        Sign Up
        </button>
        </Link>
        </div>

      <div className="relative flex flex-col lg:flex-row w-full">
        <div className="w-full lg:m-20 p-4">
          <div className="mt-[6rem] lg:mt-20 lg:ml-[6.3rem] flex justify-center lg:justify-start">
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
            <div className="mt-40 lg:mt-10 flex flex-col items-center lg:items-start gap-4">
              <Link href="/Authentication/signup">
                <button className="w-44 bg-[#D9E7EC] text-[#001526] py-4 rounded-3xl hover:bg-[#005f80] hover:text-white transition font-semibold">
                  Get Started
                </button>
              </Link>

              {/* Social Media Links */}
              <div className="flex gap-9 mt-5 text-[#001526]">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF className="hover:text-[#D9E7EC] lg:hover:text-[#005f80] text-2xl transition" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="hover:text-[#D9E7EC] lg:hover:text-[#005f80] text-2xl transition" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="hover:text-[#D9E7EC] lg:hover:text-[#005f80] text-2xl transition" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <FaYoutube className="hover:text-[#D9E7EC] lg:hover:text-[#005f80] text-2xl transition" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

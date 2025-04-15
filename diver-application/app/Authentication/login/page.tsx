"use client";

import Link from 'next/link';
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-200 flex items-center justify-center">
      <Image 
        src="/images/page_bg_v2.jpg"  
        alt="Master Liveaboards"
        objectFit="cover"
        priority 
        className="absolute inset-0 w-full h-full"
        width={1500}
        height={0}
      />
      
      <div className="relative z-10 flex w-full lg:w-2/4 justify-center items-center ml-auto lg:p-8 p-4">
        <div className="w-full max-w-xl lg:p-8 p-4">
          <form className="bg-[#D9E7EC] p-8 rounded-3xl shadow-lg w-full lg:pt-16 pt-5 lg:pb-24 pb-12 lg:pl-14 lg:pr-14">
            <div className="flex flex-col items-center lg:px-6 px-4">
              <Image 
                className="w-40 h-40 mb-4" 
                src="/images/dive_light_logo_name.svg" 
                alt="logo" 
                width={40} 
                height={40} 
              />
              <h1 className="text-2xl font-bold text-center mb-6 text-[#001526]">Log in</h1>

              {/* Email Address */}
              <div className="relative w-full mb-3">
                <input
                  type="email"
                  id="email"
                  placeholder=" "
                  className="peer h-12 w-full border border-[#001526] rounded-3xl px-3 pt-4 pb-1 text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#005f80] focus:border-0 bg-[#D9E7EC] text-[#001526]"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-3 top-1/5 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#005f80] bg-[#D9E7EC] px-1"
                >
                  Email Address
                </label>
              </div>

              {/* Password */}
              <div className="relative w-full mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder=" "
                  className="peer h-12 w-full border border-[#001526] rounded-3xl px-3 pt-4 pb-1 text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#005f80] focus:border-0 bg-[#D9E7EC] text-[#001526]"
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute left-3 top-1/5 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#005f80] bg-[#D9E7EC] px-1"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#001526]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end w-full mb-2 text-[15px]">
                <Link href="/forgot-password" className="text-[#001526] hover:text-[#CF0C0F] font-bold">
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button className="w-full bg-[#001526] text-white py-2 rounded-3xl hover:bg-[#005f80] transition mt-6 text-[15px] font-semibold">
                Login
              </button>

              {/* Signup Redirect */}
              <div className="flex justify-center mt-3 text-[15px]">
                <span className="text-[#001526] font-bold">Don&apos;t have an account?</span>
                <Link href="/Authentication/signup" className="text-[#005f80] hover:underline font-bold ml-2">
                  Sign-up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from 'next/link';
import { CiCalendar } from "react-icons/ci";
import { useRef, useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const dateInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-200 flex items-center justify-center">
      <Image 
        src="/images/page_bg_v2.jpg"  
        alt="Landing Page"
        objectFit="cover"
        priority 
        className="absolute inset-0 w-full h-full"
        width={1500}
        height={0}
      />
      
      <div className="relative z-10 flex w-full lg:w-2/4 justify-center items-center ml-auto lg:p-8 p-4">
        <div className="w-full max-w-xl lg:p-8 p-4">
          <form className="bg-[#D9E7EC] p-8 rounded-3xl shadow-lg w-full py-12 lg:py-16 px-12">
            <div className="flex flex-col items-center lg:px-6 px-4">
              <h1 className="text-2xl font-bold text-center mb-8 text-[#001526]">
                Create Account
              </h1>

              {/* First & Last Name */}
              <input    
                type="text" 
                placeholder="First Name" 
                className="w-full pl-4 p-2 mb-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#005f80] bg-[#D9E7EC] border-black border-t-1 text-[15px] text-[#001526]"
                required 
              />
              <input    
                type="text" 
                placeholder="Last Name" 
                className="w-full pl-4 p-2 mb-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#005f80] bg-[#D9E7EC] border-black border-t-1 text-[15px] text-[#001526]"
                required 
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-3">
                {/* Birthday Field */}
                <div className="relative mt-1 mb-1">
                  <label className="block text-[#001526] font-semibold ml-1 mb-1">Birthday</label>
                  <input 
                    type="date" 
                    ref={dateInputRef} 
                    placeholder="Birthday"
                    className="w-full pl-4 p-2 border rounded-3xl text-[#001526] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#005f80] bg-[#D9E7EC] border-black border-t-1"
                    required 
                    style={{ appearance: "none" }}
                  />
                  <CiCalendar 
                    className="absolute right-4 top-9 text-[#001526] text-2xl cursor-pointer" 
                    onClick={() => (dateInputRef.current as unknown as HTMLInputElement)?.showPicker()}
                  />
                </div>

                {/* Gender Selection */}
                <div className="mt-1 mb-1">
                  <label className="block text-[#001526] font-semibold ml-1 mb-1">Sex</label>
                  <div className="flex items-center justify-center space-x-4 border border-black rounded-3xl p-2 bg-[#D9E7EC]">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        className="mr-2 w-3 h-3 appearance-none rounded-full border-2 border-[#001526] checked:bg-[#001526] checked:border-[#001526] transition duration-200"
                        required
                      />
                      <span className="text-[#001526] text-[15px] font-medium">Male</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        className="mr-2 w-3 h-3 appearance-none rounded-full border-2 border-[#001526] checked:bg-[#001526] checked:border-[#001526] transition duration-200"
                        required
                      />
                      <span className="text-[#001526] text-[15px] font-medium">Female</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Email */}
              <input    
                type="text" 
                placeholder="Email Address" 
                className="w-full pl-4 p-2 mb-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#005f80] bg-[#D9E7EC] border-black border-t-1 text-[15px] text-[#001526]"
                required 
              /> 
              
              <div className="w-full max-w-xl mx-auto px-0">
                {/* Password */}
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    className="w-full pl-4 pr-10 p-2 mb-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#005f80] bg-[#D9E7EC] border-black text-[15px] text-[#001526]"
                    required 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/3 -translate-y-1/3 text-[#001526]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Re-enter Password */}
                <div className="relative">
                  <input 
                    type={showRePassword ? "text" : "password"} 
                    placeholder="Re-enter Password" 
                    className="w-full pl-4 pr-10 p-2 mb-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#005f80] bg-[#D9E7EC] border-black text-[15px] text-[#001526]"
                    required 
                  />
                  <button
                    type="button"
                    onClick={() => setShowRePassword(!showRePassword)}
                    className="absolute right-4 top-1/3 -translate-y-1/3 text-[#001526]"
                  >
                    {showRePassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Signup Button */}
              <button className="w-full bg-[#001526] text-white py-2 rounded-3xl hover:bg-[#005f80] transition mt-6 text-[15px] font-semibold">
                Sign up
              </button>

              {/* Login Redirect */}
              <div className="flex justify-center mt-3 text-[15px]">
                <span className="text-[#001526] font-bold">Already have an account?</span>
                <Link href="/Authentication/login" className="text-[#005f80] hover:underline font-bold ml-2">
                  Log-in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

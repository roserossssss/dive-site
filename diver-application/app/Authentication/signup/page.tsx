"use client";

import Link from 'next/link';
import { CiCalendar } from "react-icons/ci";
import { useRef } from "react";
import Image from "next/image";

export default function Signup() {
  const dateInputRef = useRef(null);

  return (
    <div className="relative min-h-screen bg-gray-200 flex items-center justify-center">
      <Image 
              src="/images/Landing_Page.jpg"  
              alt="Landing Page"
              layout="fill"
              objectFit="cover"
              priority 
              className="absolute inset-0 brightness-110 contrast-105"
                />
        

      {/* Container */}
      <div className="relative z-10 flex w-full lg:w-3/5 justify-center items-center ml-auto lg:p-16">
        

        <div className="w-full max-w-4xl lg:p-12 p-6">
          <form className="bg-[#D9E7EC] p-10 rounded-3xl shadow-lg w-full">
            <div className="flex flex-col items-center lg:px-10">
              
              <h1 className="text-3xl font-bold text-center mb-10 text-[#001526]">
                Create Account
              </h1>

              {/* First & Last Name */}
              <input    
                type="text" 
                placeholder="First Name" 
                className="w-full mb-4 p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9E7EC] border-black border-t-1"
                required 
              />

              <input    
                type="text" 
                placeholder="Last Name" 
                className="w-full p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9E7EC] border-black border-t-1"
                required 
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                
                {/* Birthday Field */}
                <div className="relative">
                  <label className="block text-[#001526] font-bold mb-2">Birthday</label>
                  <input 
                    type="date" 
                    ref={dateInputRef} 
                    className="w-full p-3 pr-10 border rounded-3xl text-[#001526] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9E7EC] border-black border-t-1"
                    required 
                    style={{ appearance: "none" }} // Hides default calendar icon in Firefox
                  />
                  {/* Clickable Calendar Icon */}
                  <CiCalendar 
                    className="absolute right-3 top-11 text-black text-2xl cursor-pointer" 
                    onClick={() => (dateInputRef.current as unknown as HTMLInputElement)?.showPicker()} // Opens date picker
                  />
                </div>

                {/* Gender Selection */}
                <div>
                  <label className="block text-[#001526] font-bold mb-2">Sex</label>
                  <div className="flex items-center justify-start space-x-6 border border-black rounded-3xl p-3 bg-[#D9E7EC]">
                    <label className="flex items-center">
                      <input type="radio" name="gender" value="male" className="mr-2" required />
                      <span className="text-[#001526] font-bold">Male</span>
                    </label>

                    <label className="flex items-center">
                      <input type="radio" name="gender" value="female" className="mr-2" required />
                      <span className="text-[#001526] font-bold">Female</span>
                    </label>
                  </div>
                </div>

              </div>

              {/* Email */}
              <input    
                type="text" 
                placeholder="Email Address" 
                className="w-full p-3 mt-4 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9E7EC] border-black border-t-1"
                required 
              />    

              {/* Password */}
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full p-3 mt-4 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9E7EC] border-black border-t-1"
                required 
              />
              
              <input 
                type="password" 
                placeholder="Re-enter Password" 
                className="w-full p-3 mt-4 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9E7EC] border-black border-t-1"
                required 
              />

              {/* Signup Button */}
              <button className="w-full bg-[#001526] text-white py-3 rounded-2xl hover:bg-blue-700 transition mt-8">
                Sign up
              </button>

              {/* Login Redirect */}
              <div className="flex justify-center mt-4">
                <span className="text-[#001526] font-bold">Already have an account?</span>
                <Link href="/Authentication/login" className="text-[#2C7DA0] hover:underline font-bold ml-2">
                  Log-in
                </Link>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

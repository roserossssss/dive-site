import Link from 'next/link';
import Image from "next/image";

export default function Login() {
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
            <div className="relative z-10 flex w-full lg:w-3/5 justify-center items-center ml-auto lg:p-16">
                

                <div className="w-full max-w-4xl lg:p-12 p-6">
                    <form className="bg-[#D9E7EC] p-10 rounded-3xl shadow-lg w-full">
                        <div className="flex flex-col items-center lg:px-10">

                        <img className="w-32 h-32 mb-4" src="../masterliveboards.svg"/>
                            
                            <h1 className="text-3xl font-bold text-center mb-10 text-[#001526]">
                                Log in
                            </h1>

                            {/* Email Input */}
                            <input    
                                type="text" 
                                placeholder="Email Address" 
                                className="w-full p-3 mb-4 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9E7EC] border-black border-t-1"
                                required 
                            />

                            {/* Password Input */}
                            <input 
                                type="password" 
                                placeholder="Password" 
                                className="w-full p-3 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9E7EC] border-black border-t-1"
                                required 
                            />

                            {/* Forgot Password Link */}
                            <div className="flex justify-end w-full mb-4 text-sm">
                                <Link href="/forgot-password" className="text-[#001526] hover:underline font-bold">
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Login Button */}
                            <button className="w-full bg-[#001526] text-white py-3 rounded-2xl hover:bg-blue-700 transition mt-8">
                                Login
                            </button>

                            {/* Signup Redirect */}
                            <div className="flex justify-center mt-4">
                                <span className="text-[#001526] font-bold">Don't have an account?</span>
                                <Link href="/Authentication/signup" className="text-[#2C7DA0] hover:underline font-bold ml-2">
                                    Sign-up
                                </Link>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


    
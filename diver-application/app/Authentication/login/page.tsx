import Link from 'next/link';
import Image from "next/image";

export default function Login() {
    return (
        <div className="relative min-h-screen bg-gray-200 flex items-center justify-center">
            <Image 
                src="/images/page_bg_v2.jpg"  
                alt="Master Liveboards"
                layout="fill"
                objectFit="cover"
                priority 
                className="absolute inset-0"
            />
            <div className="relative z-10 flex w-full lg:w-2/4 justify-center items-center ml-auto lg:p-8 p-4">
                <div className="w-full max-w-xl lg:p-8 p-4">
                    <form className="bg-[#D9E7EC] p-8 rounded-3xl shadow-lg w-full lg:pt-16 pt-5 lg:pb-24 pb-12 lg:pl-14 lg:pr-14">
                        <div className="flex flex-col items-center lg:px-6 px-4">
                            <img className="w-40 h-40 mb-4" src="../images/dive_light_logo_name.svg" alt="Master Liveboards"/>
                            <h1 className="text-2xl font-bold text-center mb-6 text-[#001526]">
                                Log in
                            </h1>

                            {/* Email Input */}
                            <input
                                type="text" 
                                placeholder="Email Address" 
                                className="w-full pl-4 p-2 mb-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9E7EC] border-black border-t-1 text-[15px] text-[#001526]"
                                required 
                            />

                            {/* Password Input */}
                            <input 
                                type="password" 
                                placeholder="Password" 
                                className="w-full pl-4 p-2 mb-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9E7EC] border-black border-t-1 text-[15px] text-[#001526]"
                                required 
                            />

                            {/* Forgot Password Link */}
                            <div className="flex justify-end w-full mb-2 text-[15px]">
                                <Link href="/forgot-password" className="text-[#001526] hover:underline font-bold">
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Login Button */}
                            <button className="w-full bg-[#001526] text-white py-2 rounded-3xl hover:bg-blue-700 transition mt-6 text-[15px] font-semibold">
                                Login
                            </button>

                            {/* Signup Redirect */}
                            <div className="flex justify-center mt-3 text-[15px]">
                                <span className="text-[#001526] font-bold">Don't have an account?</span>
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
};
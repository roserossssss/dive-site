"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { CiCalendar } from "react-icons/ci";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");

  const dateInputRef = useRef(null);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password !== rePassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Create user in Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);

      // Redirect to login page after successful signup
      router.push("/Authentication/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to create account. Please try again.");
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

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
          <form
            onSubmit={handleSignup}
            className="bg-[#D9E7EC] p-8 rounded-3xl shadow-lg w-full py-12 lg:py-16 px-12"
          >
            <div className="flex flex-col items-center lg:px-6 px-4">
              <h1 className="text-2xl font-bold text-center mb-8 text-[#001526]">
                Create Account
              </h1>

              {/* First Name */}
              <div className="relative w-full mb-3">
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder=" "
                  className="peer h-12 w-full border border-[#001526] rounded-3xl px-3 pt-4 pb-1 text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#005f80] focus:border-0 bg-[#D9E7EC] text-[#001526]"
                  required
                />
                <label
                  htmlFor="firstName"
                  className="absolute left-3 top-1/5 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#005f80] bg-[#D9E7EC] px-1"
                >
                  First Name
                </label>
              </div>

              {/* Last Name */}
              <div className="relative w-full mb-3">
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder=" "
                  className="peer h-12 w-full border border-[#001526] rounded-3xl px-3 pt-4 pb-1 text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#005f80] focus:border-0 bg-[#D9E7EC] text-[#001526]"
                  required
                />
                <label
                  htmlFor="lastName"
                  className="absolute left-3 top-1/5 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#005f80] bg-[#D9E7EC] px-1"
                >
                  Last Name
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-3">
                {/* Birthday Field */}
                <div className="relative mt-1 mb-1">
                  <label className="block text-[#001526] font-semibold ml-1 mb-1">
                    Birthday
                  </label>
                  <input
                    type="date"
                    ref={dateInputRef}
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    placeholder="Birthday"
                    className="w-full pl-4 p-2 border rounded-3xl text-[#001526] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#005f80] focus:border-0 bg-[#D9E7EC] border-black border-t-1"
                    required
                    style={{ appearance: "none" }}
                  />
                  <CiCalendar
                    className="absolute right-4 top-9 text-[#001526] text-2xl cursor-pointer"
                    onClick={() =>
                      (dateInputRef.current as unknown as HTMLInputElement)?.showPicker()
                    }
                  />
                </div>

                {/* Gender Selection */}
                <div className="mt-1 mb-1">
                  <label className="block text-[#001526] font-semibold ml-1 mb-1">
                    Sex
                  </label>
                  <div className="flex items-center justify-center space-x-4 border border-black rounded-3xl p-2 bg-[#D9E7EC]">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        onChange={(e) => setGender(e.target.value)}
                        className="mr-2 w-3 h-3 appearance-none rounded-full border-2 border-[#001526] checked:bg-[#005f80] checked:border-[#135572] transition duration-200"
                        required
                      />
                      <span className="text-[#001526] text-[15px] font-medium">
                        Male
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        onChange={(e) => setGender(e.target.value)}
                        className="mr-2 w-3 h-3 appearance-none rounded-full border-2 border-[#001526] checked:bg-[#005f80] checked:border-[#135572] transition duration-200"
                        required
                      />
                      <span className="text-[#001526] text-[15px] font-medium">
                        Female
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div className="relative w-full mb-3">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

              {/* Re-enter Password */}
              <div className="relative w-full mb-3">
                <input
                  type={showRePassword ? "text" : "password"}
                  id="repassword"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  placeholder=" "
                  className="peer h-12 w-full border border-[#001526] rounded-3xl px-3 pt-4 pb-1 text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#005f80] focus:border-0 bg-[#D9E7EC] text-[#001526]"
                  required
                />
                <label
                  htmlFor="repassword"
                  className="absolute left-3 top-1/5 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#005f80] bg-[#D9E7EC] px-1"
                >
                  Re-enter Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowRePassword(!showRePassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#001526]"
                >
                  {showRePassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
              )}

              {/* Success Message */}
              {success && (
                <p className="text-green-500 text-sm mt-2 text-center">
                  Account created successfully! Redirecting to login...
                </p>
              )}

              {/* Signup Button */}
              <button
                type="submit"
                className="w-full bg-[#001526] text-white py-2 rounded-3xl hover:bg-[#005f80] transition mt-6 text-[15px] font-semibold"
              >
                Sign up
              </button>

              {/* Login Redirect */}
              <div className="flex justify-center mt-3 text-[15px]">
                <span className="text-[#001526] font-bold">
                  Already have an account?
                </span>
                <Link
                  href="/Authentication/login"
                  className="text-[#005f80] hover:underline font-bold ml-2"
                >
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
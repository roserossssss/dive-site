"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const showError = touched && email !== "" && !isValidEmail(email);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the logged-in user is the admin
      if (user.email === "admin@example.com") {
        router.push("/Admin-Dashboard"); // Redirect to admin dashboard
      } else {
        setError("Unauthorized access. This page is for admin only.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to log in. Please try again.");
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#001526] flex items-center justify-center">
      <Image
        src="/loginadmin.jpg"
        alt="Login Background"
        fill
        priority
        className="absolute inset-0 object-cover object-center w-full h-full"
        sizes="100vw"
      />

      <div className="relative z-10 flex w-full lg:w-2/4 justify-center items-center ml-auto lg:p-8 p-4">
        <div className="w-full max-w-xl lg:p-8 p-4">
          <form
            onSubmit={handleLogin}
            className="bg-[#001526] p-8 rounded-3xl shadow-lg w-full lg:pt-16 pt-5 lg:pb-24 pb-12 lg:pl-14 lg:pr-14"
          >
            <div className="flex flex-col items-center lg:px-6 px-4">
              <Image
                className="w-52 h-52 mb-4"
                src="/images/admin_login_logo.svg"
                alt="logo"
                width={208}
                height={208}
              />
              <h1 className="text-2xl font-bold text-center mb-6 text-white">
                Log in
              </h1>

              {/* Email */}
              <div className="relative w-full mb-3">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder=" "
                  className={`peer h-12 w-full border ${
                    showError ? "border-red-500" : "border-[#2C7DA0]"
                  } rounded-3xl px-3 pt-4 pb-1 text-sm placeholder-transparent focus:outline-none focus:ring-2 ${
                    showError ? "focus:ring-red-500" : "focus:ring-[#005f80]"
                  } focus:border-0 bg-transparent text-white`}
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-3 top-1/5 -translate-y-1/2 text-xs transition-all text-white peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-white bg-[#001526] px-1"
                >
                  Email Address
                </label>
                {showError && (
                  <p className="text-red-500 text-xs mt-1 ml-2">
                    Please enter a valid email address.
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative w-full mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                  className="peer h-12 w-full border border-[#2C7DA0] rounded-3xl px-3 pt-4 pb-1 text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#005f80] focus:border-0 bg-transparent text-white"
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute left-3 top-1/5 -translate-y-1/2 text-xs transition-all text-white peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-white bg-[#001526] px-1"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  {error}
                </p>
              )}

              <div className="flex justify-end w-full mb-2 text-[15px]">
                <Link href="/Authentication/AdminLogin/ForgotPassword" className="text-white hover:text-[#CF0C0F] font-bold">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2C7DA0] text-white py-2 rounded-3xl hover:bg-[#005f80] transition mt-6 text-[15px] font-semibold"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
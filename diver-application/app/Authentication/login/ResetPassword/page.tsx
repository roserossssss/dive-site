"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../../../../firebaseConfig";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Get the oobCode (reset code) from the URL
  const oobCode = searchParams.get("oobCode");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!oobCode) {
      setError("Invalid or missing reset code.");
      return;
    }

    try {
      // Confirm the password reset with Firebase
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccess(true);

      // Redirect to login page after successful reset
      setTimeout(() => {
        router.push("/Authentication/login");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#D9E7EC] flex items-center justify-center">
      <div className="w-full max-w-md bg-[#D9E7EC] p-8 rounded-3xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#001526]">
          Reset Password
        </h1>
        <form onSubmit={handleResetPassword}>
          {/* New Password */}
          <div className="relative w-full mb-3">
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder=" "
              className="peer h-12 w-full border border-[#001526] rounded-3xl px-3 pt-4 pb-1 text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#005f80] focus:border-0 bg-transparent text-[#001526]"
              required
            />
            <label
              htmlFor="newPassword"
              className="absolute left-3 top-1/5 -translate-y-1/2 text-xs transition-all text-[#001526] peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#005f80] bg-[#D9E7EC] px-1"
            >
              New Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#001526]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative w-full mb-3">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder=" "
              className="peer h-12 w-full border border-[#001526] rounded-3xl px-3 pt-4 pb-1 text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#005f80] focus:border-0 bg-transparent text-[#001526]"
              required
            />
            <label
              htmlFor="confirmPassword"
              className="absolute left-3 top-1/5 -translate-y-1/2 text-xs transition-all text-[#001526] peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#005f80] bg-[#D9E7EC] px-1"
            >
              Confirm Password
            </label>
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#001526]"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Success Message */}
          {success && (
            <p className="text-green-500 text-sm mt-2">
              Password reset successfully! Redirecting to login...
            </p>
          )}

          {/* Reset Password Button */}
          <button
            type="submit"
            className="w-full bg-[#001526] text-white py-2 rounded-3xl hover:bg-[#005f80] transition mt-6 text-[15px] font-semibold"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { auth } from "../../../../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to send reset email.");
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#D9E7EC] flex items-center justify-center">
      <div className="w-full max-w-md bg-[#D9E7EC] p-8 rounded-3xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#001526]">
          Forgot Password
        </h1>
        <form onSubmit={handleForgotSubmit}>
          <div className="relative w-full mb-3">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              className="peer h-12 w-full border border-[#001526] rounded-3xl px-3 pt-4 pb-1 text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#005f80] focus:border-0 bg-transparent text-[#001526]"
              required
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-1/5 -translate-y-1/2 text-xs transition-all text-[#001526] peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#005f80] bg-[#D9E7EC] px-1"
            >
              Email Address
            </label>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm mt-2">
              Reset email sent successfully.
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-[#001526] text-white py-2 rounded-3xl hover:bg-[#005f80] transition mt-6 text-[15px] font-semibold"
          >
            Send Reset Email
          </button>
        </form>
      </div>
    </div>
  );
}
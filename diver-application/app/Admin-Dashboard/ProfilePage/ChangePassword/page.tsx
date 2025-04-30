"use client";

import { useState } from "react";
import { usePathname, useRouter } from 'next/navigation';
import dynamic from "next/dynamic";
import { IoEye, IoEyeOff } from "react-icons/io5";

const PasswordUpdatedModal = dynamic(() => import('./PasswordUpdatedModal'), { ssr: false });

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordUpdatedModalOpen, setIsPasswordUpdatedModalOpen] = useState(false);
  const [error, setError] = useState("");

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const validatePassword = (password: string) => {
    const minLength = /.{8,}/;
    const lowercase = /[a-z]/;
    const uppercase = /[A-Z]/;
    const numberOrSpecial = /[0-9!@#$%^&*]/;

    return minLength.test(password) && lowercase.test(password) && uppercase.test(password) && numberOrSpecial.test(password);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validatePassword(newPassword)) {
      setError("New password does not meet the requirements.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    // Handle form submission for changing password
    setIsPasswordUpdatedModalOpen(true);
  };

  const handlePasswordUpdatedModalClose = () => {
    setIsPasswordUpdatedModalOpen(false);
    // Redirect to login page or home page after password update
  };

  return (
    <div className="p-5 relative">
      <div className="fixed top-0 left-0 w-full bg-[#001526] z-10 p-4 rounded-t-2xl md:pl-80">
        <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-white text-center md:text-left mt-2">Your Account</h2>
      </div>
      <div className="mb-1 text-right mt-4 pt-5">
        <div className="flex flex-wrap justify-between mb-2 space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            className={`flex-grow px-5 py-5 rounded-full text-[18px] font-bold ${pathname === '/dashboard/ProfilePage/ProfileSettings' ? 'bg-[#2C7DA0] text-white' : 'bg-[#D9E7EC] text-[#001526]'}`}
            onClick={() => router.push('/Admin-Dashboard/ProfilePage/ProfileSettings')}
          >
            Profile Settings
          </button>
          <button
            className={`flex-grow px-5 py-5 rounded-full text-[18px] font-bold ${pathname === '/dashboard/ProfilePage/ChangePassword' ? 'bg-[#2C7DA0] text-white' : 'bg-[#D9E7EC] text-[#001526]'}`}
            onClick={() => router.push('/Admin-Dashboard/ProfilePage/ChangePassword')}
          >
            Change Password
          </button>
          <button
            className={`flex-grow px-5 py-5 rounded-full text-[18px] font-bold ${pathname === '/dashboard/ProfilePage/DeleteAccount' ? 'bg-[#2C7DA0] text-white' : 'bg-[#D9E7EC] text-[#001526]'}`}
            onClick={() => router.push('/Admin-Dashboard/ProfilePage/DeleteAccount')}
          >
            Delete Account
          </button>
        </div>
      </div>
      <div className="pt-3">
        <div className="bg-[#2C7DA0] p-6 md:p-[39px] rounded-t-2xl flex flex-col md:flex-row justify-between items-center md:pl-12"></div>
        <div className="bg-[#D9E7EC] p-6 rounded-b-2xl">
          <div className="mt-5 px-4">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <section>
                <h3 className="text-xl font-bold text-[#001526] mb-1">Password</h3>
                <p className="text-[#001526] mb-3 text-justify">Please enter your current password to change your password</p>
                <div className="flex flex-col gap-3 mb-3">
                  <div className="w-full relative">
                    <label htmlFor="currentPassword" className="block text-[#001526] font-semibold mb-1">Current Password <span className="text-red-500">*</span></label>
                    <input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute bottom-[6px] right-4 transform -translate-y-1/2 text-[#001526]"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <IoEyeOff /> : <IoEye />}
                    </button>
                  </div>
                  <div className="w-full relative">
                    <label htmlFor="newPassword" className="block text-[#001526] font-semibold mb-1">New Password <span className="text-red-500">*</span></label>
                    <input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute top-[48px] right-4 transform -translate-y-1/2 text-[#001526]"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <IoEyeOff /> : <IoEye />}
                    </button>
                    <p className="text-[#001526] mt-2">New password must contain:</p>
                    <ul className="list-disc list-inside text-[#001526] text-justify">
                      <li>At least 8 characters</li>
                      <li>At least 1 lowercase character</li>
                      <li>At least 1 uppercase character</li>
                      <li>At least 1 number or special character</li>
                    </ul>
                  </div>
                  <div className="w-full relative">
                    <label htmlFor="confirmPassword" className="block text-[#001526] font-semibold mb-1">Confirm Password <span className="text-red-500">*</span></label>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute bottom-[6px] right-4 transform -translate-y-1/2 text-[#001526]"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
                    </button>
                  </div>
                </div>
                {error && <p className="text-red-500">{error}</p>}
              </section>
              <div className="flex justify-center md:justify-end">
                <button type="submit" className="w-52 px-6 py-2 bg-[#001526] text-white font-bold rounded-[40px] mx-auto md:mx-0">Change Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Password Updated Modal */}
      {isPasswordUpdatedModalOpen && (
        <PasswordUpdatedModal onClose={handlePasswordUpdatedModalClose} />
      )}
    </div>
  );
}
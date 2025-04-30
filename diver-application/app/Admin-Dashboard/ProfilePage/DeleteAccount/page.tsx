"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import Image from 'next/image';

export default function DeleteAccountPage() {
  const pathname = usePathname();
  const router = useRouter();
  const [profileImagePreview] = useState("/images/sample_profile_pic.jpg");
  const [firstName] = useState("John");
  // const [middleName, setMiddleName] = useState("");
  const [lastName] = useState("Doe");
  const [suffix] = useState("");
  const [email] = useState("johndoe@gmail.com");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAccountDeletedModalOpen, setIsAccountDeletedModalOpen] = useState(false);

  const handleDeleteAccount = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteAccount = () => {
    // Handle account deletion logic here
    setIsDeleteModalOpen(false);
    setIsAccountDeletedModalOpen(true);
  };

  const handleAccountDeletedModalClose = () => {
    setIsAccountDeletedModalOpen(false);
    // Redirect to login page or home page after account deletion
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
        {/* Header Container for User's Profile Photo, Name, and Email Address */}
        <div className="bg-[#2C7DA0] p-8 rounded-t-2xl flex flex-col md:flex-row justify-between items-center md:pl-12">
          <div className="flex flex-col md:flex-row items-center w-full md:w-auto relative">
            <div className="relative">
              <Image width={1000} height={1000}
               src={profileImagePreview} alt="User Photo" className="w-24 h-24 md:w-32 md:h-32 rounded-full mr-4" />
              <input type="file" id="profileImageInput" className="hidden" accept="image/*"/>
            </div>
            <div className="mt-4 md:mt-0 md:ml-4 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-100" style={{ textTransform: 'uppercase' }}>
                    {firstName} {lastName} {suffix && suffix.toUpperCase()}
                </h2>
              <p className="text-lg md:text-xl font-medium text-gray-200">{email}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#D9E7EC] p-6 rounded-b-2xl">
          <div className="mt-5 px-4">
            <section>
              <h3 className="text-xl font-bold text-[#001526] mb-1">Delete Account</h3>
              <p className="font-semibold text-[15px] mb-7 text-[#001526] text-justify">You&apos;re about to start the process of deleting your account.</p>
              <p className="mb-8 text-[#001526] text-justify">Once deleted, your profile, personal data, and any associated records will be permanently removed from our system. This action cannot be undone.</p>
              <p className="font-semibold mb-2 text-[#001526]">What happens next?</p>
              <ul className="list-disc list-inside mb-8 text-[#001526] text-justify">
                <li>Your name, profile, and any public activity will no longer be viewable.</li>
                <li>You will lose access to all your data and services.</li>
                <li>This action is permanent and cannot be reversed.</li>
              </ul>
              <p className="text-[#001526] text-justify">If you&apos;re sure, click <span className="font-semibold">&quot;Delete My Account&quot;</span> below.</p>
              <div className="flex justify-center md:justify-end mt-5">
                <button onClick={handleDeleteAccount} className="w-52 px-6 py-2 bg-[#CF0C0F] text-white font-bold rounded-[40px] mx-auto md:mx-0">Delete My Account</button>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#D9E7EC] p-8 w-11/12 sm:w-[480px] h-auto sm:h-[450px] rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <div className="flex justify-center mb-4">
              <BsExclamationCircle className="w-24 h-24 text-[#001526]" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-center text-[#001526]">Delete Account?</h2>
            <p className="font-semibold text-center text-[#001526] mb-5 text-[15px]">Deleting your account means losing access 
            <br />to all your information and services.</p>
            <p className="font-semibold text-center text-[#001526] mb-5 text-[15px]">Are you sure you want to proceed?</p>
            <div className="flex justify-center mt-5">
              <button
                className="mr-2 w-36 px-5 py-3 bg-[#D9E7EC] text-[#001526] border border-[#001526] rounded-full text-[16px] font-semibold"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="ml-2 w-36 px-5 py-3 bg-[#001526] text-white rounded-full text-[16px] font-semibold"
                onClick={confirmDeleteAccount}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account Deleted Modal */}
      {isAccountDeletedModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#D9E7EC] p-8 w-11/12 sm:w-[480px] h-auto sm:h-[450px] rounded-2xl shadow-lg flex flex-col justify-center items-center">
          <div className="flex justify-center mb-4">
              <BsExclamationCircle className="w-24 h-24 text-[#001526]" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-center text-[#001526]">Account Deleted</h2>
            <p className="font-semibold text-center text-[#001526] mb-5 text-[15px]">You have been logged out. <br />Thank you for using our service.</p>
            <div className="flex justify-center mt-5">
              <button
                className="w-36 px-5 py-3 bg-[#001526] text-white rounded-full text-[16px] font-semibold"
                onClick={handleAccountDeletedModalClose}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
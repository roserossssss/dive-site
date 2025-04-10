"use client";

import { useState, useRef } from "react";
import { usePathname, useRouter } from 'next/navigation';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { TbEditCircle } from "react-icons/tb";
import { BsExclamationCircle } from "react-icons/bs";
import Image from 'next/image';

export default function ProfilePage() {
  // const [editMode, setEditMode] = useState(true);
  const [firstName, setFirstName] = useState("John");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("Doe");
  const [suffix, setSuffix] = useState("");
  const [birthdate, setBirthdate] = useState("1990-01-01");
  const [sex, setSex] = useState("male");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [homeAddress, setHomeAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState("/images/sample_profile_pic.jpg");
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaveModalOpen(true);
  };

  const confirmSaveChanges = () => {
    setIsSaveModalOpen(false);
    // Handle form submission including profile image
  };

  return (
    <div className="p-5 relative">
      <div className="fixed top-0 left-0 w-full bg-white z-10 p-4 rounded-t-2xl md:pl-80">
        <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-[#001526] text-center md:text-left mt-2">Your Account</h2>
      </div>
      <div className="mb-1 text-right mt-4 pt-5">
        <div className="flex flex-wrap justify-between mb-2 space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            className={`flex-grow px-5 py-5 rounded-full text-[18px] font-bold ${pathname === '/dashboard/ProfilePage/ProfileSettings' ? 'bg-[#2C7DA0] text-white' : 'bg-[#D9E7EC] text-[#001526]'}`}
            onClick={() => router.push('/dashboard/ProfilePage/ProfileSettings')}
          >
            Profile Settings
          </button>
          <button
            className={`flex-grow px-5 py-5 rounded-full text-[18px] font-bold ${pathname === '/dashboard/ProfilePage/ChangePassword' ? 'bg-[#2C7DA0] text-white' : 'bg-[#D9E7EC] text-[#001526]'}`}
            onClick={() => router.push('/dashboard/ProfilePage/ChangePassword')}
          >
            Change Password
          </button>
          <button
            className={`flex-grow px-5 py-5 rounded-full text-[18px] font-bold ${pathname === '/dashboard/ProfilePage/DeleteAccount' ? 'bg-[#2C7DA0] text-white' : 'bg-[#D9E7EC] text-[#001526]'}`}
            onClick={() => router.push('/dashboard/ProfilePage/DeleteAccount')}
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
<<<<<<< HEAD
              <img src={profileImagePreview} alt="User Photo" className="w-24 h-24 md:w-32 md:h-32 rounded-full mr-4" />
              <button
                className="absolute bottom-0 right-6 bg-white p-1 rounded-full"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Edit Profile Picture"
              >
=======
              <Image width={1000} height={1000} src={profileImagePreview} alt="User Photo" className="w-24 h-24 md:w-32 md:h-32 rounded-full mr-4" />
              <button className="absolute bottom-0 right-6 bg-white p-1 rounded-full" onClick={() => fileInputRef.current?.click()}>
>>>>>>> main
                <TbEditCircle className="text-[#001526]" />
              </button>
              <input type="file" id="profileImageInput" className="hidden" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} />
            </div>
            <div className="mt-4 md:mt-0 md:ml-4 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white" style={{ textTransform: 'uppercase' }}>
                {firstName} {lastName} {suffix && suffix.toUpperCase()}
              </h2>
              <p className="text-lg md:text-xl font-medium text-white">{email}</p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-[#D9E7EC] p-6 rounded-b-2xl">
          <div className="mt-5 px-4">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Personal Information Section */}
              <section>
                <h3 className="text-xl font-bold text-[#001526] mb-1">Personal Information</h3>
                <div className="flex flex-col md:flex-row gap-3 mb-3">
                  <div className="w-full md:w-2/4">
                    <label htmlFor="firstName" className="block text-[#001526] font-semibold mb-1">First Name <span className="text-red-500">*</span></label>
                    <input id="firstName" type="text" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  </div>
                  <div className="w-full md:w-2/4">
                    <label htmlFor="middleName" className="block text-[#001526] font-semibold mb-1">Middle Name</label>
                    <input id="middleName" type="text" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                  </div>
                  <div className="w-full md:w-2/4">
                    <label htmlFor="lastName" className="block text-[#001526] font-semibold mb-1">Last Name <span className="text-red-500">*</span></label>
                    <input id="lastName" type="text" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  </div>
                  <div className="w-full md:w-1/12">
                    <label htmlFor="suffix" className="block text-[#001526] font-semibold mb-1">Suffix</label>
                    <select id="suffix" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={suffix} onChange={(e) => setSuffix(e.target.value)}>
                      <option value=""></option>
                      <option value="Jr.">Jr.</option>
                      <option value="Sr.">Sr.</option>
                      <option value="III">III</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3 mb-3">
                  <div className="w-full md:w-1/4">
                    <label htmlFor="birthdate" className="block text-[#001526] font-semibold mb-1">Birthdate <span className="text-red-500">*</span></label>
                    <input id="birthdate" type="date" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
                  </div>
                  <div className="w-full md:w-1/4">
                    <label className="block text-[#001526] font-semibold mb-3">Sex <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-3">
                      <label htmlFor="male" className="flex items-center font-semibold text-[#001526]">
                        <input id="male" type="radio" name="sex" value="male" className="mr-1 w-6 h-6" style={{ accentColor: '#001526' }} checked={sex === 'male'} onChange={() => setSex('male')} required /> Male
                      </label>
                      <label htmlFor="female" className="flex items-center font-semibold text-[#001526]">
                        <input id="female" type="radio" name="sex" value="female" className="mr-1 w-6 h-6" style={{ accentColor: '#001526' }} checked={sex === 'female'} onChange={() => setSex('female')} required /> Female
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex flex-col md:flex-row gap-3">
                {/* Contact Information Section */}
                <section className="w-full md:w-1/3">
                  <h3 className="text-xl font-bold text-[#001526] mb-1">Contact Information</h3>
                  <div className="flex flex-col gap-3 mb-3">
                    <div className="w-full">
                      <label htmlFor="contactNumber" className="block text-[#001526] font-semibold mb-1">Contact Number <span className="text-red-500">*</span></label>
                      <div className="flex items-center w-full">
                        <PhoneInput
                          country={'us'}
                          value={contactNumber}
                          onChange={setContactNumber}
                          inputProps={{
                            id: 'contactNumber',
                            name: 'contactNumber',
                            required: true,
                            autoFocus: true,
                            className: `p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] pl-12 text-[#001526]`,
                          }}
                          containerStyle={{ width: '100%' }}
                          inputStyle={{ width: '100%' }}
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label htmlFor="email" className="block text-[#001526] font-semibold mb-1">Email Address <span className="text-red-500">*</span></label>
                      <input id="email" type="email" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                  </div>
                </section>

                {/* Personal Address Section */}
                <section className="w-full md:w-2/3">
                  <h3 className="text-xl font-bold text-[#001526] mb-1">Personal Address</h3>
                  <div className="flex flex-col gap-3 mb-3">
                    <div className="w-full">
                      <label htmlFor="homeAddress" className="block text-[#001526] font-semibold mb-1">Home Address <span className="text-red-500">*</span></label>
                      <input id="homeAddress" type="text" placeholder="House Number, Unit Number, Street, Subdivision/Village/Apartment" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} required />
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 mb-3">
                      <div className="w-full md:w-1/3">
                        <label htmlFor="country" className="block text-[#001526] font-semibold mb-1">Country <span className="text-red-500">*</span></label>
                        <select id="country" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={country} onChange={(e) => setCountry(e.target.value)} required>
                          <option value="">Select Country</option>
                          <option value="USA">USA</option>
                          <option value="Canada">Canada</option>
                          <option value="UK">UK</option>
                        </select>
                      </div>
                      <div className="w-full md:w-1/3">
                        <label htmlFor="state" className="block text-[#001526] font-semibold mb-1">State/Province <span className="text-red-500">*</span></label>
                        <select id="state" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={state} onChange={(e) => setState(e.target.value)} required>
                          <option value="">Select State/Province</option>
                          <option value="California">California</option>
                          <option value="Ontario">Ontario</option>
                          <option value="London">London</option>
                        </select>
                      </div>
                      <div className="w-full md:w-1/3">
                        <label htmlFor="zipCode" className="block text-[#001526] font-semibold mb-1">ZIP Code</label>
                        <input id="zipCode" type="text" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Save Changes Modal */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#D9E7EC] p-8 w-11/12 sm:w-[480px] h-auto sm:h-[450px] rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <div className="flex justify-center mb-4">
              <BsExclamationCircle className="w-24 h-24 text-[#001526]" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-center text-[#001526]">Save Changes?</h2>
            <p className="font-semibold text-center text-[#001526] mb-5 text-[15px]">You&apos;re about to update your details. 
            <br />Want to proceed?</p>
            <div className="flex justify-center mt-5">
              <button
                className="mr-2 w-36 px-5 py-3 bg-[#D9E7EC] text-[#001526] border border-[#001526] rounded-full text-[16px] font-semibold"
                onClick={() => setIsSaveModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="ml-2 w-36 px-5 py-3 bg-[#001526] text-white rounded-full text-[16px] font-semibold"
                onClick={confirmSaveChanges}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
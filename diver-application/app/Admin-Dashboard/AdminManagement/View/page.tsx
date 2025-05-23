"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { TbEditCircle } from "react-icons/tb";
import Image from 'next/image';
import { IoIosArrowBack } from "react-icons/io";
import { BsExclamationCircle } from "react-icons/bs";

export default function ProfilePage() {
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
  const [role, setRole] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState("/images/sample_profile_pic.jpg");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("selectedAdminProfile");
    if (stored) {
      const user = JSON.parse(stored);
      setFirstName(user.name?.split(" ")[0] || "");
      setLastName(user.name?.split(" ").slice(1).join(" ") || "");
      setEmail(user.email || "");
      setProfileImagePreview(user.avatar ? `/${user.avatar}` : "/images/sample_profile_pic.jpg");
      setContactNumber(user.contactNumber || "9882374117");
      setHomeAddress(user.homeAddress || "#1234, Sample St., Sample Subdivision");
      setCountry(user.country || "Philippines");
      setState(user.state || "Manila");
      setZipCode(user.zipCode || "1000");
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      setIsSaveModalOpen(true); 
    } else {
      setIsEditing(true); 
    }
  };

  const confirmSaveChanges = () => {
    setIsEditing(false);
    setIsSaveModalOpen(false);
  };

  return (
    <div className="p-5 relative">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-10 p-4 rounded-t-2xl md:pl-80 bg-[#001526]">
        <div className="flex items-center justify-between md:justify-start">
          <IoIosArrowBack
            size={30}
            className="cursor-pointer mr-3 mt-2 text-white"
            onClick={() => router.back()}
            title="Go back"
            aria-label="Go back"
          />
          <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-white text-center flex-1 md:flex-none mt-2 mr-10">
            {isEditing ? "Edit Admin Profile" : "View Admin Profile"}
          </h2>
        </div>
      </div>

      {/* Profile */}
      <div className="pt-3">
        {/* Profile Header */}
        <div className="bg-[#2C7DA0] p-8 rounded-t-2xl flex flex-col md:flex-row justify-between items-center md:pl-12 mt-8">
          <div className="flex flex-col md:flex-row items-center w-full md:w-auto relative">
            <div className="relative">
              <Image width={1000} height={1000} src={profileImagePreview} alt="User Photo" className="w-24 h-24 md:w-32 md:h-32 rounded-full mr-4" />
              {isEditing && (
                <button className="absolute bottom-0 right-6 bg-white p-1 rounded-full" onClick={() => fileInputRef.current?.click()}>
                  <TbEditCircle className="text-[#001526]" />
                </button>
              )}
              <input type="file" id="profileImageInput" className="hidden" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} disabled={!isEditing} />
            </div>
            <div className="mt-4 md:mt-0 md:ml-4 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-100 uppercase">
                {firstName} {lastName} {suffix && suffix.toUpperCase()}
              </h2>
              <p className="text-lg md:text-xl font-medium text-gray-200">{email}</p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-[#D9E7EC] p-6 rounded-b-2xl">
          <div className="mt-5 px-4">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Personal Information */}
              <section>
                <h3 className="text-xl font-bold text-[#001526] mb-1">Personal Information</h3>
                <div className="flex flex-col md:flex-row gap-3 mb-3">
                  <div className="w-full md:w-2/4">
                    <label className="block text-[#001526] font-semibold mb-1">First Name <span className="text-red-500">*</span></label>
                    <input type="text" disabled={!isEditing} className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  </div>

                  <div className="w-full md:w-2/4">
                    <label className="block text-[#001526] font-semibold mb-1">Middle Name</label>
                    <input type="text" disabled={!isEditing} className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                  </div>

                  <div className="w-full md:w-2/4">
                    <label className="block text-[#001526] font-semibold mb-1">Last Name <span className="text-red-500">*</span></label>
                    <input type="text" disabled={!isEditing} className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  </div>

                  <div className="w-full md:w-1/12">
                    <label className="block text-[#001526] font-semibold mb-1">Suffix</label>
                    <select disabled={!isEditing} className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={suffix} onChange={(e) => setSuffix(e.target.value)}>
                      <option value=""></option>
                      <option value="Jr.">Jr.</option>
                      <option value="Sr.">Sr.</option>
                      <option value="III">III</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-3 mb-3">
                  <div className="w-full md:w-1/4">
                    <label className="block text-[#001526] font-semibold mb-1">Birthdate <span className="text-red-500">*</span></label>
                    <input id="birthdate" type="date" disabled={!isEditing} value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" required />
                  </div>

                  <div className="w-full md:w-1/4">
                    <label className="block text-[#001526] font-semibold mb-3">Sex <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center font-semibold text-[#001526]">
                        <input type="radio" name="sex" value="male" disabled={!isEditing} checked={sex === 'male'} onChange={() => setSex('male')} className="mr-1 w-6 h-6" style={{ accentColor: '#001526' }} /> Male
                      </label>
                      <label className="flex items-center font-semibold text-[#001526]">
                        <input type="radio" name="sex" value="female" disabled={!isEditing} checked={sex === 'female'} onChange={() => setSex('female')} className="mr-1 w-6 h-6" style={{ accentColor: '#001526' }} /> Female
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact and Address */}
              <div className="flex flex-col md:flex-row gap-3">
                <section className="w-full md:w-1/3">
                  <h3 className="text-xl font-bold text-[#001526] mb-1">Contact Information</h3>
                  <div className="flex flex-col gap-3 mb-3">
                    <div>
                      <label className="block text-[#001526] font-semibold mb-1">Contact Number <span className="text-red-500">*</span></label>
                      <PhoneInput
                        country={'us'}
                        value={contactNumber}
                        onChange={setContactNumber}
                        inputProps={{
                          name: 'contactNumber',
                          required: true,
                          disabled: !isEditing,
                        }}
                        containerStyle={{ width: '100%' }}
                        inputStyle={{
                          width: '100%',
                          backgroundColor: '#D9E7EC',
                          color: '#001526',
                          borderColor: '#001526',
                          height: "42px",
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-[#001526] font-semibold mb-1">Email Address <span className="text-red-500">*</span></label>
                      <input type="email" disabled={!isEditing} className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                  </div>
                </section>

                <section className="w-full md:w-2/3">
                  <h3 className="text-xl font-bold text-[#001526] mb-1">Personal Address</h3>
                  <div className="flex flex-col gap-3 mb-3">
                    <div>
                      <label className="block text-[#001526] font-semibold mb-1">Home Address <span className="text-red-500">*</span></label>
                      <input type="text" disabled={!isEditing} className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} required />
                    </div>

                    <div className="flex flex-col md:flex-row gap-3">
                      <div className="w-full md:w-1/3">
                        <label className="block text-[#001526] font-semibold mb-1">Country <span className="text-red-500">*</span></label>
                        <select disabled={!isEditing} className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={country} onChange={(e) => setCountry(e.target.value)} required>
                          <option value="">Select Country</option>
                          <option value="USA">USA</option>
                          <option value="Canada">Canada</option>
                          <option value="UK">UK</option>
                        </select>
                      </div>

                      <div className="w-full md:w-1/3">
                        <label className="block text-[#001526] font-semibold mb-1">State/Province <span className="text-red-500">*</span></label>
                        <select disabled={!isEditing} className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={state} onChange={(e) => setState(e.target.value)} required>
                          <option value="">Select State/Province</option>
                          <option value="California">California</option>
                          <option value="Ontario">Ontario</option>
                          <option value="London">London</option>
                        </select>
                      </div>

                      <div className="w-full md:w-1/3">
                        <label className="block text-[#001526] font-semibold mb-1">ZIP Code</label>
                        <input type="text" disabled={!isEditing} className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                      </div>
                    </div>

                    {/* Save or Edit Button */}
                    <div className="flex justify-center md:justify-end mt-4">
                      <button type="submit" className="w-52 px-6 py-4 bg-[#001526] text-white font-bold rounded-[40px] mx-auto md:mx-0 hover:bg-[#D9E7EC] hover:text-[#001526] border-2 border-transparent hover:border-[#001526] transition duration-300 ease-in-out flex items-center justify-center gap-2">
                        {isEditing ? "Save Changes" : "Edit Details"}
                      </button>
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
            <p className="font-semibold text-center text-[#001526] mb-5 text-[15px]">You&lsquo;re about to update your details.<br />Want to proceed?</p>
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
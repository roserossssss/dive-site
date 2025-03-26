"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddDive() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [depth, setDepth] = useState(0);
  const [time, setTime] = useState(0);
  const [showModal, setShowModal] = useState<"save" | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  useEffect(() => {
    console.log("Updated Image Preview:", imagePreview);
  }, [imagePreview]);
  

  const handleDepthChange = (amount: number) => {
    setDepth((prev) => Math.max(0, prev + amount));
  };
  
  const handleTimeChange = (amount: number) => {
    setTime((prev) => Math.max(0, prev + amount));
  };  

  const handleConfirm = () => {
    if (showModal === "save") {
    }
    setShowModal(null);
  };
  


  return (
    <div className="flex-1 p-5 pt-2 relative">
      {/* Page Title */}
      <div className="fixed top-0 left-0 w-full bg-white z-10 p-4 rounded-t-2xl md:pl-80">
      <h2 className="text-3xl font-bold text-black">New Dive</h2>  
      </div>

      {/* Buttons Section */}
      <div className="max-w-[1200px] mx-auto flex justify-end gap-4 mt-11 mr-20">
        <button
          onClick={() => router.push("../DiveManagement")}
          className="w-full md:w-[230px] h-[60px] md:h-[60px] px-9 py-2 font-semibold text-xl bg-gray-300 text-[#001526] rounded-full"
        >
          Cancel
        </button>
        <button
         onClick={() => setShowModal("save")}
          className="w-full md:w-[230px] h-[60px] px-9 py-2 text-xl font-semibold bg-[#2E6782] text-white rounded-full"
        >
          Save
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#D9E7EC] p-6 rounded-3xl shadow-lg w-[680px] h-[600px] text-center">
            <div className="flex justify-center mb-4">
              <img src="/exclamation.svg" alt="Delete" className="w-50 h-50 mt-40" />

            </div>
            <h2 className="text-5xl font-bold text-[#001526] mt-10">Save New dive?</h2>
            <p className="text-xl font-semibold text-gray-600 mt-4">
              You can edit this dive later if necessary.
            </p>

            <div className="mt-20 flex justify-center space-x-4">
              <button
                onClick={() => setShowModal(null)}
                className="w-48 h-14  border-[#001526] border-2 rounded-full font-semibold text-[#001526] hover:bg-[#001526] hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm} 
                className="w-48 h-14 border-[#001526] border-2 rounded-full font-semibold text-[#001526] hover:bg-[#001526] hover:text-white"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center mt-6">
        {/* Section Background */}
        <div className="bg-[#2E6782]  w-full max-w-[92%] h-[120px] rounded-t-[3rem]"></div>

        {/* Dive Form */}
        <div className="bg-[#D9E7EC]  p-6 w-full max-w-[92%] h-auto rounded-b-[3rem]">
                <form className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 md:px-10">

          {/* Left Column */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-4xl text-[#001526] font-bold mt-6 md:mt-12">Dive Information</h2>
            
            {/* Title */}
            <div className="flex flex-col">
              <label className="mt-1 text-lg md:text-2xl font-semibold text-[#001526]">
                Title <span className="text-[#CF0C0F]">*</span>
              </label>
              <input
                type="text"
                className="mt-2 border p-3 md:p-5 rounded-2xl border-black bg-transparent w-full max-w-md md:max-w-lg"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col">
              <label className="text-lg md:text-2xl font-semibold text-[#001526]">
                Location <span className="text-[#CF0C0F]">*</span>
              </label>
              <input
                type="text"
                className="mt-2 border p-3 md:p-5 rounded-xl text-medium border-black bg-transparent w-full max-w-md md:max-w-lg"
              />
            </div>

            {/* Date Input */}
            <div className="flex flex-col">
              <label className="mt-1 text-lg md:text-2xl font-semibold text-[#001526]">
                Date <span className="text-[#CF0C0F]">*</span>
              </label>
              <div className="mt-2 relative w-full max-w-xs">
                <input
                  type="text"
                  placeholder="mm/dd/yy"
                  className="border p-3 md:p-5 rounded-2xl border-black w-full pr-12 bg-transparent"
                />
                <img
                  src="/calendar-icon.svg"
                  alt="calendar"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 md:w-7 md:h-7"
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col items-center mt-6 md:mt-12">
            <div className="border-2 border-black rounded-2xl w-full max-w-md md:max-w-lg h-60 md:h-80 flex items-center justify-center bg-transparent">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div className="text-center">
                  <img
                    src="/image-uploadblack.svg"
                    alt="Upload Icon"
                    className="w-32 h-32 md:w-60 md:h-60 mx-auto"
                  />
                  <p className="text-sm md:text-medium mt-3">Maximum of 5MB</p>
                  <p className="text-sm md:text-medium">JPEG, PNG, JPEG</p>
                </div>
              )}
            </div>

            {/* Upload Image Button */}
            <label
              htmlFor="fileUpload"
              className="z-10 mt-5 w-full max-w-md md:max-w-lg h-12 text-white rounded-xl bg-[#001526] cursor-pointer text-lg font-bold tracking-widest flex items-center justify-center"
            >
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="fileUpload"
              onChange={handleImageChange}
            />
          </div>

          {/* Dive Details*/}
          <div className="col-span-1 lg:col-span-2">
            <h2 className="font-bold text-2xl md:text-4xl text-[#001526] mt-10">Dive Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Notes */}
              <div className="flex flex-col">
                <label className="text-lg md:text-2xl font-semibold text-[#001526]">Notes <span className="text-[#CF0C0F]">*</span> </label>
                <textarea className="border p-3 rounded-2xl border-black bg-transparent w-full max-w-md md:max-w-lg h-32"></textarea>
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label className="text-lg md:text-2xl font-semibold text-[#001526]">Description <span className="text-[#CF0C0F]">*</span> </label>
                <textarea className="border p-3 rounded-2xl border-black bg-transparent w-full max-w-md md:max-w-lg h-32"></textarea>
              </div>
            </div>
          </div>

          {/* Dive Depth & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Dive Depth */}
            <div className="flex flex-col items-center md:items-start">
              <label className="text-lg md:text-2xl font-semibold text-[#001526]">Dive Depth (M)</label>
              <div className="relative flex items-center mt-3">
                <input
                  type="text"
                  value={depth}
                  readOnly
                  className="w-20 md:w-24 h-14 text-center text-lg md:text-xl text-[#001526] border p-4 rounded-2xl border-black bg-transparent"
                />
                <div className="absolute right-[-30px] flex flex-col gap-1">
                  <button type="button" onClick={(e) => { e.preventDefault(); handleDepthChange(1); }}>
                    <img src="/arrow-up.svg" alt="Increase Depth" className="w-6 h-6 cursor-pointer"/>
                  </button>
                  <button type="button" onClick={(e) => { e.preventDefault(); handleDepthChange(-1); }}>
                    <img src="/arrow-down.svg" alt="Decrease Depth" className="w-6 h-6 cursor-pointer"/>
                  </button>
                </div>
              </div>
            </div>

            {/* Dive Time */}
            <div className="flex flex-col items-center md:items-start">
              <label className="text-lg md:text-2xl font-semibold text-[#001526]">Dive Time (MIN)</label>
              <div className="relative flex items-center mt-3">
                <input
                  type="text"
                  value={time}
                  readOnly
                  className="w-20 md:w-24 h-14 text-center text-lg md:text-xl text-[#001526] border p-4 rounded-xl border-black bg-transparent"
                />
                <div className="absolute right-[-30px] flex flex-col gap-1">
                  <button type="button" onClick={(e) => { e.preventDefault(); handleTimeChange(1); }}>
                    <img src="/arrow-up.svg" alt="Increase Time" className="w-6 h-6 cursor-pointer"/>
                  </button>
                  <button type="button" onClick={(e) => { e.preventDefault(); handleTimeChange(-1); }}>
                    <img src="/arrow-down.svg" alt="Decrease Time" className="w-6 h-6 cursor-pointer"/>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </form>

        </div>
      </div>
    </div>
  );
}


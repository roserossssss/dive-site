"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddDive() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [depth, setDepth] = useState(0);
  const [time, setTime] = useState(0);

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

  const handleUploadClick = () => {
    document.getElementById("fileUpload")?.click();
  };

  const handleDepthChange = (amount: number) => {
    setDepth((prev) => Math.max(0, prev + amount));
  };

  const handleTimeChange = (amount: number) => {
    setTime((prev) => Math.max(0, prev + amount));
  };

  return (
    <div className="flex-1 p-5 pt-2 relative">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-black">New Dive</h2>

      {/* Buttons Section */}
      <div className="flex justify-end gap-4 mt-7">
        <button
          onClick={() => router.push("/dashboard/DiveManagement")}
          className="w-[230px] h-[60px] px-9 py-2 font-semibold text-xl bg-gray-300 text-black rounded-full"
        >
          Cancel
        </button>
        <button
          className="w-[230px] h-[60px] px-9 py-2 text-xl font-semibold bg-[#2E6782] text-white rounded-full"
        >
          Save
        </button>
      </div>

      {/* Wrapper to center Section Background & Form */}
      <div className="flex flex-col items-center mt-6">
        {/* Section Background */}
        <div className="bg-[#2E6782] w-[1670px] h-[170px] rounded-t-2xl"></div>

        {/* Dive Form */}
        <div className="bg-[#D9E7EC] p-6 w-[1670px] h-[790px] rounded-b-2xl">
          <form className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl text-[#001526] font-bold ml-10 mt-16">Dive Information</h2>

              {/* Title */}
              <div className="flex flex-col ml-10">
                <label className="mt-1 text-2xl font-semibold text-[#001526]">Title *</label>
                <input
                  type="text"
                  required
                  className="mt-2 border p-5 rounded-2xl border-black bg-transparent w-full"
                />
              </div>

              {/* Location */}
              <div className="flex flex-col ml-10">
                <label className="text-2xl font-semibold text-[#001526]">Location *</label>
                <input
                  type="text"
                  required
                  className="mt-2 border p-5 rounded-xl text-medium border-black bg-transparent w-full"
                />
              </div>

              {/* Date Input */}
              <div className="flex flex-col ml-10">
                <label className="mt-1 text-2xl font-semibold text-[#001526]">Date *</label>
                <div className="mt-2 relative w-[170px]">
                  <input
                    type="text"
                    placeholder="mm/dd/yy"
                    required
                    className="border p-5 rounded-2xl border-black w-[160px] bg-transparent w-full pr-12"
                  />
                  <img
                    src="/calendar-icon.svg"
                    alt="calendar"
                    className="absolute right-10 top-1/2 -translate-y-1/2 w-7 h-7"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="flex flex-col items-center mt-12">
              <div className="border-2 border-black rounded-2xl w-[590px] h-[340px] flex items-center justify-center bg-transparent">
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
                      className="w-60 h-60 mx-auto"
                    />
                    <p className="text-medium mt-5">Maximum of 5MB</p>
                    <p className="text-medium">JPEG, PNG, JPEG</p>
                  </div>
                )}
              </div>

              <button
              onClick={handleUploadClick}
              className="mt-5 w-[600px] h-[40px] bg-black text-white rounded-xl bg-[#001526] cursor-pointer text-lg font-bold tracking-widest"
              >
                Upload Image
                </button>
                <input
                type="file"
                accept="image/*"
                className="hidden"
                id="fileUpload"
                onChange={handleImageChange}
              />
            </div>

            {/*Dive Details */}
            <div className="col-span-2">
              <h2 className="font-bold text-4xl text-[#001526] ml-10 -mt-16">Dive Details</h2>
              <div className="grid grid-cols-2 gap-4">

                {/* Notes */}
                <div className="flex flex-col space-y-2">
                  <label className="text-2xl font-semibold text-[#001526] ml-10 mt-7">Notes *</label>
                  <textarea className="border p-3 rounded-2xl border-black bg-transparent w-[650px] h-[100px] ml-10"></textarea>
                </div>

                {/* Description */}
                <div className="flex flex-col space-y-2">
                  <label className="text-2xl font-semibold text-[#001526] ml-36 mt-7">Description *</label>
                  <textarea
                    required
                    className="border p-3 rounded-2xl border-black bg-transparent w-[600px] h-[100px] ml-36"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Dive Depth & Time */}
            <div className="col-span-0 flex justify-center gap-x-10 mt-5 ml-[-350px]">
              <div className="flex flex-col items-center">
                <label className="text-2xl font-semibold text-[#001526]">Dive Depth in Meter</label>
                <div className="relative flex items-center mt-5">
                  <input
                    type="text"
                    value={depth}
                    readOnly
                    className="w-24 h-20 text-center text-xl text-[#001526] border p-4 rounded-2xl border-black bg-transparent"
                  />
                  <div className="absolute right-[-30px] flex flex-col gap-1">
                    <img src="/arrow-up.svg" 
                    alt="Increase Depth" 
                    className="w-6 h-6 cursor-pointer" 
                    onClick={() => handleDepthChange(1)}
                    />
                    <img 
                    src="/arrow-down.svg"
                    alt="Decrease Depth"
                    className="w-6 h-6 cursor-pointer" 
                    onClick={() => handleDepthChange(-1)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <label className="text-2xl font-semibold text-[#001526]">Dive Time in Minutes</label>
                <div className="relative flex items-center mt-5">
                  <input
                    type="text"
                    value={time}
                    readOnly
                    className="w-24 h-20 text-center text-xl text-[#001526] border p-4 rounded-xl border-2 border-black bg-transparent"
                  />
                  <div className="absolute right-[-30px] flex flex-col gap-1">
                    <img 
                    src="/arrow-up.svg"
                    alt="Increase Time"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => handleTimeChange(1)}
                    />
                    <img
                    src="/arrow-down.svg"
                    alt="Decrease Time"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => handleTimeChange(-1)}
                    />
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

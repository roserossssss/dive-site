"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import { FaRegCalendar } from "react-icons/fa6";
import { BsExclamationCircle } from "react-icons/bs";
import Image from "next/image";

export default function AddDive() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<"save" | null>(null);
  const [imageError, setImageError] = useState(false);

  const [divingdata, setdivingdata] = useState({
    title: "",
    description: "",
    notes: "",
    date: "",
    location: "",
    depth: 0,
    time: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setdivingdata({ ...divingdata, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    console.log("Updated Image Preview:", imagePreview);
  }, [imagePreview]);

  const handleDepthChange = (amount: number) => {
    setdivingdata((prev) => ({
      ...prev,
      depth: Math.max(0, prev.depth + amount), // Ensure depth doesn't go below 0
    }));
  };

  const handleTimeChange = (amount: number) => {
    setdivingdata((prev) => ({
      ...prev,
      time: Math.max(0, prev.time + amount), // Ensure time doesn't go below 0
    }));
  };

  const handleSave = () => {
    const form = document.querySelector("form");
    if (!file) {
      setImageError(true);
      return;
    }
    setImageError(false);

    if (form && form.reportValidity()) {
      setShowModal("save");
    }
  };

  const handleConfirm = () => {
    if (showModal === "save") {
      const newDiveData = {
        id: Date.now(),
        title: divingdata.title,
        description: divingdata.description,
        notes: divingdata.notes,
        date: divingdata.date,
        location: divingdata.location,
        depth: divingdata.depth,
        time: divingdata.time,
        image: file ? URL.createObjectURL(file) : null,
      };

      const existingdivedata = JSON.parse(localStorage.getItem("Divingdata") || "[]");
      const updateddivedata = [...existingdivedata, newDiveData];
      localStorage.setItem("Divingdata", JSON.stringify(updateddivedata));

      router.push("/dashboard/DiveManagement");
    }
    setShowModal(null);
  };

  return (
    <div className="flex-1 pt-2 p-6 relative">
      {/* Page Title */}
      <div className="fixed top-0 left-0 w-full bg-white z-10 p-4 rounded-t-2xl md:pl-80">
        <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-[#001526] text-center md:text-left mt-1">
          New Dive
        </h2>
      </div>

      {/* Buttons Section */}
      <div className="w-full max-w-screen-xl mx-auto flex justify-end gap-4 mt-10 px-4 md:px-2">
        <button
          onClick={() => router.push("../DiveManagement")}
          className="w-full sm:w-36 px-5 py-3 bg-[#D9E7EC] text-[#001526] rounded-full text-[16px] font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="w-full sm:w-36 px-5 py-3 bg-[#2C7DA0] text-white rounded-full text-[16px] font-semibold"
        >
          Save
        </button>
      </div>

      <div className="flex flex-col items-center mt-6">
        {/* Section Background */}
        <div className="bg-[#2C7DA0] w-full max-w-screen-sm md:max-w-screen-lg lg:max-w-screen-xl h-24 md:h-32 rounded-t-2xl mx-auto"></div>

        {/* Dive Form */}
        <div className="bg-[#D9E7EC] p-8 w-full max-w-screen-sm md:max-w-screen-lg lg:max-w-screen-xl h-auto min-h-[600px] md:min-h-[600px] rounded-b-2xl mx-auto">
          <form className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-3 md:px-6">
            {/* Left Column */}
            <div className="space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-[#001526]">Dive Information</h2>

              {/* Title */}
              <div className="flex flex-col">
                <label
                  htmlFor="title"
                  className="block text-[#001526] font-semibold mb-2 text-sm md:text-base"
                >
                  Title <span className="text-[#CF0C0F]">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={divingdata.title}
                  onChange={handleChange}
                  required
                  className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526] text-sm md:text-base"
                />
              </div>

              {/* Location */}
              <div className="flex flex-col">
                <label
                  htmlFor="location"
                  className="block text-[#001526] font-semibold mb-2 text-sm md:text-base"
                >
                  Location <span className="text-[#CF0C0F]">*</span>
                </label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={divingdata.location}
                  onChange={handleChange}
                  required
                  className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526] text-sm md:text-base"
                />
              </div>

              {/* Date Input */}
              <div className="flex flex-col relative">
                <label
                  htmlFor="date"
                  className="block text-[#001526] font-semibold mb-2 text-sm md:text-base"
                >
                  Date <span className="text-[#CF0C0F]">*</span>
                </label>
                <div className="relative">
                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={divingdata.date}
                    onChange={handleChange}
                    required
                    className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526] text-sm md:text-base pr-10"
                  />
                  <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => {
                      const dateInput = document.getElementById("date") as HTMLInputElement;
                      if (dateInput) {
                        dateInput.showPicker?.();
                        dateInput.click();
                      }
                    }}
                  >
                    <FaRegCalendar className="text-[#001526] w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="flex flex-col items-center mt-0 lg:mt-[18px]">
              <div
                className={`border-2 ${
                  imageError ? "border-[#CF0C0F]" : "border-[#001526]"
                } rounded-lg h-52 w-[100%] flex items-center justify-center bg-[#D9E7EC]`}
              >
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <Image
                      src="/image-uploadblack.svg"
                      alt="Upload Icon"
                      width={100}
                      height={100}
                      className="mx-auto"
                    />
                    <p className="text-sm mt-3">Maximum of 5MB</p>
                    <p className="text-sm">JPEG, PNG, JPEG</p>
                  </div>
                )}
              </div>
              <label
                htmlFor="fileUpload"
                className="mt-4 w-[100%] h-11 text-white text-sm md:text-lg rounded-lg bg-[#001526] cursor-pointer flex items-center justify-center"
              >
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                id="fileUpload"
                onChange={handleImageChange}
                required
                className="hidden"
              />
              {imageError && (
                <p className="text-[#CF0C0F] text-sm mt-2">
                  Please upload an image.
                </p>
              )}
            </div>

            {/* Dive Details */}
            <div className="col-span-1 lg:col-span-2 space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-[#001526]">Dive Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Notes */}
                <div className="flex flex-col">
                  <label
                    htmlFor="notes"
                    className="block text-[#001526] font-semibold mb-2 text-sm md:text-base"
                  >
                    Notes <span className="text-[#CF0C0F]">*</span>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={divingdata.notes}
                    onChange={handleChange}
                    required
                    className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526] text-sm md:text-base h-24"
                  ></textarea>
                </div>

                {/* Description */}
                <div className="flex flex-col">
                  <label
                    htmlFor="description"
                    className="block text-[#001526] font-semibold mb-2 text-sm md:text-base"
                  >
                    Description <span className="text-[#CF0C0F]">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={divingdata.description}
                    onChange={handleChange}
                    required
                    className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526] text-sm md:text-base h-24"
                  ></textarea>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dive Depth */}
                <div className="flex flex-col">
                  <label
                    htmlFor="depth"
                    className="block text-[#001526] font-semibold mb-1 text-xs sm:text-sm md:text-base"
                  >
                    Dive Depth (Meter) <span className="text-[#CF0C0F]">*</span>
                  </label>
                  <div className="flex items-center border border-[#001526] rounded-md bg-[#D9E7EC]">
                    <div className="flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => handleDepthChange(1)}
                        className="p-1 sm:p-2 text-[#001526] hover:bg-[#001526] hover:text-white rounded-t-md w-full text-xs sm:text-sm"
                      >
                        <TiArrowSortedUp size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDepthChange(-1)}
                        className="p-1 sm:p-2 text-[#001526] hover:bg-[#001526] hover:text-white rounded-b-md w-full text-xs sm:text-sm"
                      >
                        <TiArrowSortedDown size={14} />
                      </button>
                    </div>
                    <input
                      type="number"
                      id="depth"
                      name="depth"
                      value={divingdata.depth}
                      onChange={(e) =>
                        setdivingdata((prev) => ({
                          ...prev,
                          depth: Math.max(0, parseInt(e.target.value) || 0), // Ensure depth doesn't go below 0
                        }))
                      }
                      required
                      min="1" // Ensure the value is at least 1
                      className="flex-1 p-1 sm:p-2 text-[#001526] text-xs sm:text-sm md:text-base bg-[#D9E7EC] border-none outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-center"
                    />
                  </div>
                </div>

                {/* Dive Time */}
                <div className="flex flex-col">
                  <label
                    htmlFor="time"
                    className="block text-[#001526] font-semibold mb-1 text-xs sm:text-sm md:text-base"
                  >
                    Dive Time (Minutes) <span className="text-[#CF0C0F]">*</span>
                  </label>
                  <div className="flex items-center border border-[#001526] rounded-md bg-[#D9E7EC]">
                    <div className="flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => handleTimeChange(1)}
                        className="p-1 sm:p-2 text-[#001526] hover:bg-[#001526] hover:text-white rounded-t-md w-full text-xs sm:text-sm"
                      >
                        <TiArrowSortedUp size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTimeChange(-1)}
                        className="p-1 sm:p-2 text-[#001526] hover:bg-[#001526] hover:text-white rounded-b-md w-full text-xs sm:text-sm"
                      >
                        <TiArrowSortedDown size={14} />
                      </button>
                    </div>
                    <input
                      type="number"
                      id="time"
                      name="time"
                      value={divingdata.time}
                      onChange={(e) =>
                        setdivingdata((prev) => ({
                          ...prev,
                          time: Math.max(0, parseInt(e.target.value) || 0), // Ensure time doesn't go below 0
                        }))
                      }
                      required
                      min="1" // Ensure the value is at least 1
                      className="flex-1 p-1 sm:p-2 text-[#001526] text-xs sm:text-sm md:text-base bg-[#D9E7EC] border-none outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[black] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#D9E7EC] p-8 w-11/12 sm:w-[480px] h-auto sm:h-[450px] rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <div className="flex justify-center mb-4">
              <BsExclamationCircle className="text-[#001526] w-24 h-24" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-center text-[#001526]">Save New Dive?</h2>
            <p className="font-semibold text-center text-[#001526] mb-5 text-[15px]">
              You&apos;re about to save this dive entry.
              <br />
              Want to proceed?
            </p>
            <div className="flex justify-center mt-5">
              <button
                className="mr-2 w-36 px-5 py-3 bg-[#D9E7EC] text-[#001526] border border-[#001526] rounded-full text-[16px] font-semibold"
                onClick={() => setShowModal(null)}
              >
                Cancel
              </button>
              <button
                className="ml-2 w-36 px-5 py-3 bg-[#001526] text-white rounded-full text-[16px] font-semibold"
                onClick={handleConfirm}
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
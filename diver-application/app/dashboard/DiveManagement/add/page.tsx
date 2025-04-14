"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddDive() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<"save" | null>(null);
  
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

  const savedDivingdata = () => {
    if ( !divingdata.title || !divingdata.description || !divingdata.notes || !divingdata.date || !divingdata.location || !divingdata.depth || !divingdata.time || !file ) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    const newDiveData = {
      id: Date.now(),
      title: divingdata.title,
      description: divingdata.description,
      note: divingdata.notes,
      date: divingdata.date,
      location: divingdata.location,
      depth: divingdata.depth,
      time: divingdata.time,
      image: URL.createObjectURL(file),
    };

    const existingdivedata = JSON.parse(localStorage.getItem("Divingdata") || "[]");
    const updateddivedata = [...existingdivedata, newDiveData];
    localStorage.setItem("Divingdata", JSON.stringify(updateddivedata));

    router.push("/dashboard/DiveManagement");
  };

  const handleConfirm = () => {
    if (showModal === "save") {
      savedDivingdata();
    }
    setShowModal(null);
  };
  


  return (
    <div className="flex-1 pt-2 relative">
      {/* Page Title */}
      <div className="fixed top-0 left-0 w-full bg-white z-10 p-4 rounded-t-2xl md:pl-80">
      <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-[#001526] text-center md:text-left mt-1">New Dive</h2>  
      </div>

      {/* Buttons Section */}
      <div className="w-full max-w-screen-xl mx-auto flex justify-end gap-4 mt-16 px-4 md:px-2">
        <button
          onClick={() => router.push("../DiveManagement")}
          className="w-full lg:w-[230px] md:w-[190px] h-[60px] md:h-[60px] px-9 py-2 font-semibold text-xl bg-gray-300 text-[#001526] rounded-full"
        >
          Cancel
        </button>
        <button
         onClick={() => setShowModal("save")}
          className="w-full lg:w-[230px] md:w-[190px] h-[60px] px-9 py-2 text-xl font-semibold bg-[#2E6782] text-white rounded-full"
        >
          Save
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#D9E7EC] p-6 rounded-3xl shadow-lg w-full max-w-[680px] h-auto text-center mx-auto">
            <div className="flex justify-center mb-4">
              <img src="/exclamation.svg" alt="Delete" className="w-50 h-50 mt-7" />

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
        <div className="bg-[#2E6782] w-full max-w-screen-sm md:max-w-screen-lg lg:max-w-screen-xl h-24 md:h-32 rounded-t-[3rem] mx-auto"></div>

        {/* Dive Form */}
        <div className="bg-[#D9E7EC] p-3 w-full max-w-screen-sm md:max-w-screen-lg lg:max-w-screen-xl h-auto min-h-[600px] md:min-h-[710px] rounded-b-[3rem] mx-auto">
                <form className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-3 md:px-10">

          {/* Left Column */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-3xl text-[#001526] font-bold mt-1 md:mt-2">Dive Information</h2>
            
            {/* Title */}
            <div className="flex flex-col">
              <label htmlFor="name" className="-mt-2 text-sm md:text-xl font-semibold text-[#001526]">
                Title <span className="text-[#CF0C0F]">*</span>
              </label>
              <input
                 id="title"
                 type="text"
                 name="title"
                 value={divingdata.title}
                 onChange={handleChange}
                className="mt-2 border p-1 md:p-2 rounded-xl border-black bg-transparent w-full max-w-sm md:max-w-lg"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col">
              <label className="-mt-1 text-sm md:text-xl font-semibold text-[#001526]">
                Location <span className="text-[#CF0C0F]">*</span>
              </label>
              <input
                id="location"
                type="text"
                name="location"
                value={divingdata.location}
                onChange={handleChange}
                className="mt-2 border p-1 md:p-2 rounded-xl text-medium border-black bg-transparent w-full max-w-md md:max-w-lg"
              />
            </div>

            {/* Date Input */}
            <div className="flex flex-col">
              <label htmlFor="date" className="-mt-1 text-sm md:text-xl font-semibold text-[#001526]">
                Date <span className="text-[#CF0C0F]">*</span>
              </label>
              <div className="mt-2 relative w-full max-w-xs">
                <input
                  id="date"
                  type="text"
                  name="date"
                  value={divingdata.date}
                  onChange={handleChange}
                  placeholder="mm/dd/yy"
                  className="border p-1 md:p-2 rounded-xl border-black w-full pr-12 bg-transparent"
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
            <div className="border-2 border-black rounded-2xl w-full max-w-md md:max-w-lg h-52 md:h-72 flex items-center justify-center bg-transparent sm: ml-1 sm: -mt-4 md: -mt-9 md: -ml-10">
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
                    className="w-24 h-24 md:w-40 md:h-40 mx-auto"
                  />
                  <p className="text-xs md:text-medium mt-3">Maximum of 5MB</p>
                  <p className="text-xs md:text-medium">JPEG, PNG, JPEG</p>
                </div>
              )}
            </div>

            {/* Upload Image Button */}
            <label
              htmlFor="fileUpload"
              className="z-10 md: mt-5 ml-1 w-full max-w-md md:max-w-lg h-8 md:h-11 text-white text-sm md:text-xl rounded-xl bg-[#001526] cursor-pointer text-lg font-semibold tracking-widest flex items-center justify-center"
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
            <h2 className="font-bold text-2xl md:text-3xl text-[#001526] sm: -mt-2 md: -mt-12">Dive Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Notes */}
              <div className="flex flex-col">
                <label className="-mt-3 text-sm md:text-xl font-semibold text-[#001526]">Notes <span className="text-[#CF0C0F]">*</span> </label>
                <textarea 
                id="notes"
                 name="notes"
                 value={divingdata.notes}
                 onChange={handleChange}
                 className="border p-3 rounded-xl border-black bg-transparent w-full max-w-md md:max-w-lg h-16 md:h-24 md: mt-1"></textarea>
              </div>


              {/* Description */}
              <div className="flex flex-col">
                <label className="md: -mt-3 md:ml-4 lg:ml-7 text-sm md:text-xl font-semibold text-[#001526]">Description <span className="text-[#CF0C0F]">*</span> </label>
                <textarea id="description"
                  name="description"
                  value={divingdata.description}
                  onChange={handleChange}
                  className="border p-3 rounded-xl border-black bg-transparent w-full max-w-md md:max-w-lg h-16 md:h-24 -ml-10 md:ml-4 lg:ml-7 md:mt-1 ml-1 mt-1"></textarea>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:gap-x-8 gap-y-6 mt-6 items-start">
          <div className="flex flex-row gap-x-4 mt-6 items-start">
  {/* Dive Depth */}
  <div className="flex flex-col w-full max-w-[200px] -mt-12">
    <label className="text-sm md:text-xl font-semibold text-[#001526] mb-2 break-keep whitespace-nowrap">
      Dive Depth (M)
    </label>
    <div className="relative flex items-center">
      <input
        id="depth"
        type="text"
        name="depth"
        value={divingdata.depth}
        onChange={handleChange}
        className="w-12 h-10 md:w-16 md:h-12 text-center text-sm md:text-xl text-[#001526] border p-4 rounded-2xl border-black bg-transparent"
      />
      <div className="absolute top-1/2 -translate-y-1/2 right-10 flex flex-col gap-1">
        <button type="button" onClick={(e) => { e.preventDefault(); handleDepthChange(1); }}>
          <img src="/arrow-up.svg" alt="Increase Depth" className="w-3 h-3 md:w-4 md:h-4 cursor-pointer" />
        </button>
        <button type="button" onClick={(e) => { e.preventDefault(); handleDepthChange(-1); }}>
          <img src="/arrow-down.svg" alt="Decrease Depth" className="w-3 h-3 md:w-4 md:h-4 cursor-pointer" />
        </button>
      </div>
    </div>
  </div>
  
  {/* Dive Time */}
  <div className="flex flex-col w-full max-w-[200px] -mt-12 ml-10">
    <label className="text-sm md:text-xl font-semibold text-[#001526] mb-2 break-keep whitespace-nowrap">
    Dive Time (MIN)
    </label>
    <div className="relative flex items-center">
      <input
        id="time"
        type="text"
        name="time"
        value={divingdata.time}
        onChange={handleChange}
        className="w-12 h-10 md:w-16 md:h-12 text-center text-sm md:text-xl text-[#001526] border p-4 rounded-2xl border-black bg-transparent"
      />
      <div className="absolute top-1/2 -translate-y-1/2 right-10 flex flex-col gap-1">
        <button type="button" onClick={(e) => { e.preventDefault(); handleTimeChange(1); }}>
          <img src="/arrow-up.svg" alt="Increase Time" className="w-3 h-3 md:w-4 md:h-4 cursor-pointer" />
        </button>
        <button type="button" onClick={(e) => { e.preventDefault(); handleTimeChange(-1); }}>
          <img src="/arrow-down.svg" alt="Decrease Time" className="w-3 h-3 md:w-4 md:h-4 cursor-pointer" />
        </button>
      </div>
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


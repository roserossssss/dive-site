"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export default function ViewDive() {
  const [divingdata, setDivingData] = useState({
    title: "",
    description: "Description for the dive.",
    notes: "Notes about the dive.",
    date: "2025-01-01",
    location: "Location of the Dive",
    depth: 10,
    time: 30, 
    image: "/images/page_bg_v1.jpg",
  });

  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

	const router = useRouter();

  useEffect(() => {
    const storedDive = localStorage.getItem("selectedDive");
    if (storedDive) {
      const parsedDive = JSON.parse(storedDive);
      setDivingData((prev) => ({
        ...prev,
        title: parsedDive.title,
      }));
    }

    const storedUser = localStorage.getItem("selectedUser");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex-1 pt-2 p-6 relative">
      {/* Header Section */}
			<div className="fixed top-0 left-0 w-full bg-[#001526] z-10 p-4 rounded-t-2xl md:pl-80">
        <div className="flex items-center justify-between md:justify-start">
          <IoIosArrowBack
            size={30}
            className="cursor-pointer mr-3 mt-2 text-white"
            onClick={() => router.push("/Admin-Dashboard/DiveManagement")}
            title="Go back to Dive Management"
            aria-label="Go back to Dive Management"
          />
          <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-white text-center flex-1 md:flex-none mt-2 mr-10">
            Dive Details
          </h2>
        </div>
      </div>

      <div className="flex flex-col items-center mt-[3.5rem]">
        {/* Section Background */}
        <div className="bg-[#2C7DA0] p-11 pl-[3.7rem] w-full max-w-screen-sm md:max-w-screen-lg lg:max-w-screen-xl rounded-t-2xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              {userData.name.toUpperCase()}
            </h2>
            <p className="text-lg md:text-xl font-medium text-white">
              {userData.email}
            </p>
          </div>
        </div>

        {/* Dive Form */}
        <div className="bg-[#D9E7EC] p-8 pb-9 w-full max-w-screen-sm md:max-w-screen-lg lg:max-w-screen-xl h-auto min-h-[600px] md:min-h-[600px] rounded-b-2xl mx-auto">
          <form className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-3 md:px-6">
            {/* Left Column */}
            <div className="space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-[#001526]">Dive Information</h2>

              {/* Title */}
              <div className="flex flex-col">
                <label className="block text-[#001526] font-semibold mb-2 text-sm md:text-base">
                  Title
                </label>
                <p className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526] text-sm md:text-base">
                  {divingdata.title}
                </p>
              </div>

              {/* Location */}
              <div className="flex flex-col">
                <label className="block text-[#001526] font-semibold mb-2 text-sm md:text-base">
                  Location
                </label>
                <p className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526] text-sm md:text-base">
                  {divingdata.location}
                </p>
              </div>

              {/* Date */}
              <div className="flex flex-col">
                <label className="block text-[#001526] font-semibold mb-2 text-sm md:text-base">
                  Date
                </label>
                <p className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526] text-sm md:text-base">
                  {divingdata.date}
                </p>
              </div>
            </div>

            {/* Image Preview */}
						<div className="flex flex-col items-center mt-0 lg:mt-[18px]">
							<div className="border-2 border-[#001526] rounded-lg flex items-center justify-center bg-[#D9E7EC] overflow-hidden w-full h-[267px]">
								{divingdata.image ? (
									<img
										src={divingdata.image}
										alt="Dive Preview"
										className="w-full h-full object-cover rounded-lg"
									/>
								) : (
									<p className="text-center text-sm">No image available</p>
								)}
							</div>
						</div>

            {/* Dive Details */}
            <div className="col-span-1 lg:col-span-2 space-y-3">
              <h2 className="text-lg md:text-xl font-bold text-[#001526]">Dive Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Notes */}
                <div className="flex flex-col">
                  <label className="block text-[#001526] font-semibold mb-2 text-sm md:text-base">
                    Notes
                  </label>
                  <p className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526] text-sm md:text-base h-24">
                    {divingdata.notes}
                  </p>
                </div>

                {/* Description */}
                <div className="flex flex-col">
                  <label className="block text-[#001526] font-semibold mb-2 text-sm md:text-base">
                    Description
                  </label>
                  <p className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526] text-sm md:text-base h-24">
                    {divingdata.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dive Depth */}
                <div className="flex flex-col">
                  <label className="block text-[#001526] font-semibold mb-1 text-xs sm:text-sm md:text-base">
                    Dive Depth (Meter)
                  </label>
                  <p className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526] text-sm md:text-base text-center">
                    {divingdata.depth} m
                  </p>
                </div>

                {/* Dive Time */}
                <div className="flex flex-col">
                  <label className="block text-[#001526] font-semibold mb-1 text-xs sm:text-sm md:text-base">
                    Dive Time (Minutes)
                  </label>
                  <p className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526] text-sm md:text-base text-center">
                    {divingdata.time} min
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
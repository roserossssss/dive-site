"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function DiveManagement() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<string>("");
    const [filterByLocation, setFilterByLocation] = useState<string>("");
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
    
    const diveData = [
  {
    id: 1,
    title: "Coral Reef Exploration",
    description:
      "Exploring the vibrant coral reefs, home to colorful fish, swaying corals, and graceful sea turtles in crystal-clear waters.",
    notes: "Great visibility, lots of marine life",
    date: "2024-01-01",
    location: "Great Barrier Reef",
    depth: 30,
    time: 40,
    image: "/sample-dive1.jpg",
  },
  {
    id: 2,
    title: "Sunken Ship Dive",
    description: "Exploring the wreckage.",
    notes: "Low visibility, but exciting",
    date: "2024-01-19",
    location: "Truk Lagoon",
    depth: 30,
    time: 40,
    image: "/sample-dive1.jpg",
  },
  {
    id: 3,
    title: "Coral Reef Exploration",
    description: "Exploring the vibrant coral reefs.",
    notes: "Great visibility, lots of marine life",
    date: "2024-01-01",
    location: "Great Barrier Reef",
    depth: 30,
    time: 40,
    image: "/sample-dive1.jpg",
  },
];


  const handleSort = (criteria: string) => {
    setSortBy(criteria);
    setSortDropdownOpen(false);
  };

  const handleFilter = (location: string | null) => {
    setFilterByLocation(location ?? "");
    setFilterDropdownOpen(false);
  };

  const filteredDives = diveData
    .filter((dive) =>
      dive.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((dive) =>
      filterByLocation ? dive.location === filterByLocation : true
    )
    .sort((a, b) => {
      if (sortBy === "date")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "depth") return b.depth - a.depth;
      if (sortBy === "time") return b.time - a.time;
      return 0;
    });

  return (
    <div>
    {/* Header Section */}
    <h2 className="text-3xl font-bold text-[#001526]">My Dive</h2>
  
    {/* Controls */}
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center space-x-2">
        <img
          src="/leftarrow.svg"
          alt="Left Arrow"
          className="w-7 h-7 cursor-pointer mt-6"
        />
        <img
          src="/rightarrow.svg"
          alt="Right Arrow"
          className="w-7 h-7 cursor-pointer mt-6"
        />
        <button
          onClick={() => router.push("/dashboard/DiveManagement/add")}
          className="bg-[#001526] text-white px-9 py-3 rounded-full flex items-center gap-2 mt-6"
        >
          <img 
          src="/plus.svg"
          alt="Plus"
          className="w-3 h-3 -mt-1 -ml-1 transition-transform duration-300"
          />
          <span className="text-white font-medium ml-1">New Dive</span>
        </button>
      </div>
  
      <div className="flex flex-wrap gap-4 mt-1">
        {/* Search */}
        <div className="relative w-full mt-1 sm:w-auto">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-full px-5 py-2 w-full mt-5 sm:w-[400px] placeholder:text-medium bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src="/search.svg"
            alt="Search"
            className="absolute right-3 mt-5 top-2 w-6 h-6"
          />
        </div>
  
        {/* Sort Dropdown */}
        <div className="relative mt-5 ">
            <button
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="bg-[#001526] text-white px-5 py-3 rounded-full flex items-center gap-3"
            >
              <img src="/sort.svg" alt="Sort" className="w-4 h-4" />
              Sort
            </button>
            {sortDropdownOpen && (
              <div className="absolute right-20 mt-2 bg-white shadow-lg rounded-lg w-[70px] h-[97px] z-50">
                {["date", "time", "depth"].map((criteria) => (
                  <button
                    key={criteria}
                    onClick={() => handleSort(criteria)}
                    className="block w-fit text-left px-4 py-2 text-[#001526] rounded-lg hover:bg-[#001526] hover:text-white mx-auto"
                  >
                    {criteria.charAt(0).toUpperCase() + criteria.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter Dropdown */}
          <div className="relative mt-5 -ml-7 px-5">
            <button
              onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
              className="bg-[#001526] text-white px-5 py-3 rounded-full flex items-center gap-3"
            >
              <img src="/filter.svg" alt="Filter" className="w-4 h-4" />
              Filter
            </button>
            {filterDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-[127px] h-[117px] z-50">
                <button
                  onClick={() => handleFilter(null)}
                  className="block w-full text-left px-4 py-2 text-[#001526] rounded-lg hover:bg-[#001526] hover:text-white hover: w-[110px] mx-auto"
                >
                  All
                </button>
                {Array.from(new Set(diveData.map((d) => d.location))).map(
                  (loc) => (
                    <button
                      key={loc}
                      onClick={() => handleFilter(loc)}
                      className="block w-full text-left px-2 py-2 text-[#001526] rounded-lg hover:bg-[#001526] hover:text-white w-[110px] mx-auto"
                    >
                      {loc}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
  
    {/* Dive List */}
    <div className="mt-6 flex flex-col items-center mx-4">
      {filteredDives.map((dive, index) => (
        <div
          key={index}
          className="w-full h-auto mb-7 rounded-3xl shadow-md bg-[#2C7DA0] flex flex-col lg:flex-row md:items-center items-center relative overflow-hidden"
        >
          {/* Image Section */}
          <img
            src={dive.image}
            alt={dive.title}
            className="w-full lg:w-[570px] h-full object-cover rounded-t-3xl lg:rounded-3xl"
          />
  
          {/* Content Section */}
          <div className="flex-1 p-5 -mt-20 w-full text-center lg:text-left">
            <h2 className="text-2xl lg:text-4xl font-bold text-white">{dive.title}</h2>
  
            <div className="flex flex-wrap justify-center lg:justify-start mt-2 gap-2">
              <img src="/location.svg" alt="Location Icon" className="w-6 h-6" />
              <p className="text-white font-bold text-lg lg:text-xl">{dive.location}</p>
            </div>
  
            <div className="flex flex-wrap justify-center lg:justify-start mt-3 gap-2">
              <img src="/calendar.svg" alt="Date Icon" className="w-6 h-6" />
              <p className="text-white text-lg lg:text-xl">
                {new Date(dive.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
  
            <p className="text-white text-lg lg:text-xl mt-4">{dive.notes}</p>
            <p className="text-white text-lg lg:text-xl mt-2">{dive.description}</p>
  
            {/* Dive Depth and Time */}
            <div className="flex flex-col md:flex-row justify-center  mt-6 text-white gap-6">
              <div className="flex flex-col items-center">
                <span className="font-bold text-5xl lg:text-7xl mt-10 p-2">
                  {dive.depth}
                  <span className="text-lg lg:text-2xl font-bold">M</span>
                </span>
                <span className="text-lg lg:text-xl">Dive Depth</span>
              </div>
  
              <div className="flex flex-col items-center">
                <span className="font-bold text-5xl lg:text-7xl mt-10 p-2">
                  {dive.time}
                  <span className="text-lg lg:text-2xl font-bold">MIN</span>
                </span>
                <span className="text-lg lg:text-xl">Dive Time</span>
              </div>
            </div>
          </div>
  
          {/* Action Menu */}
          <div className="absolute top-5 right-5">
            <button
              onClick={() => setDropdownIndex(dropdownIndex === index ? null : index)}
              className="text-white"
            >
              <img src="/verticaldots.svg" alt="More options" className="w-6 h-6" />
            </button>
            {dropdownIndex === index && (
              <div className="absolute top-10 right-0 bg-white shadow-md rounded-lg p-2 w-28">
                <Link href={`/dashboard/DiveManagement/${dive.id}`}>
                  <button className="block w-full px-3 py-3 rounded-lg text-[#001526] hover:bg-[#2C7DA0] hover:bg-opacity-50">
                    Update
                  </button>
                </Link>
                <button className="block w-full px-4 py-3 rounded-lg text-[#001526] hover:bg-[#2C7DA0] hover:bg-opacity-50">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function DiveManagement() {
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
      description: "Exploring the vibrant coral reefs, home to colorful fish, swaying corals, and graceful sea turtles in crystal-clear waters.",
      notes: "Great visibility, lots of marine life",
      date: "2024-01-01",
      location: "Great Barrier Reef",
      depth: 30,
      time: 40,
      image: "/sample-dive1.jpg",
    },
    {
      id: 2,
      title: "Sunken Sheep Dive",
      description: "Exploring the wreckage",
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
      description: "Exploring the vibrant coral reefs",
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
    setFilterByLocation(location || "");
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
    <div className="flex-1 p-5 pt-2 relative">
      {/* Header Section */}
      <h2 className="text-3xl font-bold text-black">My Dive</h2>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <img
            src="/leftarrow.svg"
            alt="Left Arrow"
            className="w-7 h-7 cursor-pointer mt-5"
          />
          <img
            src="/rightarrow.svg"
            alt="Right Arrow"
            className="w-7 h-7 cursor-pointer mt-5"
          />
          <button
            onClick={() => router.push("/dashboard/DiveManagement/add")}
            className="bg-[#001526] text-white px-7 py-2 rounded-full flex items-center gap-2 mt-5"
          >
            <img src="/plus.svg" alt="Plus" className="w-3 h-3" />
            New Dive
          </button>
        </div>

        <div className="flex space-x-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-full px-70 py-2 w-[400px] pl-5 placeholder:text-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
              src="/search.svg"
              alt="Search"
              className="absolute right-3 top-2 w-5 h-5"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
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
          <div className="relative">
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
<div className="mt-5 flex flex-col items-center">
  {filteredDives.map((dive, index) => (
    <div
      key={index}
      className="p-10 w-[1400px] h-[370px] mb-7 rounded-3xl shadow-md bg-[#2C7DA0] flex items-center relative"
    >
      <img
        src={dive.image}
        alt={dive.title}
        className="w-[520px] h-[370px] object-cover rounded-2xl -ml-10"
      />

      <div className="flex-1 ml-8">
        <h2 className="text-4xl font-bold text-white -mt-[30px]">{dive.title}</h2>
        <div className="flex items-center mt-1 tracking-wider">
          <img src="/location.svg" alt="Location Icon" className="w-7 h-7 mr-2" />
          <p className="text-white font-bold text-xl tracking-wider mt-3">{dive.location}</p>
        </div>
        <div className="flex items-center text-xl mt-3">
          <img src="/calendar.svg" alt="Date Icon" className="w-7 h-7 mr-2" />
          <p className="text-white">
            {new Date(dive.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                })}
                </p>
        </div>
        <p className="text-white text-xl mt-5 tracking-wider">{dive.notes}</p>
        <p className="text-white text-xl mt-2">{dive.description}</p>
        
        {/* Dive Depth and Time Section */}
        <div className="flex space-x-16 mt-[48px] text-white ml-[290px]">
          <div className="flex flex-col items-center">
            <span className="font-bold text-7xl">
              {dive.depth}
              <span className="text-2xl font-bold">M</span>
            </span>
            <span className="text-xl tracking-widest">Dive Depth</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-bold text-7xl">
              {dive.time}
              <span className="text-2xl font-bold">MIN</span>
            </span>
            <span className="text-xl tracking-widest">Dive Time</span>
          </div>
        </div>
      </div>

      {/* Action Menu */}
      <div className="absolute top-7 right-5">
        <button
          onClick={() => setDropdownIndex(dropdownIndex === index ? null : index)}
          className="text-white"
        >
          <img src="/verticaldots.svg" alt="More options" className="w-6 h-6" />
        </button>
        {dropdownIndex === index && (
          <div className="absolute top-10 right-0 bg-white shadow-md rounded-lg p-2">
            <Link href={`/dashboard/DiveManagement/${dive.id}`}>
              <button className="block px-3 py-3 rounded-lg text-[#001526] hover:bg-[#2C7DA0] hover:bg-opacity-50 ">Update</button>
            </Link>
            <button className="block px-4 py-3 rounded-lg  text-[#001526] hover:bg-[#2C7DA0] hover:bg-opacity-50 ">Delete</button>
          </div>
        )}
      </div>
    </div>
))}
</div>
</div>
  );
}

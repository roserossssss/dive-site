"use client";

import { useState } from "react";
import Link from "next/link";

export default function DiveManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [filterByLocation, setFilterByLocation] = useState("");
    const [dropdownIndex, setDropdownIndex] = useState(null); // For "..." dropdown
    

    const diveData = [
        {
            title: "Coral Reef Exploration",
            description: "Exploring the vibrant coral reefs",
            notes: "Great visibility, lots of marine life",
            date: "2024-02-25",
            location: "Great Barrier Reef",
            depth: 30,
            time: 50,
            image: "/sample-dive1.jpg",
        },
        {
            title: "Sunken Ship Dive",
            description: "Investigating a WWII shipwreck",
            notes: "Low visibility but exciting",
            date: "2024-02-20",
            location: "Truk Lagoon",
            depth: 40,
            time: 50,
            image: "/sample-dive2.jpg",
        },
        {
            title: "Cave diving",
            description: "Investigating a cave under WATER?",
            notes: "Exciting",
            date: "2024-03-02",
            location: "Pacific Ocean",
            depth: 4,
            time: 50,
            image: "/sample-dive2.jpg",
        },
    ];

    // Filterings
    const filteredDives = diveData
        .filter((dive) =>
            dive.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((dive) =>
            filterByLocation ? dive.location === filterByLocation : true
        )
        .sort((a, b) => {
            if (sortBy === "date") return  - new Date(b.date);
            if (sortBy === "depth") return b.depth - a.depth;
            if (sortBy === "time") return b.time - a.time;
            return 0;
        });

    return (
        <div className="bg-white p-4">
            <h1 className="text-black text-3xl font-semibold mb-4">
                Dive Management
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

    <div>
        <Link href="/dashboard/DiveManagement/add">
            <button className="bg-[#001526] text-white p-1 text-sm w-32 border-black rounded-2xl shadow-md hover:bg-blue-600 transition">
                + Add Dive
            </button>
        </Link>
    </div>


    <div className="flex flex-wrap justify-end gap-2">
        <input
            type="text"
            placeholder="Search"
            className="p-1 w-56 rounded-lg text-sm text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
            className="p-1 border rounded-lg text-sm bg-[#001526] text-white"
            onChange={(e) => setSortBy(e.target.value)}
        >
            <option value="">Sort By</option>
            <option value="date">Date</option>
            <option value="depth">Depth</option>
            <option value="time">Time</option>
        </select>

        <select
            className="p-1 border rounded-lg text-sm bg-[#001526] text-white"
            onChange={(e) => setFilterByLocation(e.target.value)}
        >
            <option value="">Filter by Location</option>
            {Array.from(new Set(diveData.map((d) => d.location))).map((loc) => (
                <option key={loc} value={loc}>
                    {loc}
                </option>
            ))}
        </select>
    </div>
</div>


            {/* Dive List */}
<div className="">
    {filteredDives.map((dive, index) => (
        <div key={index} className="bg-[#2C7DA0] p-4 rounded-xl shadow-md mb-8">
            <div className="grid grid-cols-2">
                <img
                    src={dive.image}
                    alt="Dive"
                    className="w-full h-40 object-cover rounded-md"
                />

                <div className="relative flex flex-col justify-between">

                    <div className="flex justify-between items-center">
                        <h2 className="font-extrabold text-2xl text-white">
                            {dive.title}
                        </h2>


                        <div className="relative">
                            <button
                                onClick={() =>
                                    setDropdownIndex(dropdownIndex === index ? null : index)
                                }
                                className="text-2xl font-bold cursor-pointer text-white"
                            >
                                ...
                            </button>

                            {dropdownIndex === index && (
                                <div className="absolute right-0 bg-[#D9E7EC] text-black shadow-md rounded-3xl p-2 mt-2">
                                <Link href="/dashboard/DiveManagement/${dive.id}">
                                <button className="block px-4 py-1 hover:bg-[#2C7DA0] hover:bg-opacity-100 hover:rounded-3xl w-full ">
                                        Edit
                                    </button>
                                </Link>
                                    <button className="block px-4 py-1 hover:bg-[#2C7DA0] hover:bg-opacity-100 hover:rounded-3xl w-full">
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <p className="text-lg text-white mt-1">{dive.location}</p>
                    <p className="text-lg text-white">{dive.date}</p>

                    <div className="text-xs text-white mt-2">
                        <p>{dive.description}</p>
                        <p>{dive.notes}</p>
                    </div>

                    <div className="flex justify-center gap-4 items-center font-bold text-4xl text-white mt-2">
                        <span>{dive.depth}M</span>
                        <span>{dive.time}Min</span>
                    </div>

                    <div className="flex justify-center gap-4 items-center font-bold text-xs text-white">
                        <span>Dive Depth</span>
                        <span>Dive Time</span>
                    </div>
                </div>
            </div>
        </div>
    ))}
</div>

        </div>
    );
}

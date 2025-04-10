"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState} from "react";
import Link from "next/link";
import Image from 'next/image';

interface diveData {
  id: number;
  title: string;
  description: string;
  notes: string;
  date: string;
  location: string;
  depth: number;
  time: number; 
  image: string;

}

export default function DiveManagement() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<string>("");
    const [filterByLocation, setFilterByLocation] = useState<string>("");
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteDiveId, setDeleteDiveId] = useState<number | null>(null);
    const [divingdata, setdivingdata] = useState<diveData[]>([]); 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [showDeleteModal, setShowDeleteModal] = useState(false);

   useEffect(() => {
      requestIdleCallback(() => {
        const storedDiveData = localStorage.getItem("Divingdata");
        if (storedDiveData) {
          setdivingdata(JSON.parse(storedDiveData));
        }
      });
    }, []);  

const handleDelete = (id: number) => {
  setDeleteDiveId(id);
  setDeleteModalOpen(true);
};

const confirmDelete = () => {
  if (deleteDiveId !== null) {
    const updatedDivedata = divingdata.filter((dive) => dive.id !== deleteDiveId);
    setdivingdata(updatedDivedata );
    localStorage.setItem("Divingdata", JSON.stringify(updatedDivedata ));
    setShowDeleteModal(false);
  }
  console.log(`Deleting dive with ID: ${deleteDiveId}`);
  setDeleteModalOpen(false);
  setDeleteDiveId(null);
};

  const handleSort = (criteria: string) => {
    setSortBy(criteria);
    setSortDropdownOpen(false);
  };

  const handleFilter = (location: string | null) => {
    setFilterByLocation(location ?? "");
    setFilterDropdownOpen(false);
  };

  //sort button
  const filteredDives = divingdata
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
    <div className="fixed top-0 left-0 w-full bg-white z-10 p-4 rounded-t-2xl md:pl-80">
    <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-[#001526] text-center md:text-left mt-2">My Dive</h2>
    </div>
    {/* Controls */}
    <div className="flex items-center justify-between gap-1 md:gap-4 mt-8 flex-nowrap">
      <div className="flex items-center space-x-1">
        <Image width={20} height={20}
          src="/leftarrow.svg"
          alt="Left Arrow"
          className="w-4 md:w-7 lg:w-8 h-5 sm:h-6 md:h-7 lg:h-8 cursor-pointer sm: -ml-1 lg:ml-5 mt-7"
        />
        <Image width={20} height={20}
          src="/rightarrow.svg"
          alt="Right Arrow"
          className="w-4 md:w-7 lg:w-8 h-5 sm:h-6 md:h-7 lg:h-8 cursor-pointer sm: -ml-1 lg:ml-5 mt-7"
        />
        <button
          onClick={() => router.push("/dashboard/DiveManagement/add")}
          className="flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 text-xs md:sm font-medium text-white bg-[#001526] rounded-full shadow-md transition duration-200 w-8 md:w-12 lg:w-36 h-6 md:h-10 lg:h-12 mt-7"
        >
          <Image width={20} height={20} 
          src="/plus.svg"
          alt="Plus"
          className="w-10 md:w-5 lg:w-3 h-10 md:h-5 lg:h-3 -mt-0.5"
          />
          <span className="text-xs md:text-base lg:text-lg sm: ml-2 md:-ml-0.5 lg:-ml-1 hidden lg:inline">New Dive</span> 
        </button>
      </div>

        {/* Search */}
        <div className="flex items-center gap-8 mt-7 -ml-10">
        <div className="relative group">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="relative flex items-center border border-[#001526] placeholder-[#001526] bg-white text-black rounded-full 
            w-20 md:w-32 lg:w-70 h-7 md:h-12 lg:h-12 pl-4 pr-10 text-xs sm:text-base 
            focus:ring-2 focus:ring-black focus:border-blue-500 
            ml-auto transition-all duration-300 ease-in-out 
            group-hover:w-40 group-focus-within:w-60 md:group-hover:w-60 md:group-focus-within:w-80 "
          aria-label="Search certificate"
        />
        <Image width={20} height={20} 
          /*className="relative flex items-center border border-[#001526] placeholder-[#001526] bg-white text-black rounded-full w-20 md:w-32 lg:w-70 h-6 md:h-10 lg:h-12 pl-4 pr-10 text-xs sm:text-base focus:ring-2 focus:ring-black focus:border-blue-500 ml-auto transition-all duration-300 ease-in-out group-hover:w-40 group-focus-within:w-60 md:group-hover:w-60 md:group-focus-within:w-80"
          aria-label="Search certificate"*/
          src="/search.svg" 
          alt="Search" 
            className="absolute right-2 lg:right-5 top-1/2 transform -translate-y-1/2 
          w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6"
        />
      </div>

  
        {/* Sort Dropdown */}
        <div className="relative sm: -mr-7 lg:-mr-6">
            <button
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="bg-[#001526] text-white w-8 md:w-14 lg:w-24 h-6 md:h-12 lg:h-54 rounded-full flex items-center justify-center gap-2 text-xs md:text-sm lg:text-lg sm: -ml-7 lg:-ml-6"
            >
              <Image width={20} height={20} src="/sort.svg" alt="Sort button" className="w-3 md:w-5 lg:w-7 h-3 md:h-5 lg:h-6" />
              <span className="hidden lg:inline">Sort</span>
            </button>
            {sortDropdownOpen && (
              <div className="absolute right-20 mt-2 p-1 bg-white shadow-lg rounded-lg z-50">
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
              className="bg-[#001526] text-white w-8 md:w-14 lg:w-24 h-6 md:h-12 lg:h-54 rounded-full flex items-center justify-center gap-2 text-xs md:text-sm lg:text-lg sm: -mr-2 lg:mr-10"
            >
              <Image width={20} height={20} src="/filter.svg" alt="Filter button" className="w-3 md:w-5 lg:w-7 h-3 md:h-5 lg:h-6" />
              <span className="hidden lg:inline">Filter</span>
            </button>
            {filterDropdownOpen && (
              <div className="absolute right-0 mt-2 p-1 bg-white shadow-lg rounded-lg z-50">
                <button
                  onClick={() => handleFilter(null)}
                  className="block text-left px-4 py-2 text-[#001526] rounded-lg hover:bg-[#001526] hover:text-white hover: w-[110px] mx-auto"
                >
                  All
                </button>
                {Array.from(new Set(divingdata.map((d) => d.location))).map(
                  (loc) => (
                    <button
                      key={loc}
                      onClick={() => handleFilter(loc)}
                      className="block text-left px-2 py-2 text-[#001526] rounded-lg hover:bg-[#001526] hover:text-white w-[110px] mx-auto"
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
          <div className="w-full lg:w-[500px] h-full flex">
  <Image width={20} height={20}
    src={dive.image}
    alt={dive.title}
    className="w-full h-full object-cover rounded-t-3xl lg:rounded-3xl"
  />
</div>
  
          {/* Content Section */}
          <div className="flex-1 p-5 w-full text-center lg:text-left">
            <h2 className="text-2xl lg:text-4xl font-bold text-white">{dive.title}</h2>
  
            <div className="flex flex-wrap justify-center lg:justify-start mt-2 gap-2">
              <Image width={20} height={20} src="/location.svg" alt="Location Icon" className="w-6 h-6" />
              <p className="text-white font-bold text-lg lg:text-xl">{dive.location}</p>
            </div>
  
            <div className="flex flex-wrap justify-center lg:justify-start mt-3 gap-2">
              <Image width={20} height={20} src="/calendar.svg" alt="Date Icon" className="w-6 h-6" />
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
              <span className="font-bold text-5xl lg:text-7xl mt-10 p-2 font-sans">
                {dive.time}
                <span className="text-lg lg:text-2xl font-bold">MIN</span>
              </span>
              <span className="text-lg lg:text-xl font-sans">Dive Time</span>
            </div>
            </div>

          </div>

            {/* Dropdown Button */}
            <div className="absolute top-4 right-5">
                <button
                  onClick={() =>
                    setDropdownIndex(dropdownIndex === index ? null : index)
                  }
                  className="text-2xl font-bold cursor-pointer text-white"
                >
                  ...
                </button>

          
            {dropdownIndex === index && (
              <div className="absolute top-10 right-0 bg-white shadow-md rounded-lg p-2 w-28">
                <Link href={`/dashboard/DiveManagement/id${dive.id}`}>
                  <button className="block w-full px-3 py-3 rounded-lg text-[#001526] hover:bg-[#2C7DA0] hover:bg-opacity-50">
                    Update
                  </button>
                </Link>
                <button 
                 onClick={() => handleDelete(dive.id)}
                 className="block w-full px-4 py-3 rounded-lg text-[#001526] hover:bg-[#2C7DA0] hover:bg-opacity-50">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>

     {/* Delete Confirmation Modal */}
     {deleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-[#D9E7EC] p-6 rounded-3xl shadow-lg w-[680px] h-[600px] text-center">
                  <div className="flex justify-center mb-4">
                    <Image width={20} height={20} src="/trash-delete.svg" alt="Delete" className="w-50 h-50 mt-40" />
                  </div>
                  <h2 className="text-5xl font-bold text-[#001526] mt-10">Delete Dive?</h2>
                  <p className="text-xl font-semibold text-gray-600 mt-4">
                    This action cannot be undone.
                  </p>
      
                  <div className="mt-20 flex justify-center space-x-4">
                    <button
                      onClick={() =>  setDeleteModalOpen(false)}
                      className="w-48 h-14 border-[#001526] border-2 rounded-full font-semibold text-[#001526] hover:bg-[#001526] hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="w-48 h-14 border-[#001526] border-2 rounded-full font-semibold text-[#001526] hover:bg-[#001526] hover:text-white"
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

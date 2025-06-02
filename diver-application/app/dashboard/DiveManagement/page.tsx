"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState} from "react";
import { FaPlus } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { TbSortAscending2 } from "react-icons/tb";
import { HiOutlineFilter } from "react-icons/hi";
import { FaEllipsisV } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaRegCalendar } from "react-icons/fa6";
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
  const [searchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("");
  const [filterByLocation, setFilterByLocation] = useState<string>("");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteDiveId, setDeleteDiveId] = useState<number | null>(null);
  const [divingdata, setdivingdata] = useState<diveData[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const recordsPerPage = 3; // Maximum records per page

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
      setdivingdata(updatedDivedata);
      localStorage.setItem("Divingdata", JSON.stringify(updatedDivedata));
    }
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

  // Pagination logic
  const totalPages = Math.ceil(filteredDives.length / recordsPerPage);
  const paginatedDives = filteredDives.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex-1 p-5 pt-2 relative">
    {/* Header Section */}
    <div className="fixed top-0 left-0 w-full bg-white z-10 p-4 rounded-t-2xl md:pl-80">
      <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-[#001526] text-center md:text-left mt-2">My Dive</h2>
    </div>

    {/* Controls */}
    <div className="flex items-center justify-between gap-4 mt-14 flex-nowrap">
        {/* Navigation Arrows and Add Button */}
        <div className="flex items-center gap-2">
          <IoIosArrowBack
            size={24}
            className={`w-4 md:w-7 lg:w-8 h-5 sm:h-6 md:h-7 lg:h-8 cursor-pointer -ml-3 -mt-1 text-[#001526] ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePreviousPage}
            aria-hidden="true"
          />
          <IoIosArrowForward
            size={24}
            className={`w-4 md:w-7 lg:w-8 h-5 sm:h-6 md:h-7 lg:h-8 cursor-pointer -ml-3 -mt-1 text-[#001526] ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNextPage}
            aria-hidden="true"
          />
          <button
            onClick={() => router.push("/dashboard/DiveManagement/add")}
            className="flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 text-xs md:sm font-medium text-white bg-[#001526] rounded-full shadow-md transition duration-200 w-10 md:w-16 lg:w-52 h-6 md:h-12 lg:h-12"
            aria-label="Add new dive"
          >
            <FaPlus size={30} className="w-3 md:w-4 lg:w-5 h-3 md:h-4 lg:h-3.5 -mt-0.95" />
            <span className="text-xs md:text-base lg:text-lg sm: ml-0.5 md:-ml-0.5 lg:-ml-1 hidden lg:inline">
              New Dive
            </span>
          </button>
        </div>

      {/* Search, Sort, and Filter */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative w-20 md:w-32 lg:w-70 h-7 md:h-12 lg:h-12">
          <input
            type="text"
            placeholder="Search"
            className="absolute right-0 top-0 border border-[#001526] placeholder-[#001526] bg-white text-black rounded-full 
      h-full pl-4 pr-10 text-xs sm:text-base 
      focus:ring-2 focus:ring-black focus:border-blue-500 
      transition-all duration-300 ease-in-out 
      w-20 md:w-32 lg:w-70 
      hover:w-40 focus-within:w-60 md:hover:w-60 md:focus-within:w-80 z-10"
            aria-label="Search certificate"
          />
          <IoSearch
            size={20}
            className="absolute right-2 lg:right-5 top-1/2 transform -translate-y-1/2 
      w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-[#001526] z-20"
            aria-hidden="true"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
            className="bg-[#001526] text-white w-10 md:w-16 lg:w-28 h-7 md:h-12 lg:h-12 rounded-full flex items-center justify-center gap-2 text-xs md:text-sm lg:text-lg"
            aria-label="Sort dives"
          >
            <TbSortAscending2
              size={20}
              className="w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7"
              aria-hidden="true"
            />
            <span className="hidden lg:inline">Sort</span>
          </button>
          {sortDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg z-50">
              {["date", "time", "depth"].map((criteria) => (
                <button
                  key={criteria}
                  onClick={() => handleSort(criteria)}
                  className="block w-28 text-left px-7 py-3 rounded-lg text-medium text-[#001526] hover:bg-[#001526] hover:bg-opacity-40 mx-auto"
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
            className="bg-[#001526] text-white w-10 md:w-16 lg:w-28 h-7 md:h-12 lg:h-12 rounded-full flex items-center justify-center gap-2 text-xs md:text-sm lg:text-lg"
            aria-label="Filter dives"
          >
            <HiOutlineFilter
              size={20}
              className="w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7"
              aria-hidden="true"
            />
            <span className="hidden lg:inline">Filter</span>
          </button>
          {filterDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg z-50">
              <button
                onClick={() => handleFilter(null)}
                className="block w-24 text-left px-7 py-2 rounded-lg text-medium text-[#001526] hover:bg-[#001526] hover:bg-opacity-50 mx-auto"
              >
                All
              </button>
              {Array.from(new Set(divingdata.map((d) => d.location))).map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleFilter(loc)}
                  className="block w-24 text-left px-7 py-2 rounded-lg text-medium text-[#001526] hover:bg-[#001526] hover:bg-opacity-50 mx-auto"
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Dive List */}
    <div className="mt-6 flex flex-col items-center">
      <div className="w-full max-w-[1200px] mx-auto overflow-hidden">
        {paginatedDives.length === 0 ? (
          <div className="flex items-center justify-center w-full min-h-[65vh] text-center">
            <div>
              <Image
                src="/images/my_dive_empty.svg"
                alt="No Dives"
                width={340}
                height={170}
                className="mx-auto"
              />
              <p className="text-2xl sm:text-4xl font-bold text-[#001526] mt-5">
                No Dives Yet
              </p>
              <p className="text-lg sm:text-xl text-[#001526] mt-6">
                You haven&apos;t added any dives.
              </p>
              <p className="text-lg sm:text-xl text-[#001526] mt-1">
                Start tracking your dives here!
              </p>
            </div>
          </div>
        ) : (
          paginatedDives.map((dive, index) => (
            <div
              key={index}
              className="w-[330px] sm:w-[95%] md:w-[90%] lg:w-full min-h-[220px] mb-5 rounded-3xl shadow-md bg-[#2C7DA0] flex flex-col lg:flex-row md:items-center items-center relative overflow-hidden mx-auto"
            >
              {/* Image Section */}
              <div className="w-full lg:w-[490px] h-[330px] flex">
                <Image
                  width={250}
                  height={200}
                  src={dive.image}
                  alt={dive.title}
                  className="w-full h-full object-cover rounded-t-3xl lg:rounded-3xl"
                />
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6 w-full text-center lg:text-left min-w-0 ">
                <h2 className="text-lg lg:text-2xl font-bold text-white truncate">{dive.title}</h2>

                <div className="flex flex-wrap justify-center lg:justify-start mt-1 gap-2">
                  <FaMapLocationDot className="w-5 h-5 text-white" />
                  <p className="text-white font-bold text-sm lg:text-md truncate">{dive.location}</p>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start mt-1 gap-2">
                  <FaRegCalendar className="w-5 h-5 text-white" />
                  <p className="text-white text-sm lg:text-md truncate">
                    {new Date(dive.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="space-y-4 mt-4">
                  <p className="text-white text-sm lg:text-md whitespace-pre-line">
                    {dive.notes}
                    </p>
                    <p className="text-white text-sm lg:text-md whitespace-pre-line">
                      {dive.description}
                      </p>
                      </div>

                {/* Dive Depth and Time */}
                <div className="flex flex-col md:flex-row justify-center items-center mt-4 text-white gap-6">
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-xl lg:text-2xl">
                      {dive.depth}
                      <span className="text-sm lg:text-md font-bold"> M</span>
                    </span>
                    <span className="text-sm lg:text-md">Dive Depth</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-xl lg:text-2xl">
                      {dive.time}
                      <span className="text-sm lg:text-md font-bold"> MIN</span>
                    </span>
                    <span className="text-sm lg:text-md">Dive Time</span>
                  </div>
                </div>
              </div>

              {/* Dropdown Button */}
              <div className="absolute top-[1.75rem] right-[1.5rem]">
                <button
                  onClick={() =>
                    setDropdownIndex(dropdownIndex === index ? null : index)
                  }
                  className="text-1xl font-bold cursor-pointer text-white"
                >
                  <FaEllipsisV />
                </button>

                {dropdownIndex === index && (
                  <div className="absolute top-0 right-5 bg-white shadow-md rounded-lg p-2 w-28">
                    <Link href={`/dashboard/DiveManagement/id`}>
                      <button className="block w-full px-3 py-3 rounded-lg text-[#001526] hover:bg-[#2C7DA0] hover:bg-opacity-50">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(dive.id)}
                      className="block w-full px-4 py-3 rounded-lg text-[#001526] hover:bg-[#2C7DA0] hover:bg-opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>

     {/* Delete Confirmation Modal */}
     {deleteModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#D9E7EC] p-8 w-11/12 sm:w-[480px] h-auto sm:h-[450px] rounded-2xl shadow-lg flex flex-col justify-center items-center">
          <div className="flex justify-center mb-4">
            <GoTrash className="text-[#001526] w-24 h-24 mt-3" />
          </div>
          <h2 className="text-3xl font-bold mb-6 text-center text-[#001526]">
            Delete Dive?
          </h2>
          <p className="font-semibold text-center text-[#001526] mb-5 text-[15px]">
            This action cannot be undone.
          </p>
          <div className="flex justify-center mt-5">
            <button
              className="mr-2 w-36 px-5 py-3 bg-[#D9E7EC] text-[#001526] border border-[#001526] rounded-full text-[16px] font-semibold"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="ml-2 w-36 px-5 py-3 bg-[#001526] text-white rounded-full text-[16px] font-semibold"
              onClick={confirmDelete}
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

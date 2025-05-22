"use client";

import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { TbSortAscending2 } from "react-icons/tb";
import { HiOutlineFilter } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoTrash } from "react-icons/go";

const records = [
  { userId: "ML0001", name: "John Doe", age: 29, gender: "Male", status: "Pending" },
  { userId: "ML0002", name: "Adie Eugenio", age: 34, gender: "Female", status: "Verified" },
  { userId: "ML0003", name: "Chris Brown", age: 41, gender: "Male", status: "Declined" },
  { userId: "ML0004", name: "Bella Edward", age: 25, gender: "Female", status: "Pending" },
  { userId: "ML0005", name: "Princess Ong", age: 37, gender: "Male", status: "Verified" },
  { userId: "ML0006", name: "Gray Yeon", age: 29, gender: "Male", status: "Pending" },
  { userId: "ML0007", name: "Ahn Suho", age: 34, gender: "Female", status: "Verified" },
  { userId: "ML0008", name: "Juan Dela Cruz", age: 41, gender: "Male", status: "Declined" },
  { userId: "ML0009", name: "Jay Marc", age: 25, gender: "Female", status: "Pending" },
  { userId: "ML0010", name: "Althea Sardana", age: 37, gender: "Male", status: "Verified" },
  { userId: "ML0011", name: "Ava Max", age: 37, gender: "Male", status: "Verified" },
];

export default function MedicalManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [dropdownRecord, setDropdownRecord] = useState<number | null>(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [recordList, setRecordList] = useState(records);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const recordsPerPage = 10;
  const totalPages = Math.ceil(recordList.length / recordsPerPage);

  const handleView = (record: any) => {
    localStorage.setItem("selectedMedicalRecord", JSON.stringify(record));
    window.location.href = "/Admin-Dashboard/MedicalManagement/View";
  };

  useEffect(() => {
    setSelectedRows([]);
    setSelectAll(false);
  }, [currentPage, recordList]);

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

  const currentPageRecords = recordList.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      const globalIndices = currentPageRecords.map(
        (_, index) => (currentPage - 1) * recordsPerPage + index
      );
      setSelectedRows(globalIndices);
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (index: number) => {
    const globalIndex = (currentPage - 1) * recordsPerPage + index;
    if (selectedRows.includes(globalIndex)) {
      setSelectedRows(selectedRows.filter((row) => row !== globalIndex));
    } else {
      setSelectedRows([...selectedRows, globalIndex]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-[#FFD300] text-[#001526]";
      case "Declined":
        return "bg-[#CF0C0F] text-white";
      case "Verified":
        return "bg-[#3BB143] text-[#001526]";
      default:
        return "bg-gray-300 text-[#001526]";
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const remainingRecords = recordList.filter(
      (_, index) => !selectedRows.includes(index)
    );
    setRecordList(remainingRecords);
    setSelectedRows([]);
    setSelectAll(false);
    setCurrentPage(1);
    setShowDeleteModal(false);
  };

  const handleDeleteFromDropdown = (index: number) => {
    const globalIndex = (currentPage - 1) * recordsPerPage + index;
    setSelectedRows([globalIndex]);
    setShowDeleteModal(true);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-10 p-4 rounded-t-2xl md:pl-80">
        <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-white text-center md:text-left mt-2">
          Medical Records
        </h2>

        <div className="-mt-7 p-5 min-h-[60vh] mr-0 md:mr-2">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-12">
            {/* Navigation Arrows and Delete Button */}
            <div className="flex items-center gap-2">
              <IoIosArrowBack
                size={24}
                className={`cursor-pointer text-white ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={handlePreviousPage}
                aria-hidden="true"
              />
              <IoIosArrowForward
                size={24}
                className={`cursor-pointer text-white ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={handleNextPage}
                aria-hidden="true"
              />
              <button
                className={`bg-[#CF0C0F] text-[#FFFFFF] text-xs sm:text-base px-3 py-2 w-20 md:px-3 md:py-2 md:w-28 rounded-full font-semibold flex items-center justify-center gap-2 ${selectedRows.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={handleDelete}
                disabled={selectedRows.length === 0}
                aria-label="Delete selected records"
              >
                <span>Delete</span>
              </button>
            </div>

            {/* Search, Sort, and Filter */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative group">
                <IoSearch
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#001526] z-10"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 rounded-full bg-white border border-[#001526] text-[#001526] font-medium placeholder-[#001526] focus:ring-2 focus:ring-[#001526] focus:border-blue-500 transition-all duration-300 ease-in-out text-xs sm:text-base w-20 sm:w-32 lg:w-70 sm:hover:w-60 sm:focus-within:w-80"
                  aria-label="Search"
                />
              </div>

              {/* Sort Dropdown */}
              <button
                className="bg-white text-[#001526] text-xs sm:text-base px-3 py-2 w-10 md:px-4 md:py-2 md:w-28 rounded-full font-semibold flex items-center gap-2"
                aria-label="Sort records"
              >
                <TbSortAscending2 className="w-4 sm:w-5 lg:w-7 h-4 sm:h-5 lg:h-5" />
                <span className="hidden lg:inline">Sort</span>
              </button>

              {/* Filter Dropdown */}
              <button
                className="bg-white text-[#001526] text-xs sm:text-base px-3 py-2 w-10 md:px-4 md:py-2 md:w-28 rounded-full font-semibold flex items-center gap-2"
                aria-label="Filter records"
              >
                <HiOutlineFilter className="w-4 sm:w-5 lg:w-7 h-4 sm:h-5 lg:h-5" />
                <span className="hidden lg:inline">Filter</span>
              </button>
            </div>
          </div>

          {/* User Table */}
          <div className="rounded-3xl overflow-hidden mt-7 bg-[#D9E7EC] shadow-md min-h-[77vh]">
            {currentPageRecords.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[77vh]">
                <p className="text-[#001526] font-semibold text-lg">
                  No medical records found.
                </p>
              </div>
            ) : (
              <div
                className="overflow-x-auto overflow-y-auto max-h-[78vh] sm:max-h-[70vh] lg:max-h-[77vh] pb-2"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#001526 #D9E7EC",
                  position: "relative",
                  minHeight: "500px",
                }}
              >
                <table className="w-full text-center text-[#001526] mt-1 table-auto">
                  <thead className="bg-[#D9E7EC] border-b-2 border-gray-400">
                    <tr>
                      <th className="pl-8 sm:pb-3 sm:pl-12 pr-0 py-4 w-8 sm:w-12 text-left">
                        <input
                          type="checkbox"
                          className={`appearance-none w-4 h-4 border-2 rounded-full ${selectAll
                              ? "bg-[#001526] border-[#001526]"
                              : "bg-[#D9E7EC] border-[#001526]"
                            } focus:ring-2 focus:ring-[#001526] transition-colors`}
                          aria-label="Select all"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </th>
                      {["User ID", "Name", "Age", "Gender", "Status", ""].map(
                        (head, idx) => (
                          <th
                            key={idx}
                            className="px-2 py-7 font-semibold text-sm sm:text-base whitespace-nowrap"
                          >
                            {head}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-[#D9E7EC] text-[#001526]">
                    {currentPageRecords.map((record, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-300 hover:bg-[#cfe5ee] transition"
                      >
                        <td className="pl-8 sm:pb-3 sm:pl-12 pr-0 py-4 w-8 sm:w-12 text-left">
                          <input
                            type="checkbox"
                            className={`appearance-none w-4 h-4 border-2 rounded-full ${selectedRows.includes(
                              (currentPage - 1) * recordsPerPage + index
                            )
                                ? "bg-[#001526] border-[#001526]"
                                : "bg-[#D9E7EC] border-[#001526]"
                              } focus:ring-2 focus:ring-[#001526] transition-colors`}
                            aria-label={`Select row ${index + 1}`}
                            checked={selectedRows.includes(
                              (currentPage - 1) * recordsPerPage + index
                            )}
                            onChange={() => handleRowSelect(index)}
                          />
                        </td>
                        <td className="px-6 sm:px-8 py-4 text-sm sm:text-base">
                          {record.userId}
                        </td>
                        <td className="px-2 sm:px-6 py-4 text-xs sm:text-base">
                          {record.name}
                        </td>
                        <td className="px-2 sm:px-8 py-4 text-xs sm:text-base">
                          {record.age}
                        </td>
                        <td className="px-2 sm:px-6 py-4 text-xs sm:text-base">
                          {record.gender}
                        </td>
                        <td className="px-2 sm:px-0 py-4 text-xs sm:text-base">
                          <span
                            className={`px-2 py-1 md:px-10 md:py-[6px] rounded-full font-semibold ${getStatusColor(
                              record.status
                            )}`}
                          >
                            {record.status}
                          </span>
                        </td>
                        <td className="py-3 relative">
                          <button
                            onClick={() =>
                              setDropdownRecord(
                                dropdownRecord === index ? null : index
                              )
                            }
                            className="bg-[#D9E7EC] text-[#001526] font-semibold w-10 h-10 flex justify-center items-center rounded-2xl hover:opacity-90 transition"
                          >
                            <BsThreeDotsVertical size={16} />
                          </button>

                          {dropdownRecord === index && (
                            <div className="absolute right-8 mr-7 mt-3 w-36 top-5 bg-[#2C7DA0] text-white font-medium rounded-xl p-2 z-20">
                              <button
                                className="block w-full text-sm text-center px-4 py-1 md-1 rounded-lg hover:bg-[#D9E7EC] hover:text-[#001526] transition"
                                onClick={() => handleView(record)}
                              >
                                View
                              </button>
                              <button
                                className="block w-full text-sm text-center px-4 py-1 md-1 rounded-lg hover:bg-[#D9E7EC] hover:text-[#001526] transition"
                                onClick={() => handleDeleteFromDropdown(index)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#D9E7EC] p-8 w-11/12 sm:w-[480px] h-auto sm:h-[450px] rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <div className="flex justify-center mb-4">
              <GoTrash className="text-[#001526] w-24 h-24 mt-3" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-center text-[#001526]">
              Delete {selectedRows.length}{" "}
              {selectedRows.length === 1 ? "Record" : "Records"}?
            </h2>
            <p className="font-semibold text-center text-[#001526] mb-5 text-[15px]">
              Are you sure you want to delete? <br />
              This action cannot be undone.
            </p>
            <div className="flex justify-center mt-5">
              <button
                className="mr-2 w-36 px-5 py-3 bg-[#D9E7EC] text-[#001526] border border-[#001526] rounded-full text-[16px] font-semibold"
                onClick={() => setShowDeleteModal(false)}
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
    </>
  );
}
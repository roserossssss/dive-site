"use client";

import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDown, MoreVertical } from "lucide-react";
import { IoSearch } from "react-icons/io5";
import { TbSortAscending2 } from "react-icons/tb";
import { HiOutlineFilter } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import DeleteConfirmationModal from "./DeleteConfirmationModal";
import StatusChangeModal from "./StatusChangeModal";

const initialCertificates = [
   {
     userId: "ML00001", certification: "Open Water Diver", level: "Beginner", agency: "PADI", dateIssued: "2025-01-15", status: "Pending",
   },
   {
     userId: "ML00002", certification: "Advanced Open Water Diver", level: "Intermediate", agency: "NAUI", dateIssued: "2025-02-10", status: "Approve",
   },
   {
     userId: "ML00003", certification: "Rescue Diver", level: "Advanced", agency: "SSI", dateIssued: "2025-03-05", status: "Decline",
   },
	   {
     userId: "ML00004", certification: "Open Water Diver", level: "Beginner", agency: "PADI", dateIssued: "2025-01-15", status: "Pending",
   },
   {
     userId: "ML00005", certification: "Advanced Open Water Diver", level: "Intermediate", agency: "NAUI", dateIssued: "2025-02-10", status: "Approve",
   },
   {
     userId: "ML00006", certification: "Rescue Diver", level: "Advanced", agency: "SSI", dateIssued: "2025-03-05", status: "Decline",
   },
	   {
     userId: "ML00007", certification: "Open Water Diver", level: "Beginner", agency: "PADI", dateIssued: "2025-01-15", status: "Pending",
   },
   {
     userId: "ML00008", certification: "Advanced Open Water Diver", level: "Intermediate", agency: "NAUI", dateIssued: "2025-02-10", status: "Approve",
   },
   {
     userId: "ML00009", certification: "Rescue Diver", level: "Advanced", agency: "SSI", dateIssued: "2025-03-05", status: "Decline",
   },
	   {
     userId: "ML00010", certification: "Advanced Open Water Diver", level: "Intermediate", agency: "NAUI", dateIssued: "2025-02-10", status: "Approve",
   },
   {
     userId: "ML00011", certification: "Rescue Diver", level: "Advanced", agency: "SSI", dateIssued: "2025-03-05", status: "Decline",
   },
];

const statuses = ["Approve", "Pending", "Decline"];

export default function CertificateManagement() {
  const [certificates, setCertificates] = useState(initialCertificates);
  const [selectedCertificates, setSelectedCertificates] = useState<number[]>([]);
  const [dropdownCertificate, setDropdownCertificate] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<number | null>(null);

  const [showStatusChangeModal, setShowStatusChangeModal] = useState(false);
  const [statusToChange, setStatusToChange] = useState<string | null>(null);
  const [recordToChangeStatus, setRecordToChangeStatus] = useState<number | null>(null);

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewedCertificate, setViewedCertificate] = useState<string | null>(null);
	
  const itemsPerPage = 10;

  const handleStatusChange = (index: number, newStatus: string) => {
    setCertificates((prev) =>
      prev.map((cert, i) =>
        i === index ? { ...cert, status: newStatus } : cert
      )
    );
    setShowStatusChangeModal(false);
    setRecordToChangeStatus(null);
    setStatusToChange(null);
  };

  const handleDelete = () => {
    if (recordToDelete !== null) {
      // Delete a single record
      setCertificates((prev) => prev.filter((_, i) => i !== recordToDelete));
    } else {
      // Bulk delete
      setCertificates((prev) => prev.filter((_, i) => !selectedCertificates.includes(i)));
    }
    setSelectedCertificates([]);
    setRecordToDelete(null);
    setShowDeleteModal(false);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

	const toggleSelectAll = () => {
		if (selectedCertificates.length === paginatedCertificates.length) {
			setSelectedCertificates([]); // Unselect all
		} else {
			const globalIndices = paginatedCertificates.map((_, index) => 
				(currentPage - 1) * itemsPerPage + index
			);
			setSelectedCertificates(globalIndices); // Select all
		}
	};

	const toggleSelectCertificate = (index: number) => {
		const globalIndex = (currentPage - 1) * itemsPerPage + index;
		if (selectedCertificates.includes(globalIndex)) {
			setSelectedCertificates(selectedCertificates.filter((row) => row !== globalIndex)); // Unselect
		} else {
			setSelectedCertificates([...selectedCertificates, globalIndex]); // Select
		}
	};

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certification.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.dateIssued.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage);
  const paginatedCertificates = filteredCertificates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
  <>
    <div className="fixed top-0 left-0 w-full z-10 p-4 rounded-t-2xl md:pl-80">
      <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-white text-center md:text-left mt-2">
        Certification Management
      </h2>

      <div className="-mt-7 p-5 min-h-[60vh] mr-0 md:mr-2">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-12">
          {/* Navigation Arrows and Delete Button */}
          <div className="flex items-center gap-2">
            <IoIosArrowBack
              size={24}
              className={`cursor-pointer text-white ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePreviousPage}
              aria-hidden="true"
            />
            <IoIosArrowForward
              size={24}
              className={`cursor-pointer text-white ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleNextPage}
              aria-hidden="true"
            />
            <button
              className={`bg-[#CF0C0F] text-[#FFFFFF] text-xs sm:text-base px-3 py-2 w-20 md:px-3 md:py-2 md:w-28 rounded-full font-semibold flex items-center justify-center gap-2 ${
                selectedCertificates.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => setShowDeleteModal(true)}
              disabled={selectedCertificates.length === 0}
              aria-label="Delete selected certificates"
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full bg-white border border-[#001526] text-[#001526] font-medium placeholder-[#001526] focus:ring-2 focus:ring-[#001526] focus:border-blue-500 transition-all duration-300 ease-in-out text-xs sm:text-base w-20 sm:w-32 lg:w-70 sm:hover:w-60 sm:focus-within:w-80"
                aria-label="Search"
              />
            </div>

            {/* Sort Dropdown */}
            <button
              className="bg-white text-[#001526] text-xs sm:text-base px-3 py-2 w-10 md:px-4 md:py-2 md:w-28 rounded-full font-semibold flex items-center gap-2"
              aria-label="Sort certificates"
            >
              <TbSortAscending2 className="w-4 sm:w-5 lg:w-7 h-4 sm:h-5 lg:h-5" />
              <span className="hidden lg:inline">Sort</span>
            </button>

            {/* Filter Dropdown */}
            <button
              className="bg-white text-[#001526] text-xs sm:text-base px-3 py-2 w-10 md:px-4 md:py-2 md:w-28 rounded-full font-semibold flex items-center gap-2"
              aria-label="Filter certificates"
            >
              <HiOutlineFilter className="w-4 sm:w-5 lg:w-7 h-4 sm:h-5 lg:h-5" />
              <span className="hidden lg:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* User Table */}
        <div className="rounded-3xl overflow-hidden mt-7 bg-[#D9E7EC] shadow-md min-h-[77vh]">
          {paginatedCertificates.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[77vh]">
              <img
                src="/images/empty_table_logo.svg"
                alt="No Records"
                className="mx-auto w-32 sm:w-56 h-32 sm:h-56"
              />
              <p className="text-[#001526] font-semibold text-lg">
                No certificates found.
              </p>
            </div>
          ) : (
            <div
              className="overflow-x-auto overflow-y-auto max-h-[78vh] sm:max-h-[70vh] lg:max-h-[77vh] pb-2"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#001526 #D9E7EC", position: "relative", minHeight: "500px",  }}
            >
              <table className="w-full text-center text-[#001526] mt-1 table-auto">
                <thead className="bg-[#D9E7EC] border-b-2 border-gray-400">
                  <tr>
                    <th className="pl-8 sm:pb-3 sm:pl-10 pr-0 py-4 w-8 sm:w-12 text-left">
                      <input
                        type="checkbox"
                        className={`appearance-none w-4 h-4 border-2 rounded-full ${
                          selectedCertificates.length === paginatedCertificates.length
                            ? "bg-[#001526] border-[#001526]" // Selected state
                            : "bg-[#D9E7EC] border-[#001526]" // Unselected state
                        } focus:ring-2 focus:ring-[#001526] transition-colors`}
                        aria-label="Select all"
                        checked={selectedCertificates.length === paginatedCertificates.length}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    {["User ID", "Certification", "Level", "Agency", "Date Issued", "Status", ""].map(
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
                  {paginatedCertificates.map((cert, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-300 hover:bg-[#cfe5ee] transition"
                    >
                      <td className="pl-8 sm:pb-3 sm:pl-10 pr-0 py-4 w-8 sm:w-12 text-left">
                        <input
                          type="checkbox"
                          className={`appearance-none w-4 h-4 border-2 rounded-full ${
                            selectedCertificates.includes(
                              (currentPage - 1) * itemsPerPage + index
                            )
                              ? "bg-[#001526] border-[#001526]" // Selected state
                              : "bg-[#D9E7EC] border-[#001526]" // Unselected state
                          } focus:ring-2 focus:ring-[#001526] transition-colors`}
                          aria-label={`Select row ${index + 1}`}
                          checked={selectedCertificates.includes(
                            (currentPage - 1) * itemsPerPage + index
                          )}
                          onChange={() => toggleSelectCertificate(index)}
                        />
                      </td>
                      <td className="px-6 sm:px-8 py-4 text-sm sm:text-base">{cert.userId}</td>
                      <td className="px-2 sm:px-6 py-4 text-xs sm:text-base">{cert.certification}</td>
                      <td className="px-2 sm:px-6 py-4 text-xs sm:text-base">{cert.level}</td>
                      <td className="px-2 sm:px-6 py-4 text-xs sm:text-base">{cert.agency}</td>
                      <td className="px-2 sm:px-6 py-4 text-xs sm:text-base">{cert.dateIssued}</td>
                      <td className="px-2 sm:px-4 py-4 text-xs sm:text-base">
                        <CustomDropdown
                          items={statuses}
                          selected={cert.status}
                          onChange={(newStatus) => {
                            setRecordToChangeStatus(index);
                            setStatusToChange(newStatus);
                            setShowStatusChangeModal(true);
                          }}
                        />
                      </td>
                      <td className="pr-5 py-3 relative">
                        <button
                          onClick={() =>
                            setDropdownCertificate(dropdownCertificate === index ? null : index)
                          }
                          className="bg-[#D9E7EC] text-[#001526] font-semibold w-10 h-10 flex justify-center items-center rounded-2xl hover:opacity-90 transition"
                        >
                          <MoreVertical size={18} />
                        </button>

                        {dropdownCertificate === index && (
                          <div className="absolute right-8 mr-7 mt-3 w-36 top-5 bg-[#2C7DA0] text-white font-medium rounded-xl p-2 z-20">
                            <button
                              className="block w-full text-sm text-center px-4 py-1 md-1 rounded-lg hover:bg-[#D9E7EC] hover:text-[#001526] transition"
                              onClick={() => {
                                setViewedCertificate("/images/sample_certificate.jpg");
                                setShowViewModal(true);
                              }}
                            >
                              View
                            </button>
                            <button
                              className="block w-full text-sm text-center px-4 py-1 md-1 rounded-lg hover:bg-[#D9E7EC] hover:text-[#001526] transition"
                              onClick={() => {
                                setRecordToDelete(index);
                                setShowDeleteModal(true);
                              }}
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
      <DeleteConfirmationModal
        isVisible={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setRecordToDelete(null);
        }}
        onConfirm={handleDelete}
        recordCount={recordToDelete !== null ? 1 : selectedCertificates.length}
      />

      {/* Status Change Modal */}
      <StatusChangeModal
        isVisible={showStatusChangeModal}
        onClose={() => {
          setShowStatusChangeModal(false);
          setRecordToChangeStatus(null);
          setStatusToChange(null);
        }}
        onConfirm={() => {
          if (recordToChangeStatus !== null && statusToChange) {
            handleStatusChange(recordToChangeStatus, statusToChange);
          }
        }}
        status={statusToChange || ""}
      />

      {/* View Certificate Modal */}
      <ViewCertificateModal
        isVisible={showViewModal}
        onClose={() => setShowViewModal(false)}
        certificateImage={viewedCertificate || ""}
      />
    </>
  );

  function CustomDropdown({
    items,
    selected,
    onChange,
  }: {
    items: string[];
    selected: string;
    onChange: (value: string) => void;
  }) {
    return (
      <Listbox value={selected} onChange={onChange}>
        <div className="relative">
          {/* Dropdown Button */}
          <Listbox.Button
            className={`font-medium w-40 px-6 py-2 rounded-2xl flex justify-between items-center shadow-inner hover:opacity-90 transition ${
              selected === "Approve"
                ? "bg-[#3BB143] text-white"
                : selected === "Pending"
                ? "bg-[#FFD300] text-[#001526]"
                : "bg-[#CF0C0F] text-white"
            }`}
          >
            {selected}
            <ChevronDown size={16} />
          </Listbox.Button>

          {/* Dropdown Options */}
          <Listbox.Options className="absolute left-0 mt-2 w-44 bg-[#A3D4E3] text-[#001526] font-semibold rounded-xl p-2 z-10">
            {items.map((item) => (
              <Listbox.Option key={item} value={item}>
                {({ active, selected }) => (
                  <div
                    className={`p-2 mt-1 rounded-xl cursor-pointer transition-all ${
                      active || selected
                        ? item === "Approve"
                          ? "bg-[#D9E7EC] text-[#001526]"
                          : item === "Pending"
                          ? "bg-[#D9E7EC] text-[#001526]"
                          : "bg-[#D9E7EC] text-[#001526]"
                        : "text-[#001526]"
                    }`}
                  >
                    {item}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    );
  }

  function ViewCertificateModal({
    isVisible,
    onClose,
    certificateImage,
  }: {
    isVisible: boolean;
    onClose: () => void;
    certificateImage: string;
  }) {
    if (!isVisible) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative"
          onClick={(e) => e.stopPropagation()} 
        >
          <img
            src={certificateImage}
            alt="Certificate"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    );
  }
}
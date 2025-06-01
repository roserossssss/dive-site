"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, MoreVertical } from "lucide-react";
import { IoSearch } from "react-icons/io5";
import { TbSortAscending2 } from "react-icons/tb";
import { HiOutlineFilter } from "react-icons/hi";
import { FiTrash2 } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";

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
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
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

  useEffect(() => {
    if (dropdownCertificate === null) return;

    function handleClickOutside(event: MouseEvent) {
      for (let i = 0; i < dropdownRefs.current.length; i++) {
        if (
          dropdownRefs.current[i] &&
          dropdownRefs.current[i]!.contains(event.target as Node)
        ) {
          return;
        }
      }
      setDropdownCertificate(null);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownCertificate]);

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

        <div className="mt-5 p-5 min-h-[60vh] mr-0 md:mr-[0.65rem]">
          {/* Controls */}
          <div className="flex flex-row justify-between gap-4 mb-4 flex-nowrap overflow-x-auto">
            {/* Navigation Arrows and Delete Button */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <IoIosArrowBack
                size={24}
                className={`cursor-pointer text-white w-4 h-4 sm:w-6 sm:h-6 md:w-5 md:h-5 lg:w-6 lg:h-6 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={handlePreviousPage}
                aria-hidden="true"
              />
              <IoIosArrowForward
                size={24}
                className={`cursor-pointer text-white w-4 h-4 sm:w-6 sm:h-6 md:w-5 md:h-5 lg:w-6 lg:h-6 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={handleNextPage}
                aria-hidden="true"
              />
              <button
                className={`text-white text-xs sm:text-base px-6 py-2 w-10 h-8 md:h-10 lg:h-10 sm:-ml-1 md:-ml-0.5 md:px-3 md:py-2 md:w-12 lg:w-28 rounded-full font-semibold flex items-center justify-center gap-2 bg-[#CF0C0F] ${selectedCertificates.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={() => setShowDeleteModal(true)}
                disabled={selectedCertificates.length === 0}
                aria-label="Delete selected certificates"
              >
                <span className="flex items-center gap-2">
                  <FiTrash2 className="w-3 h-3 md:w-4 md:h-4 lg:hidden" />
                  <span className="hidden lg:inline">Delete</span>
                </span>
              </button>
            </div>

            {/* Search, Sort, and Filter */}
            <div className="flex items-center gap-1 flex-nowrap whitespace-nowrap flex-shrink-0">
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
                  className="pl-10 pr-4 py-2 rounded-full bg-white border border-[#001526] text-[#001526] font-medium placeholder-[#001526] focus:ring-2 focus:ring-[#001526] focus:border-blue-500 transition-all duration-300 ease-in-out text-xs sm:text-base w-16 md:w-20 lg:w-72 md:hover:w-38 md:focus-within:w-38 lg:focus-within:w-80"
                  aria-label="Search"
                />
              </div>

        {/* User Table */}
        <div className="rounded-3xl overflow-hidden mt-7 bg-[#D9E7EC] shadow-md min-h-[77vh]">
          {paginatedCertificates.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[77vh]">
              <Image
                src="/images/empty_table_logo.svg"
                alt="No Records"
                width={224}
                height={224}
                className="mx-auto"
              />
              <p className="text-[#001526] font-semibold text-lg">
                No certificates found.
              </p>

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
                style={{ scrollbarWidth: "thin", scrollbarColor: "#001526 #D9E7EC", position: "relative", minHeight: "500px", }}
              >
                <table className="w-full text-center text-[#001526] mt-1 table-auto">
                  <thead className="bg-[#D9E7EC] border-b-2 border-gray-400">
                    <tr>
                      <th className="pl-8 sm:pb-3 sm:pl-10 pr-0 py-4 w-8 sm:w-12 text-left">
                        <input
                          type="checkbox"
                          className={`appearance-none w-4 h-4 border-2 rounded-full ${selectedCertificates.length === paginatedCertificates.length
                              ? "bg-[#001526] border-[#001526]" // Selected state
                              : "bg-[#D9E7EC] border-[#001526]" // Unselected state
                            } focus:ring-2 focus:ring-[#001526] transition-colors`}
                          aria-label="Select all"
                          checked={selectedCertificates.length === paginatedCertificates.length}
                          onChange={toggleSelectAll}
                        />
                      </td>
                      <td className="pr-5 py-3 relative">
                        <div   
                          ref={(el) => {
                            if (dropdownRefs.current[index] !== el) {
                              dropdownRefs.current[index] = el;
                            }
                          }}
                        >
                          <button
                            onClick={() =>
                              setDropdownCertificate(dropdownCertificate === index ? null : index)
                            }
                            className="bg-[#D9E7EC] text-[#001526] font-semibold w-10 h-10 flex justify-center items-center rounded-2xl hover:opacity-90 transition"
                            aria-label={`Options for certificate ${cert.userId}`}
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
                            className={`appearance-none w-4 h-4 border-2 rounded-full ${selectedCertificates.includes(
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
                          <div ref={(el) => (dropdownRefs.current[index] = el)}>
                            <button
                              onClick={() =>
                                setDropdownCertificate(dropdownCertificate === index ? null : index)
                              }
                              className="bg-[#D9E7EC] text-[#001526] font-semibold w-10 h-10 flex justify-center items-center rounded-2xl hover:opacity-90 transition"
                              aria-label={`Options for certificate ${cert.userId}`}
                            >
                              <MoreVertical size={18} />
                            </button>

                            {dropdownCertificate === index && (
                              <div className="absolute right-8 mr-7 mt-1 w-36 top-5 bg-[#2C7DA0] text-white font-medium rounded-xl p-2 z-20">
                                <button
                                  className="block w-full text-sm text-center px-4 py-1 md-1 rounded-lg hover:bg-[#D9E7EC] hover:text-[#001526] transition"
                                  onClick={() => {
                                    setViewedCertificate("/images/sample_certificate.jpg");
                                    setShowViewModal(true);
                                  }}
                                  aria-label={`View certificate for user ${cert.userId}`}
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
                          </div>
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
    onChange?: (value: string) => void;
  }) {
    const [selectedItem, setSelectedItem] = useState(selected);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownStyles, setDropdownStyles] = useState({ top: 0, left: 0, width: 0, direction: "down" });
    const buttonRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!isDropdownOpen) return;

      function handleClickOutside(event: MouseEvent) {
        if (
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsDropdownOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isDropdownOpen]);

    const handleDropdownToggle = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;
        const direction = spaceBelow < 200 && spaceAbove > 150 ? "up" : "down";
        setDropdownStyles({
          top: direction === "down" ? rect.bottom + window.scrollY : rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          direction,
        });
        setIsDropdownOpen(!isDropdownOpen);
      }
    };

    const getSelectedColor = (item: string) => {
      switch (item.toLowerCase()) {
        case "approve":
          return "bg-[#3BB143] text-white font-semibold";
        case "pending":
          return "bg-[#FFD300] text-[#001526] font-semibold";
        case "decline":
          return "bg-[#CF0C0F] text-white font-semibold";
        default:
          return "bg-[#A9D6E5] text-[#001526] font-semibold";
      }
    };

    useEffect(() => {
      setSelectedItem(selected);
    }, [selected]);

    const handleItemClick = (item: string) => {
      setSelectedItem(item);
      setIsDropdownOpen(false);
      if (onChange) {
        onChange(item);
      }
    };

    return (
      <>
        <div className="relative" ref={buttonRef}>
          <button
            className={`font-medium w-40 px-4 py-2 rounded-2xl flex justify-between items-center shadow-inner hover:opacity-90 transition ${getSelectedColor(
              selectedItem
            )}`}
            onClick={handleDropdownToggle}
            type="button"
          >
            {selectedItem}
            <ChevronDown size={16} />
          </button>
        </div>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute bg-[#A3D4E3] text-[#001526] font-semibold rounded-xl p-2 z-50 shadow-lg"
            style={{
              position: "fixed",
              top: dropdownStyles.direction === "down" ? dropdownStyles.top : dropdownStyles.top - 150,
              left: dropdownStyles.left,
              width: dropdownStyles.width,
            }}
          >
            {items.map((item) => (
              <div
                key={item}
                onClick={() => handleItemClick(item)}
                className={`p-2 mt-1 rounded-xl cursor-pointer transition-all ${selectedItem === item ? "bg-[#D9E7EC] text-[#001526]" : "text-[#001526]"
                  }`}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </>
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
          <Image
            src={certificateImage}
            alt="Certificate"
            width={800}
            height={600}
            className="rounded-lg"
          />
        </div>
      </div>
    );
  }
}
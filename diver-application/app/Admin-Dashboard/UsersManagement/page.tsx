"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Listbox } from "@headlessui/react";
import { ChevronDown, MoreVertical } from "lucide-react";
import { IoSearch } from "react-icons/io5";
import { TbSortAscending2 } from "react-icons/tb";
import { HiOutlineFilter } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";

import DeleteConfirmationModal from "./DeleteConfirmationModal";
import StatusChangeModal from "./StatusChangeModal";
import AccountTypeChangeModal from "./AccountTypeChangeModal";

const users = [
  {
    name: "Jay Marc", email: "jaymarc123@gmail.com", accountType: "Diver", status: "Active", lastLogin: "January 25, 2025", avatar: "sample-dive1.jpg",
  },
  {
    name: "Princess Denise Ong", email: "ongdenise234@gmail.com", accountType: "Dive Master", status: "Active", lastLogin: "January 25, 2025", avatar: "sample-dive1.jpg",
  },
  {
    name: "Althea Rose Sardana", email: "rosesardana2610@gmail.com", accountType: "Student Diver", status: "Inactive", lastLogin: "January 25, 2025", avatar: "",
  },
  {
    name: "Juan Dela Cruz", email: "juandelacruz@gmail.com", accountType: "Student Diver", status: "Locked", lastLogin: "January 25, 2025", avatar: "",
  },
  {
    name: "Jay Marc", email: "jaymarc123@gmail.com", accountType: "Diver", status: "Active", lastLogin: "January 25, 2025", avatar: "sample-dive1.jpg",
  },
  {
    name: "Princess Denise Ong", email: "ongdenise234@gmail.com", accountType: "Dive Master", status: "Active", lastLogin: "January 25, 2025", avatar: "sample-dive1.jpg",
  },
  {
    name: "Althea Rose Sardana", email: "rosesardana2610@gmail.com", accountType: "Student Diver", status: "Inactive", lastLogin: "January 25, 2025", avatar: "",
  },
  {
    name: "Juan Dela Cruz", email: "juandelacruz@gmail.com", accountType: "Student Diver", status: "Locked", lastLogin: "January 25, 2025", avatar: "",
  },
  {
    name: "Jay Marc", email: "jaymarc123@gmail.com", accountType: "Diver", status: "Active", lastLogin: "January 25, 2025", avatar: "sample-dive1.jpg",
  },
  {
    name: "Princess Denise Ong", email: "ongdenise234@gmail.com", accountType: "Dive Master", status: "Active", lastLogin: "January 25, 2025", avatar: "sample-dive1.jpg",
  },
  {
    name: "Althea Rose Sardana", email: "rosesardana2610@gmail.com", accountType: "Student Diver", status: "Inactive", lastLogin: "January 25, 2025", avatar: "",
  },
  {
    name: "Juan Dela Cruz", email: "juandelacruz@gmail.com", accountType: "Student Diver", status: "Locked", lastLogin: "January 25, 2025", avatar: "",
  },
];

const accountTypes = ["Diver", "Instructor", "Dive Master", "Student Diver"];
const statuses = ["Active", "Inactive", "Locked"];

export default function UserManagement() {
  const router = useRouter();
  const [dropdownUser, setDropdownUser] = useState<number | null>(null);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState<number | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]); // Unselect all
    } else {
      const globalIndices = paginatedUsers.map((_, index) => (currentPage - 1) * itemsPerPage + index);
      setSelectedUsers(globalIndices); // Select all
    }
  };

  const toggleSelectUser = (index: number) => {
    const globalIndex = (currentPage - 1) * itemsPerPage + index;
    if (selectedUsers.includes(globalIndex)) {
      setSelectedUsers(selectedUsers.filter((i) => i !== globalIndex)); // Unselect
    } else {
      setSelectedUsers([...selectedUsers, globalIndex]); // Select
    }
  };

  const handleDelete = () => {
  let remainingUsers;
  if (selectedUserToDelete !== null) {
    remainingUsers = users.filter((_, idx) => idx !== selectedUserToDelete);
    setSelectedUserToDelete(null);
  } else {
    remainingUsers = users.filter((_, idx) => !selectedUsers.includes(idx));
    setSelectedUsers([]);
  }
  console.log("Remaining Users:", remainingUsers);
  setShowDeleteModal(false);
};

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusChangeModal, setShowStatusChangeModal] = useState(false);
  const [showAccountTypeChangeModal, setShowAccountTypeChangeModal] = useState(false);

  const [statusToChange, setStatusToChange] = useState<string | null>(null);
  const [accountTypeToChange, setAccountTypeToChange] = useState<string | null>(null);

  const handleStatusChange = (newStatus: string) => {
    // Logic to update the user's status
    setShowStatusChangeModal(false);
  };

  const handleAccountTypeChange = (newAccountType: string) => {
    // Logic to update the user's account type
    setShowAccountTypeChangeModal(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-10 p-4 rounded-t-2xl md:pl-80">
        <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-white text-center md:text-left mt-2">
          User Management
        </h2>

        <div className="mt-5 p-5 min-h-[60vh] mr-0 md:mr-[0.65rem]">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
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
                  selectedUsers.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => setShowDeleteModal(true)}
                disabled={selectedUsers.length === 0}
                aria-label="Delete selected users"
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
                aria-label="Sort users"
              >
                <TbSortAscending2 className="w-4 sm:w-5 lg:w-7 h-4 sm:h-5 lg:h-5" />
                <span className="hidden lg:inline">Sort</span>
              </button>

              {/* Filter Dropdown */}
              <button
                className="bg-white text-[#001526] text-xs sm:text-base px-3 py-2 w-10 md:px-4 md:py-2 md:w-28 rounded-full font-semibold flex items-center gap-2"
                aria-label="Filter users"
              >
                <HiOutlineFilter className="w-4 sm:w-5 lg:w-7 h-4 sm:h-5 lg:h-5" />
                <span className="hidden lg:inline">Filter</span>
              </button>
            </div>
          </div>

          {/* User Table */}
          <div className="rounded-3xl overflow-hidden mt-7 bg-[#D9E7EC] shadow-md min-h-[77vh]">
            {paginatedUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[77vh]">
                <img
                  src="/images/empty_table_logo.svg"
                  alt="No Records"
                  className="mx-auto w-32 sm:w-56 h-32 sm:h-56"
                />
                <p className="text-[#001526] font-semibold text-lg">
                  No users found.
                </p>
              </div>
            ) : (
              <div
                className="overflow-x-auto overflow-y-auto max-h-[78vh] sm:max-h-[70vh] lg:max-h-[77vh] pb-3"
                style={{ scrollbarWidth: "thin", scrollbarColor: "#001526 #D9E7EC" }}
              >
                <table className="w-full text-center text-[#001526] mt-1 table-auto">
                  <thead className="bg-[#D9E7EC] border-b-2 border-gray-400">
                    <tr>
                      <th className="pl-8 sm:pb-3 sm:pl-10 pr-0 py-4 w-8 sm:w-12 text-left">
                        <input
                          type="checkbox"
                          className={`appearance-none w-4 h-4 border-2 rounded-full ${
                            selectedUsers.length === paginatedUsers.length
                              ? "bg-[#001526] border-[#001526]" // Selected state
                              : "bg-[#D9E7EC] border-[#001526]" // Unselected state
                          } focus:ring-2 focus:ring-[#001526] transition-colors`}
                          aria-label="Select all"
                          checked={selectedUsers.length === paginatedUsers.length}
                          onChange={toggleSelectAll}
                        />
                      </th>
                      {["Name", "Email", "Account Type", "Status", "Last Login", ""].map((head, idx) => (
                        <th
                          key={idx}
                          className="px-2 py-7 font-semibold text-sm sm:text-base whitespace-nowrap"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-[#D9E7EC] text-[#001526]">
                    {paginatedUsers.map((user, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-300 hover:bg-[#cfe5ee] transition"
                      >
                        <td className="pl-8 sm:pb-3 sm:pl-10 pr-0 py-4 w-8 sm:w-12 text-left">
                          <input
                            type="checkbox"
                            className={`appearance-none w-4 h-4 border-2 rounded-full ${
                              selectedUsers.includes((currentPage - 1) * itemsPerPage + index)
                                ? "bg-[#001526] border-[#001526]" // Selected state
                                : "bg-[#D9E7EC] border-[#001526]" // Unselected state
                            } focus:ring-2 focus:ring-[#001526] transition-colors`}
                            aria-label={`Select row ${index + 1}`}
                            checked={selectedUsers.includes((currentPage - 1) * itemsPerPage + index)}
                            onChange={() => toggleSelectUser(index)}
                          />
                        </td>
                        <td className="px-6 py-6 text-sm sm:text-base whitespace-nowrap">
                          <div className="flex items-center gap-4 max-w-full overflow-hidden">
                            {user.avatar ? (
                              <div className="w-10 h-10 rounded-full overflow-hidden">
                                <Image
                                  src={`/${user.avatar}`}
                                  alt={`${user.name}'s avatar`}
                                  width={32}
                                  height={32}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center text-sm font-semibold">
                                {user.name.charAt(0)}
                              </div>
                            )}
                            {user.name}
                          </div>
                        </td>
                        <td className="px-2 py-6 text-sm sm:text-base">{user.email}</td>
                        <td className="px-2 py-6 text-sm sm:text-base">
                          <CustomDropdown
                            items={accountTypes}
                            selected={user.accountType}
                            onChange={(newType) => {
                              setAccountTypeToChange(newType);
                              setShowAccountTypeChangeModal(true);
                            }}
                          />
                        </td>
                        <td className="px-2 py-6 text-sm sm:text-base">
                          <CustomDropdown
                            items={statuses}
                            selected={user.status}
                            onChange={(newStatus) => {
                              setStatusToChange(newStatus);
                              setShowStatusChangeModal(true);
                            }}
                          />
                        </td>
                        <td className="px-4 py-3 text-sm sm:text-base">{user.lastLogin}</td>
                        <td className="relative px-4 py-3">
                          <button
                            onClick={() => setDropdownUser(dropdownUser === index ? null : index)}
                            className="bg-[#D9E7EC] text-[#001526] font-semibold w-10 h-10 flex justify-center items-center rounded-2xl hover:opacity-90 transition"
                          >
                            <MoreVertical size={18} />
                          </button>
                          {dropdownUser === index && (
                            <div className="absolute right-8 mr-7 mt-3 w-36 top-5 bg-[#2C7DA0] text-white font-medium rounded-xl p-2 z-20">
                              <button
                                className="block w-full text-sm text-center px-4 py-1 mb-1 rounded-lg hover:bg-[#D9E7EC] hover:text-[#001526] transition"
                                onClick={() => router.push("/Admin-Dashboard/UsersManagement/UserProfile")}
                              >
                                View
                              </button>
                              <button
                                className="block w-full text-sm text-center px-4 py-1 mt-1 rounded-lg hover:bg-[#D9E7EC] hover:text-[#001526] transition"
                                onClick={() => {
                                  setSelectedUserToDelete((currentPage - 1) * itemsPerPage + index);
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
          setSelectedUserToDelete(null);
        }}
        onConfirm={handleDelete}
        recordCount={selectedUserToDelete !== null ? 1 : selectedUsers.length}
      />

      {/* Status Change Modal */}
      <StatusChangeModal
        isVisible={showStatusChangeModal}
        onClose={() => setShowStatusChangeModal(false)}
        onConfirm={() => handleStatusChange(statusToChange!)}
        status={statusToChange || ""}
      />

      {/* Account Type Change Modal */}
      <AccountTypeChangeModal
        isVisible={showAccountTypeChangeModal}
        onClose={() => setShowAccountTypeChangeModal(false)}
        onConfirm={() => handleAccountTypeChange(accountTypeToChange!)}
        accountType={accountTypeToChange || ""}
      />
    </>
  );
}

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
      case "active":
        return "bg-[#3BB143] text-[#001526] font-semibold";
      case "inactive":
        return "bg-[#FFD300] text-[#001526] font-semibold";
      case "locked":
        return "bg-[#CF0C0F] text-white font-semibold";
      default:
        return "bg-[#A9D6E5] text-[#001526] font-semibold";
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
        >
          {selectedItem}
          <ChevronDown size={16} />
        </button>
      </div>

      {isDropdownOpen && (
        <div
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
              onClick={() => {
                setSelectedItem(item);
                setIsDropdownOpen(false);
                if (onChange) onChange(item);
              }}
              className={`p-2 mt-1 rounded-xl cursor-pointer transition-all ${
                selectedItem === item ? "bg-[#D9E7EC] text-[#001526]" : "text-[#001526]"
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
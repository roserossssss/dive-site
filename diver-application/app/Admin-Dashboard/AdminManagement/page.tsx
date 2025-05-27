"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, MoreVertical } from "lucide-react";
import { IoSearch } from "react-icons/io5";
import { TbSortAscending2 } from "react-icons/tb";
import { HiOutlineFilter } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiPlus } from "react-icons/hi";
import { FiCheck, FiTrash2, FiX } from "react-icons/fi";
import InviteAdminModal from "./InviteAdminModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import SuccessModal from "./SuccessModal";

const initialUsers = [
  {
    adminId: "ML00001", name: "Jay Marc", email: "jaymarc123@gmail.com", status: "Active", lastLogin: "January 25, 2025",
  },
  {
    adminId: "ML00002", name: "Princess Ong", email: "ongdenise234@gmail.com", status: "Active", lastLogin: "January 25, 2025",
  },
  {
    adminId: "ML00003", name: "Althea Sardana", email: "rosesardana2610@gmail.com", status: "Inactive", lastLogin: "January 25, 2025",
  },
  {
    adminId: "ML00004", name: "Juan Dela Cruz", email: "juandelacruz@gmail.com", status: "Locked", lastLogin: "January 25, 2025",
  },
  {
    adminId: "ML00005", name: "John Doe", email: "john.doe@gmail.com", status: "Active", lastLogin: "January 25, 2025",
  },
  {
    adminId: "ML00006", name: "Seok Matthew", email: "moo.matthew@gmail.com", status: "Active", lastLogin: "January 25, 2025",
  },
  {
    adminId: "ML00007", name: "Gray Yeon", email: "gray_yeon@gmail.com", status: "Inactive", lastLogin: "January 25, 2025",
  },
  {
    adminId: "ML00008", name: "Ryomen Sukuna", email: "ryomen.sukuna@gmail.com", status: "Locked", lastLogin: "January 25, 2025",
  },
  {
    adminId: "ML00009", name: "Jane Doe", email: "janedoe@gmail.com", status: "Active", lastLogin: "January 25, 2025",
  },
  {
    adminId: "ML00010", name: "Yao Ming", email: "yao.ming@gmail.com", status: "Active", lastLogin: "January 25, 2025",
  },
  {
    adminId: "ML00011", name: "Hirai Momo", email: "hirai.momo@gmail.com", status: "Inactive", lastLogin: "January 25, 2025",
  },
  {
    adminId: "ML00012", name: "Arthur Nery", email: "arthur_nery@gmail.com", status: "Locked", lastLogin: "January 25, 2025",
  },
];

const statuses = ["Active", "Inactive", "Suspended", "Locked"];

export default function UserManagement() {
  const router = useRouter();
  const [dropdownUser, setDropdownUser] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState<number | null>(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [selectMode, setSelectMode] = useState(false);
  const [selectedAdmins, setSelectedAdmins] = useState<number[]>([]);
  const [users, setUsers] = useState(initialUsers);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddAdmin = (newAdmin: {
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    position: string;
    email: string;
  }) => {
    const newAdminData = {
      adminId: `ML${String(users.length + 1).padStart(5, "0")}`,
      name: `${newAdmin.firstName} ${newAdmin.middleName} ${newAdmin.lastName} ${newAdmin.suffix}`.trim(),
      email: newAdmin.email,
      status: "Active",
      lastLogin: "Never",
    };
    setUsers((prev) => [...prev, newAdminData]);

    localStorage.setItem("selectedAdminProfile", JSON.stringify({
      name: newAdminData.name,
      email: newAdminData.email,
      Role: newAdmin.position,
    }));

    setInviteModalOpen(false);
    setSuccessModalOpen(true);
  };

  const toggleAdminSelection = (index: number) => {
    setSelectedAdmins((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const confirmDelete = () => {
    if (selectedAdmins.length > 0) {
      removeSelectedAdmins();
    }
    setDeleteModalOpen(false);
    setSelectedUserToDelete(null);
  };

  const removeSelectedAdmins = () => {
    setUsers((prev) => prev.filter((_, i) => !selectedAdmins.includes(i)));
    setSelectedAdmins([]);
    setSelectMode(false);
  };

  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (dropdownUser === null) return;
    function handleClickOutside(event: MouseEvent) {
      // Check all refs for the current page
      for (let i = 0; i < paginatedUsers.length; i++) {
        if (
          dropdownRefs.current[i] &&
          dropdownRefs.current[i]!.contains(event.target as Node)
        ) {
          return;
        }
      }
      setDropdownUser(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownUser, paginatedUsers.length]);

  return (
    <>
      {/* Main Content */}
      <div className="fixed top-0 left-0 w-full z-10 p-4 rounded-t-2xl md:pl-80">
        <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-white text-center md:text-left mt-2">
          Admin Management
        </h2>

        <div className="mt-5 p-5 min-h-[60vh] mr-0 md:mr-[0.65rem]">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <IoIosArrowBack
                size={24}
                className={`cursor-pointer text-white ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
              <IoIosArrowForward
                size={24}
                className={`cursor-pointer text-white ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              />

              {/* Select/Cancel/Delete Button */}
              <button
                onClick={() => {
                  if (selectMode && selectedAdmins.length > 0) {
                    setDeleteModalOpen(true);
                  } else {
                    setSelectMode(!selectMode);
                    if (selectMode) setSelectedAdmins([]);
                  }
                }}
                className={`text-white text-xs sm:text-base px-3 py-2 w-20 md:px-3 md:py-2 md:w-28 rounded-full font-semibold flex items-center justify-center gap-2 ${selectMode && selectedAdmins.length > 0 ? "bg-[#CF0C0F]" : "bg-[#2C7DA0]"
                  }`}
              >
                <span className="flex items-center gap-2">
                  {selectMode && selectedAdmins.length > 0 ? (
                    <>
                      <FiTrash2 className="lg:hidden" />
                      <span className="hidden lg:inline">Delete</span>
                    </>
                  ) : selectMode ? (
                    <>
                      <FiX className="lg:hidden" />
                      <span className="hidden lg:inline">Cancel</span>
                    </>
                  ) : (
                    <>
                      <FiCheck className="lg:hidden" />
                      <span className="hidden lg:inline">Select</span>
                    </>
                  )}
                </span>
              </button>

              {/* Add Button */}
              <button
                onClick={() => setInviteModalOpen(true)}
                className="bg-[#2C7DA0] text-white text-xs sm:text-base px-3 py-2 w-20 md:px-3 md:py-2 md:w-28 rounded-full font-semibold flex items-center justify-center gap-2"
              >
                <HiPlus className="lg:hidden" size={18} />
                <span className="hidden lg:inline">Add</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative group">
                <IoSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#001526] z-10" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 rounded-full bg-white border border-[#001526] text-[#001526] font-medium placeholder-[#001526] focus:ring-2 focus:ring-[#001526] focus:border-blue-500 transition-all duration-300 ease-in-out text-xs sm:text-base w-20 sm:w-32 lg:w-70 sm:hover:w-60 sm:focus-within:w-80"
                  aria-label="Search"
                />
              </div>
              <button className="bg-white text-[#001526] text-xs sm:text-base px-3 py-2 w-10 md:px-4 md:py-2 md:w-28 rounded-full font-semibold flex items-center gap-2">
                <TbSortAscending2 className="w-4 sm:w-5 lg:w-7 h-4 sm:h-5 lg:h-5" />
                <span className="hidden lg:inline">Sort</span>
              </button>
              <button className="bg-white text-[#001526] text-xs sm:text-base px-3 py-2 w-10 md:px-4 md:py-2 md:w-28 rounded-full font-semibold flex items-center gap-2">
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
                <p className="text-[#001526] font-semibold text-lg mt-4">
                  No admins found
                </p>
                <p className="text-[#001526] text-sm mt-2">
                  You can add a new admin by clicking the <span className="font-semibold">Add</span> button.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto overflow-y-auto max-h-[78vh] sm:max-h-[70vh] lg:max-h-[77vh] pb-3" style={{ scrollbarWidth: "thin", scrollbarColor: "#001526 #D9E7EC" }}>
                <table className="w-full text-center text-[#001526] mt-1 table-auto">
                  <thead className="bg-[#D9E7EC] border-b-2 border-gray-400">
                    <tr>
                      <th className="pl-8 sm:pb-3 sm:pl-10 pr-0 py-4 w-8 sm:w-12 text-left">
                        {selectMode && (
                          <input
                            type="checkbox"
                            className={`appearance-none w-4 h-4 border-2 rounded-full ${selectedAdmins.length === paginatedUsers.length && paginatedUsers.length > 0
                                ? "bg-[#001526] border-[#001526]"
                                : "bg-[#D9E7EC] border-[#001526]"
                              } focus:ring-2 focus:ring-[#001526] transition-colors`}
                            aria-label="Select all"
                            checked={selectedAdmins.length === paginatedUsers.length && paginatedUsers.length > 0}
                            onChange={() => {
                              if (selectedAdmins.length === paginatedUsers.length) {
                                // Unselect all
                                setSelectedAdmins([]);
                              } else {
                                // Select all visible
                                const globalIndices = paginatedUsers.map((_, idx) => (currentPage - 1) * itemsPerPage + idx);
                                setSelectedAdmins(globalIndices);
                              }
                            }}
                          />
                        )}
                      </th>
                      {["Admin ID", "Name", "Email", "Status", "Last Login", ""].map((head, idx) => (
                        <th key={idx} className="px-2 py-7 font-semibold text-sm sm:text-base whitespace-nowrap">
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-[#D9E7EC] text-[#001526]">
                    {paginatedUsers.map((user, index) => {
                      const globalIndex = (currentPage - 1) * itemsPerPage + index;
                      return (
                        <tr key={index} className="border-b border-gray-300 hover:bg-[#cfe5ee] transition">
                          <td className="pl-8 sm:pb-3 sm:pl-10 pr-0 py-4 w-8 sm:w-12 text-left">
                            {selectMode && (
                              <input
                                type="checkbox"
                                className={`appearance-none w-4 h-4 border-2 rounded-full ${selectedAdmins.includes(globalIndex)
                                    ? "bg-[#001526] border-[#001526]"
                                    : "bg-[#D9E7EC] border-[#001526]"
                                  } focus:ring-2 focus:ring-[#001526] transition-colors`}
                                aria-label={`Select row ${index + 1}`}
                                checked={selectedAdmins.includes(globalIndex)}
                                onChange={() => toggleAdminSelection(globalIndex)}
                              />
                            )}
                          </td>
                          <td className="px-6 py-6 text-sm sm:text-base">{user.adminId}</td>
                          <td className="px-6 py-6 text-xs sm:text-base">{user.name}</td>
                          <td className="px-6 py-6 text-xs sm:text-base">{user.email}</td>
                          <td className="px-6 py-6 text-xs sm:text-base">
                            <CustomDropdown items={statuses} selected={user.status} />
                          </td>
                          <td className="px-6 py-6 text-xs sm:text-base">{user.lastLogin}</td>
                          <td className="px-2 py-3 relative">
                            <div
                              ref={el => (dropdownRefs.current[index] = el)}
                              className="inline-block"
                            >
                              <button
                                onClick={() =>
                                  setDropdownUser(dropdownUser === globalIndex ? null : globalIndex)
                                }
                                className="bg-[#D9E7EC] text-[#001526] font-semibold w-10 h-10 flex justify-center items-center rounded-2xl hover:opacity-90 transition"
                              >
                                <MoreVertical size={18} />
                              </button>
                              {dropdownUser === globalIndex && (
                                <div className="absolute right-4 mr-7 mt-3 w-36 top-5 bg-[#2C7DA0] text-white font-medium rounded-xl p-2 z-20">
                                  <button
                                    onClick={() => {
                                      localStorage.setItem(
                                        "selectedAdminProfile",
                                        JSON.stringify({
                                          name: user.name,
                                          email: user.email,
                                          position: user.status, 
                                        })
                                      );
                                      router.push("/Admin-Dashboard/AdminManagement/View");
                                    }}
                                    className="block w-full text-sm text-center px-4 py-1 md-1 rounded-lg hover:bg-[#D9E7EC] hover:text-[#001526] transition"
                                  >
                                    View
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isVisible={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        count={selectedAdmins.length || 1}
      />

      {/* Invite Admin Modal */}
      <InviteAdminModal
        isVisible={inviteModalOpen}
        onCancel={() => setInviteModalOpen(false)}
        onSend={handleAddAdmin}
      />

      {/* Success Modal */}
      <SuccessModal
        isVisible={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
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

  useEffect(() => {
    if (!isDropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
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

  useEffect(() => {
    setSelectedItem(selected);
  }, [selected]);

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
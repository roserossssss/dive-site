"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Listbox } from "@headlessui/react";
import { ChevronDown, MoreVertical } from "lucide-react";
import { IoSearch } from "react-icons/io5";
import { TbSortAscending2 } from "react-icons/tb";
import { HiOutlineFilter } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiCheck, FiX, FiTrash2, FiSave } from "react-icons/fi";

import DeleteConfirmationModal from "./DeleteConfirmationModal";
import SaveConfirmationModal from "./SaveConfirmationModal";

// Data
const users = [
  {
    Admin_ID: "ML00001", name: "Princess Ong", email: "ongdenise234@gmail.com", AccountType: "Admin", Role: "Admin 1", Create: true, Update: false, Delete: false, lastLogin: "January 25, 2025",
  },
  {
    Admin_ID: "ML00002", name: "Althea Sardana", email: "rosesardana2610@gmail.com", AccountType: "Admin", Role: "Admin 2", Create: true, Update: true, Delete: true, lastLogin: "January 25, 2025",
  },
  {
    Admin_ID: "ML00003", name: "Jay Marc", email: "jaymarc123@gmail.com", AccountType: "Admin", Role: "Admin 3", Create: false, Update: false, Delete: true, lastLogin: "January 25, 2025",
  },
  {
    Admin_ID: "ML00004", name: "Juan Dela Cruz", email: "juandelacruz@gmail.com", AccountType: "Admin", Role: "Admin 4", Create: false, Update: false, Delete: false, lastLogin: "January 25, 2025",
  },
  {
    Admin_ID: "ML00005", name: "Nicki Minaj", email: "nickiminaj@gmail.com", AccountType: "Admin", Role: "Admin 1", Create: true, Update: false, Delete: false, lastLogin: "January 25, 2025",
  },
  {
    Admin_ID: "ML00006", name: "Ahn Suho", email: "ahnsuho@gmail.com", AccountType: "Admin", Role: "Admin 2", Create: true, Update: true, Delete: true, lastLogin: "January 25, 2025",
  },
  {
    Admin_ID: "ML00007", name: "John Doe", email: "johndoe@gmail.com", AccountType: "Admin", Role: "Admin 3", Create: false, Update: false, Delete: true, lastLogin: "January 25, 2025",
  },
  {
    Admin_ID: "ML00008", name: "Gojo Satoru", email: "gojosatoru@gmail.com", AccountType: "Admin", Role: "Admin 4", Create: false, Update: false, Delete: false, lastLogin: "January 25, 2025",
  },
  {
    Admin_ID: "ML00009", name: "Troye Sivan", email: "troye.sivan@gmail.com", AccountType: "Admin", Role: "Admin 1", Create: true, Update: false, Delete: false, lastLogin: "January 25, 2025",
  },
  {
    Admin_ID: "ML00010", name: "Ariana Grande", email: "arianagrande@gmail.com", AccountType: "Admin", Role: "Admin 2", Create: true, Update: true, Delete: true, lastLogin: "January 25, 2025",
  },
  {
    Admin_ID: "ML00011", name: "Fujii Kaze", email: "fujii.kaze@gmail.com", AccountType: "Admin", Role: "Admin 3", Create: false, Update: false, Delete: true, lastLogin: "January 25, 2025",
  },
  {
    Admin_ID: "ML00012", name: "Jo Yuri", email: "jo.yuri@gmail.com", AccountType: "Admin", Role: "Admin 4", Create: false, Update: false, Delete: false, lastLogin: "January 25, 2025",
  },
];

export default function RolesPermissions() {
  const router = useRouter();
  const [dropdownUser, setDropdownUser] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState<number | null>(null);
  const [userList, setUserList] = useState(users);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedAdmins, setSelectedAdmins] = useState<number[]>([]);
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(userList.length / itemsPerPage);

  // Get paginated users
  const paginatedUsers = userList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Select All for current page
  const isAllSelected = paginatedUsers.length > 0 && paginatedUsers.every((_, idx) =>
    selectedAdmins.includes((currentPage - 1) * itemsPerPage + idx)
  );

  const initialUserList = useRef(users);
  const hasChanges = JSON.stringify(userList) !== JSON.stringify(initialUserList.current);

  const handleSelectAll = () => {
    const pageIndexes = paginatedUsers.map((_, idx) => (currentPage - 1) * itemsPerPage + idx);
    if (isAllSelected) {
      setSelectedAdmins(selectedAdmins.filter(idx => !pageIndexes.includes(idx)));
    } else {
      setSelectedAdmins([...new Set([...selectedAdmins, ...pageIndexes])]);
    }
  };

  type PermissionType = "Create" | "Update" | "Delete";

  const togglePermission = (index: number, permissionType: PermissionType) => {
    setUserList(prev => {
      const updated = prev.map((user, i) =>
        i === index ? { ...user, [permissionType]: !user[permissionType] } : user
      );
      return updated;
    });
  };

  const confirmDelete = () => {
    if (selectedAdmins.length > 0) {
      removeSelectedAdmins();
    }
    setDeleteModalOpen(false);
  };

  const toggleAdminSelection = (index: number) => {
    setSelectedAdmins((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const removeSelectedAdmins = () => {
    setUserList((prev) => prev.filter((_, i) => !selectedAdmins.includes(i)));
    setSelectedAdmins([]);
    setSelectMode(false);
    setDeleteModalOpen(false);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const selectedAdminsOnPage = paginatedUsers
  .map((_, idx) => (currentPage - 1) * itemsPerPage + idx)
  .filter(idx => selectedAdmins.includes(idx));

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-10 p-4 rounded-t-2xl md:pl-80">
        <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-white text-center md:text-left mt-2">
          Roles and Permissions
        </h2>

        <div className="mt-5 p-5 min-h-[60vh] mr-0 md:mr-[0.65rem]">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <IoIosArrowBack
                size={24}
                className={`cursor-pointer text-white ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handlePreviousPage}
                aria-hidden="true"
              />
              <IoIosArrowForward
                size={24}
                className={`cursor-pointer text-white ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handleNextPage}
                aria-hidden="true"
              />

              <button
                onClick={() => {
                  if (selectMode && selectedAdmins.length > 0) {
                    setDeleteModalOpen(true);
                  } else {
                    setSelectMode(!selectMode);
                    if (selectMode) setSelectedAdmins([]);
                  }
                }}
                className={`text-white text-xs sm:text-base px-3 py-2 w-20 md:px-3 md:py-2 md:w-28 rounded-full font-semibold flex items-center justify-center gap-2 ${
                  selectMode && selectedAdmins.length > 0 ? "bg-[#CF0C0F]" : "bg-[#2C7DA0]"
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
                      <FiCheck className="lg:hidden " />
                      <span className="hidden lg:inline">Select</span>
                    </>
                  )}
                </span>
              </button>

              <button
                onClick={() => setSaveModalOpen(true)}
                className="bg-white text-[#001526] text-xs sm:text-base px-3 py-2 w-20 md:px-3 md:py-2 md:w-28 rounded-full font-semibold flex items-center justify-center gap-2"
                disabled={!hasChanges}
                style={{
                  opacity: hasChanges ? 1 : 0.5,
                  cursor: hasChanges ? "pointer" : "not-allowed",
                }}
              >
                <FiSave className="lg:hidden" />
                <span className="hidden lg:inline">Save</span>
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

              {/* Sort & Filter */}
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
                  No admins found.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto overflow-y-auto max-h-[78vh] sm:max-h-[70vh] lg:max-h-[77vh] pb-3" style={{ scrollbarWidth: "thin", scrollbarColor: "#001526 #D9E7EC" }}>
                <table className="w-full text-center text-[#001526] mt-1 table-auto">
                  <thead className="bg-[#D9E7EC] border-b-2 border-gray-400">
                    <tr>
                      <th className="px-2 py-7 w-[50px]">
                        {selectMode && (
                          <label className="inline-flex items-center cursor-pointer ml-5">
                            <input
                              type="checkbox"
                              checked={isAllSelected}
                              onChange={handleSelectAll}
                              className="sr-only peer"
                              aria-label="Select all"
                            />
                            <div className={`w-4 h-4 rounded-full border-2 border-[#001526] flex items-center justify-center transition
                              ${isAllSelected ? "bg-[#001526]" : "bg-transparent"}
                            `}></div>
                          </label>
                        )}
                      </th>
                      {["Admin ID", "Name", "Role", "Create", "Update", "Delete", ""].map((head, idx) => (
                        <th
                          key={idx}
                          className={`px-2 py-7 font-semibold text-sm sm:text-base whitespace-nowrap ${
                            idx === 6 ? "w-[90px] md:w-[100px] lg:w-[100px]" : "w-[170px] sm:w-[200px] md:w-[220px] lg:w-[270px]"
                          }`}
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-[#D9E7EC] text-[#001526]">
                    {paginatedUsers.map((user, index) => {
                      // Calculate the global index for selection
                      const globalIndex = (currentPage - 1) * itemsPerPage + index;
                      return (
                        <tr
                          key={globalIndex}
                          className="border-b border-gray-300 hover:bg-[#cfe5ee] transition"
                        >
                          {/* Selection Circle */}
                          <td className="px-6 py-6 w-[50px]">
                            {selectMode ? (
                              <div
                                onClick={() => toggleAdminSelection(globalIndex)}
                                className={`w-4 h-4 rounded-full border-2 border-[#001526] cursor-pointer flex items-center justify-center transition ml-5 ${
                                  selectedAdmins.includes(globalIndex)
                                    ? "bg-[#001526]"
                                    : "bg-transparent"
                                }`}
                              ></div>
                            ) : null}
                          </td>

                          {/*Admin ID*/}
                          <td className="px-6 py-6 text-sm sm:text-base">
                            <span className="items-center">{user.Admin_ID}</span>
                          </td>

                          {/* Name */}
                          <td className="px-6 py-6 text-sm sm:text-base whitespace-nowrap">
                            <div className="items-center gap-4 max-w-full overflow-hidden">{user.name}</div>
                          </td>

                          {/*Role*/}
                          <td className="px-2 py-6  text-sm sm:text-base">
                            <span className="items-center gap-4">{user.Role}</span>
                          </td>

                          {/* CREATE TOGGLE */}
                          <td>
                            <label className="inline-flex items-center cursor-pointer -ml-1">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={userList[globalIndex]?.Create}
                                onChange={() => togglePermission(globalIndex, "Create")}
                              />
                              <div className="relative w-11 h-6 rounded-full ring-2 ring-[#001526] bg-[#FFFFFF] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:absolute after:top-0.5 after:start-[2px] after:bg-[#2C7DA0] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all p-3"></div>
                            </label>
                          </td>

                          {/* UPDATE TOGGLE */}
                          <td>
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={userList[globalIndex]?.Update}
                                onChange={() => togglePermission(globalIndex, "Update")}
                              />
                              <div className="relative w-11 h-6 rounded-full ring-2 ring-[#001526] bg-[#FFFFFF] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:absolute after:top-0.5 after:start-[2px] after:bg-[#2C7DA0] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all p-3"></div>
                            </label>
                          </td>

                          {/* DELETE TOGGLE */}
                          <td>
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={userList[globalIndex]?.Delete}
                                onChange={() => togglePermission(globalIndex, "Delete")}
                              />
                              <div className="relative w-11 h-6 rounded-full ring-2 ring-[#001526] bg-[#FFFFFF] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:absolute after:top-0.5 after:start-[2px] after:bg-[#2C7DA0] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all p-3"></div>
                            </label>
                          </td>
                          {/* Dropdown Options */}
                          <td className="relative px-4 py-3">
                            <button
                              onClick={() => setDropdownUser(dropdownUser === globalIndex ? null : globalIndex)}
                              className="bg-[#D9E7EC] text-[#001526] font-semibold w-10 h-10 flex justify-center items-center rounded-2xl hover:opacity-90 transition"
                            >
                              <MoreVertical size={18} />
                            </button>

                            {dropdownUser === globalIndex && (
                              <div className="absolute right-8 mr-7 mt-1 w-36 top-5 bg-[#2C7DA0] text-white font-medium rounded-xl p-2 z-20">
                                <button
                                  className="block w-full text-sm text-center px-4 py-1 rounded-lg hover:bg-[#D9E7EC] hover:text-[#001526] transition"
                                  onClick={() => router.push("/Admin-Dashboard/RolesPermissions/View")}
                                >
                                  View
                                </button>
                              </div>
                            )}
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

      {/* Delete Modal */}
      <DeleteConfirmationModal
        isVisible={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        recordCount={selectedAdminsOnPage.length}
      />

      {/* Save Modal */}
      <SaveConfirmationModal
      isVisible={saveModalOpen}
      onClose={() => setSaveModalOpen(false)}
      onConfirm={() => {
        console.log("Changes saved");
        initialUserList.current = userList;
        setSaveModalOpen(false);
      }}
    />
    </>
  );
}

// Custom Dropdown Component
function CustomDropdown({ items, selected }: { items: string[]; selected: string }) {
  const [selectedItem, setSelectedItem] = useState(selected);

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
    <Listbox value={selectedItem} onChange={setSelectedItem}>
      <div className="relative">
        <Listbox.Button
          className={`font-medium w-40 px-4 py-2 rounded-2xl flex justify-between items-center shadow-inner hover:opacity-90 transition ${getSelectedColor(selectedItem)}`}
        >
          {selectedItem}
          <ChevronDown size={16} />
        </Listbox.Button>

        <Listbox.Options className="absolute -ml-3 mt-2 w-44 bg-[#A3D4E3] text-[#001526] font-semibold rounded-2xl p-2 z-10">
          {items.map((item) => {
            const lower = item.toLowerCase();
            const bgColor =
              lower === "active"
                ? "bg-[#3BB143]"
                : lower === "inactive"
                ? "bg-[#FFD300]"
                : lower === "locked"
                ? "bg-[#CF0C0F] text-white"
                : "bg-[#D9E7EC]";

            return (
              <Listbox.Option key={item} value={item}>
                {({ active, selected }) => (
                  <div
                    className={`p-2 rounded-lg cursor-pointer transition-all ${
                      active || selected ? `${bgColor} opacity-90` : "text-[#001526]"
                    }`}
                  >
                    {item}
                  </div>
                )}
              </Listbox.Option>
            );
          })}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
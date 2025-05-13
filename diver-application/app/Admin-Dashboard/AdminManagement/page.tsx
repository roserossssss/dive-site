"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Listbox } from "@headlessui/react";
import { ChevronDown, MoreVertical } from "lucide-react";
import { IoSearch } from "react-icons/io5";
import { TbSortAscending2 } from "react-icons/tb";
import { HiOutlineFilter } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GoTrash } from "react-icons/go";
import { HiPlus } from "react-icons/hi";
import { FaUserShield } from "react-icons/fa";
import { FiCheck, FiTrash2,  FiX } from "react-icons/fi";


const initialUsers = [
  {
    adminId: "ML00001",
    name: "Jay Marc",
    email: "jaymarc123@gmail.com",
    status: "Active",
    lastLogin: "January 25, 2025",
  },
  {
    adminId: "ML00002",
    name: "Princess Denise Ong",
    email: "ongdenise234@gmail.com",
    status: "Active",
    lastLogin: "January 25, 2025",
  },
  {
    adminId: "ML00003",
    name: "Althea Rose Sardana",
    email: "rosesardana2610@gmail.com",
    status: "Inactive",
    lastLogin: "January 25, 2025",
  },
  {
    adminId: "ML00004",
    name: "Juan Dela Cruz",
    email: "juandelacruz@gmail.com",
    status: "Locked",
    lastLogin: "January 25, 2025",
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

  const toggleAdminSelection = (index: number) => {
    setSelectedAdmins((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const confirmDelete = () => {
    if (selectedAdmins.length > 0) {
      console.log("Deleting admins:", selectedAdmins);
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

  return (
    <div className="fixed top-0 left-0 w-full z-10 p-4 rounded-t-2xl md:pl-80">
      <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-white text-center md:text-left mt-2">
        Admin Management
      </h2>

      <div className="mt-5 p-5 min-h-[60vh]">
        {/* Header */}
        <div className="flex justify-between text-[#001526] font-semibold items-center mb-4">
          <div className="flex items-center gap-2">
            <IoIosArrowBack size={24} className="cursor-pointer text-white sm: -ml-2 md: -ml-1 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            <IoIosArrowForward size={24} className="cursor-pointer text-white sm: -ml-2 md: -ml-1 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />

             {/* Select and Cancel Button */}
             <button
  onClick={() => {
    if (selectMode && selectedAdmins.length > 0) {
      setDeleteModalOpen(true);
    } else {
      setSelectMode(!selectMode);
      if (selectMode) setSelectedAdmins([]);
    }
  }}
            className={`${
              selectMode && selectedAdmins.length > 0 ? "bg-[#CF0C0F]" : "bg-[#2C7DA0]"
              } text-white text-xs sm:text-base sm: -ml-2 px-3 md:px-3 py-2 md:py-2.5 rounded-full font-semibold shadow hover:opacity-90 transition flex items-center gap-2`}
              >
                <span className="block lg:hidden">
                  {selectMode && selectedAdmins.length > 0 ? (
                    <FiTrash2 size={18} strokeWidth={3} />
                  ) : selectMode ? (
                  <FiX size={18} strokeWidth={3} />
                ) : (
                <FiCheck size={18} strokeWidth={3} />
                )}
                </span>
                <span className="hidden lg:inline">
                  {selectMode && selectedAdmins.length > 0
                  ? "Delete"
                  : selectMode
                  ? "Cancel"
                  : "Select"}
                  </span>
                  
                  </button>
                    
                    {/* Add Button */}
                    <button
                    onClick={() => setInviteModalOpen(true)}
                    className="bg-[#2C7DA0] text-white sm: -ml-1 text-xs sm:text-base px-3 md:px-3 py-2 lg:px-5 md:py-2.5 rounded-full font-semibold shadow hover:opacity-90 transition flex items-center gap-2"
                    >
                      <span  className="block lg:hidden">
                        <HiPlus size={18} />
                        </span>
                        <span className="hidden lg:inline">Add</span>
                        </button>
                        </div>

          <div className="relative flex items-center gap-3">
            {/* Search */}
            <div className="relative group">
              <span className="hidden sm:block absolute -top-6 left-3 text-xs sm:text-sm text-white font-medium opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 transition-opacity duration-300">
                Admin's name/email
              </span>
              <IoSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#001526] z-10" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 rounded-full lg:mr-0.5 bg-white border border-[#001526] text-[#001526] font-medium placeholder-[#001526] focus:ring-2 focus:ring-[#001526] focus:border-blue-500 transition-all duration-300 ease-in-out text-xs sm:text-base w-20 sm:w-32 lg:w-70 lg:hover:w-60 lg:focus-within:w-80"
              />
            </div>

            <button className="bg-white text-[#001526] text-xs lg:mr-0.5 sm: -ml-2 sm:text-base px-3 py-2 rounded-full font-semibold flex items-center gap-1">
              <TbSortAscending2 className="w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-5" />
              <span className="hidden lg:inline">Sort</span>
            </button>

            <button className="bg-white text-[#001526] text-xs lg:mr-0.5 sm: -ml-2 sm:text-base px-3 py-2 rounded-full font-semibold flex items-center gap-1">
              <HiOutlineFilter className="w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-5" />
              <span className="hidden lg:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* User Table */}
        <div className="rounded-3xl overflow-hidden mt-7 bg-[#D9E7EC] shadow-md max-h-[85vh]">
          <div className="overflow-y-auto min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">
            <table className="w-full text-center text-[#001526] mt-1 table-auto">
              <thead className="bg-[#D9E7EC] border-b-2 border-gray-400">
                <tr>
                  {["", "Admin ID", "Name", "Email", "Status", "Last Login", ""].map((head, idx) => (
                    <th key={idx} className="px-2 py-7 font-semibold text-sm sm:text-base whitespace-nowrap">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-[#D9E7EC] text-[#001526]">
                {users.map((user, index) => (
                  <tr key={index} className="border-b border-gray-300 hover:bg-[#cfe5ee] transition">
                    <td className="px-2 py-6">
                      {selectMode && (
                        <div
                        onClick={() => toggleAdminSelection(index)}
                        className={`w-5 h-5 rounded-full border-2 border-[#001526] cursor-pointer flex items-center justify-center transition ml-7 ${
                          selectedAdmins.includes(index) ? "bg-[#001526]" : "bg-transparent"
                        }`}
                        ></div>
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
                      <button
                        onClick={() => setDropdownUser(index)}
                        className="bg-[#D9E7EC] text-[#001526] font-semibold w-10 h-10 flex justify-center items-center rounded-2xl hover:opacity-90 transition"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {dropdownUser === index && (
                        <div className="absolute right-8 mr-7 mt-3 w-36 top-5 bg-[#2C7DA0] text-white font-medium rounded-xl p-2 z-20">
                          <button
                            className="block w-full text-sm text-center px-4 py-1 md-1 rounded-lg hover:bg-[#D9E7EC] hover:text-[#001526] transition"
                            onClick={() => router.push("/Admin-Dashboard/UsersManagement/UserProfile")}
                          >
                            View Admin
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals (unchanged) */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-[#D9E7EC] p-8 w-11/12 sm:w-[480px] rounded-2xl shadow-lg flex flex-col items-center">
            <GoTrash className="text-[#001526] w-24 h-24 mt-10 mb-3" />
            <h2 className="text-3xl font-bold mb-7 text-center text-[#001526]">
              {selectedAdmins.length === 1
              ? "Delete Admin?"
              : `Delete ${selectedAdmins.length} Admins?`}
              </h2>
            <p className="font-semibold text-center text-[#001526] mb-5 text-[15px]">Are you sure you want to delete?</p>
            <p className="font-semibold text-center text-[#001526] -mt-5 text-[15px]">This action cannot be undone.</p>
            <div className="flex justify-center mt-12">
              <button
                className="mr-2 w-36 px-5 py-3 bg-[#D9E7EC] text-[#001526] border-2 border-[#001526] rounded-full text-[16px] font-semibold hover:bg-[#001526] hover:text-white transition duration-200"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="ml-2 w-36 px-5 py-3bg-[#D9E7EC] text-[#001526] border-2 border-[#001526] rounded-full text-[16px] font-semibold hover:bg-[#001526] hover:text-white transition duration-200"
                onClick={confirmDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {inviteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-[#D9E7EC] p-8 w-11/12 sm:w-[700px] min-h-[420px] rounded-2xl shadow-lg flex flex-col gap-6 items-center">
            <div className="w-full text-left">
              <h2 className="text-[#001526] text-3xl mt-2 ml-2 font-bold flex items-center gap-2 mb-2">
                <FaUserShield className="text-[#001526] w-20 h-20" /> Invite Admin
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full">
              <div className="flex flex-col w-full">
                <label className="text-[#001526] font-semibold mb-1">Name</label>
                <input
                  type="text"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Full Name"
                  className="px-4 py-1 rounded-xl border-2 border-[#001526] placeholder-gray-500 placeholder:text-sm text-[#001526] bg-transparent"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-[#001526] font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="Email Address"
                  className="px-4 py-1 rounded-xl border-2 border-[#001526] placeholder-gray-500 placeholder:text-sm text-[#001526] bg-transparent"
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-16 w-full">
              <button
                onClick={() => setInviteModalOpen(false)}
                className="w-full sm:w-44 py-2 border-2 border-[#001526] rounded-full text-[#001526] font-semibold hover:bg-[#001526] hover:text-white transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log("Invite Sent To:", inviteName, inviteEmail);
                  setInviteModalOpen(false);
                  setInviteName("");
                  setInviteEmail("");
                }}
                className="w-full sm:w-44 py-2 border-2 border-[#001526] rounded-full text-[#001526] font-semibold hover:bg-[#001526] hover:text-white transition duration-200"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
          className={`font-medium w-40 px-6 py-2 rounded-2xl flex justify-between items-center shadow-inner hover:opacity-90 transition ${getSelectedColor(
            selectedItem
          )}`}
        >
          {selectedItem}
          <ChevronDown size={16} />
        </Listbox.Button>

        <Listbox.Options className="absolute -ml-3 mt-2 w-44 bg-[#A3D4E3] text-[#001526] font-semibold rounded-xl p-2 z-10">
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
                    className={`p-2 mt-1 rounded-xl cursor-pointer transition-all ${
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

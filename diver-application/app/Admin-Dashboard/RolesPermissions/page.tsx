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
import { FiCheck, FiX, FiTrash2, FiSave, FiAlertCircle } from "react-icons/fi";

// Data
const users = [
  {
    Admin_ID: "ML00001",
    name: "Princess Denise Ong",
    email: "ongdenise234@gmail.com",
    AccountType: "Admin",
    Role: "Admin1",
    Create: true,
    Update: false,
    Delete: false,
    lastLogin: "January 25, 2025",
  },
  {
    Admin_ID: "ML00002",
    name: "Althea Rose Sardana",
    email: "rosesardana2610@gmail.com",
    AccountType: "Admin",
    Role: "Admin2",
    Create: true,
    Update: true,
    Delete: true,
    lastLogin: "January 25, 2025",
  },
  {
    Admin_ID: "ML00003",
    name: "Jay Marc",
    email: "jaymarc123@gmail.com",
    AccountType: "Admin",
    Role: "Admin3",
    Create: false,
    Update: false,
    Delete: true,
    lastLogin: "January 25, 2025",
  },
  {
    Admin_ID: "ML00004",
    name: "Juan Dela Cruz",
    email: "juandelacruz@gmail.com",
    AccountType: "Admin",
    Role: "Admin4",
    Create: false,
    Update: false,
    Delete: false,
    lastLogin: "January 25, 2025",
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


  type PermissionType = "Create" | "Update" | "Delete";

  const togglePermission = (index: number, permissionType: PermissionType) => {
    const updated = [...userList];
    updated[index][permissionType] = !updated[index][permissionType];
    setUserList(updated);
  };

  const confirmDelete = () => {
    if (selectedAdmins.length > 0) {
      console.log("Deleting admins:", selectedAdmins);
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

  return (
    <div className="fixed top-0 left-0 w-full z-10 p-4 rounded-t-2xl md:pl-80">
      <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-white text-center md:text-left mt-2">
        Roles and Permissions
      </h2>

      <div className="mt-5 p-5 min-h-[60vh]">
  {/* Header */}
  <div className="flex justify-between text-[#001526] font-semibold items-center mb-4">
    <div className="flex items-center gap-2">
      <IoIosArrowBack size={24} className="cursor-pointer text-white sm: -ml-2 md: -ml-1 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
      <IoIosArrowForward size={24} className="cursor-pointer text-white sm: -ml-2 md: -ml-1 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />

      <button
  onClick={() => {
    if (selectMode && selectedAdmins.length > 0) {
      setDeleteModalOpen(true);
    } else {
      setSelectMode(!selectMode);
      if (selectMode) setSelectedAdmins([]);
    }
  }}
  className={`text-white text-xs sm:text-base px-3 md:px-4 py-2 md:py-2.5 rounded-full font-semibold shadow hover:opacity-90 transition flex items-center gap-2 ${
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
        <FiCheck className="lg:hidden" />
        <span className="hidden lg:inline">Select</span>
      </>
    )}
  </span>
</button>


<button
  onClick={() => setSaveModalOpen(true)}
  className="bg-white text-[#001526] text-xs sm:text-base px-3 md:px-3 py-2 lg:px-5 md:py-2.5 rounded-full font-semibold shadow hover:opacity-90 transition flex items-center gap-2"
>
  <FiSave className="lg:hidden" />
  <span className="hidden lg:inline">Save</span>
</button>

    </div>

          <div className="relative flex items-center gap-3">
            {/* Search */}
            <div className="relative group">
              <span className="hidden sm:block absolute -top-6 left-3 text-xs sm:text-sm text-white font-medium opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 transition-opacity duration-300">
                Admin Name / ID
              </span>
              <IoSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#001526] z-10" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 rounded-full lg:mr-0.5 bg-white border border-[#001526] text-[#001526] font-medium placeholder-[#001526] focus:ring-2 focus:ring-[#001526] focus:border-blue-500 transition-all duration-300 ease-in-out text-xs sm:text-base w-20 sm:w-32 lg:w-70 lg:hover:w-60 lg:focus-within:w-80"
              />
            </div>

            {/* Sort & Filter */}
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
                  {/* Selection Column Header (Empty) */}
          <th className="px-2 py-7 w-[50px]"></th>
                  {["AdminID", "Name", "Role", "Create", "Update", "Delete", ""].map((head, idx) => (
                    <th
                      key={idx}
                      className={`px-2 py-7 font-semibold text-sm sm:text-base
                        ${
                          idx === 6 ? "w-[90px] md:w-[100px] lg:w-[100px]" : "w-[270px] md:w-[270px] lg:w-[270px]"
                        }`
                    }
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-[#D9E7EC] text-[#001526]">
        {users.map((user, index) => (
          <tr
            key={index}
            className="border-b border-gray-300 hover:bg-[#cfe5ee] transition"
          >
            {/* Selection Circle */}
            <td className="px-2 py-6 w-[50px]">
              {selectMode ? (
                <div
                  onClick={() => toggleAdminSelection(index)}
                  className={`w-5 h-5 rounded-full border-2 border-[#001526] cursor-pointer flex items-center justify-center transition ml-5 ${
                    selectedAdmins.includes(index)
                      ? "bg-[#001526]"
                      : "bg-transparent"
                  }`}
                ></div>
              ) : null}
            </td>
                    
                    
                    {/*Admin ID*/}
                    <td className="px-2 py-6 text-sm sm:text-base">
                      <span className="items-center">{user.Admin_ID}</span>
                    </td>

                    {/* Name */}
                    <td className="px-6 py-6 text-sm sm:text-base whitespace-nowrap">
                      <div className="items-center gap-4 max-w-full overflow-hidden">
                      
                        {user.name}
                      </div>
                    </td>

                    {/*Role*/}
                      <td className="px-2 py-6  text-sm sm:text-base">
                      <span className="items-center gap-4">{user.Role}</span>
                    </td>
                    
            {/* CREATE TOGGLE */}
            <td>
              <label className="inline-flex items-center cursor-pointer -ml-5">
              <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={userList[index].Create}
                  onChange={() => togglePermission(index, "Create")}
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
                  checked={userList[index].Update}
                  onChange={() => togglePermission(index, "Update")}
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
                  checked={userList[index].Delete}
                  onChange={() => togglePermission(index, "Delete")}
                />
                <div className="relative w-11 h-6 rounded-full ring-2 ring-[#001526] bg-[#FFFFFF] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:absolute after:top-0.5 after:start-[2px] after:bg-[#2C7DA0] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all p-3"></div>
              </label>
            </td>
                    {/* Dropdown Options */}
                    <td className="relative px-4 py-3">
                      <button
                        onClick={() => setDropdownUser(dropdownUser === index ? null : index)
                        }
                        className="bg-[#D9E7EC] text-[#001526] font-semibold w-10 h-10 flex justify-center items-center rounded-2xl hover:opacity-90 transition"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {dropdownUser === index && (
                        <div className="absolute right-16 mt-3 w-36 top-5 bg-[#2C7DA0] text-white font-medium rounded-xl p-2 z-10">
                          <button className="block w-full text-sm text-center px-4 py-1 md-1 rounded-lg hover:bg-[#D9E7EC] hover:text-[#001526] transition"
                           onClick={() => router.push("/Admin-Dashboard/UsersManagement/UserProfile")}>
                            View
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

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#D9E7EC] p-8 w-11/12 sm:w-[500px] min-h-[450px] rounded-2xl shadow-lg flex flex-col items-center">
            <GoTrash className="text-[#001526] w-24 h-24 mt-10 mb-3" />
            <h2 className="text-3xl font-bold mb-7 text-center text-[#001526]">
              {selectedAdmins.length === 1
              ? "Delete Record?"
              : `Delete ${selectedAdmins.length} Records?`}
              </h2>
            <p className="font-semibold text-center text-[#001526] text-[15px]">Are you sure you want to delete?</p>
            <p className="font-semibold text-center text-[#001526] text-[15px]">This action cannot be undone.</p>
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
        
      {/* Save Changes Confirmation Modal */} 
      {saveModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#D9E7EC] p-8 w-11/12 sm:w-[500px] min-h-[450px] rounded-2xl shadow-lg flex flex-col items-center">
          <FiAlertCircle className="text-[#001526] w-24 h-24 mt-10" />
          <h2 className="text-3xl font-bold mb-6 text-center text-[#001526]">Save Changes?</h2>
          <p className="font-semibold text-center text-[#001526] text-[15px]">Are you sure you want to save these changes?</p>
          <p className="font-semibold text-center text-[#001526] text-[15px]">This action will update the records.</p>
          <div className="flex justify-center mt-12">
            <button
            className="mr-2 w-36 px-5 py-3 bg-[#D9E7EC] text-[#001526] border-2 border-[#001526] rounded-full text-[16px] font-semibold hover:bg-[#001526] hover:text-white transition duration-200"
            onClick={() => setSaveModalOpen(false)}
            >
              Cancel
              </button>
              <button
              className="ml-2 w-36 px-5 py-3 bg-[#D9E7EC] text-[#001526] border-2 border-[#001526] rounded-full text-[16px] font-semibold hover:bg-[#001526] hover:text-white transition duration-200"
              onClick={() => {
                console.log("Changes saved");
                setSaveModalOpen(false);
              }}
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
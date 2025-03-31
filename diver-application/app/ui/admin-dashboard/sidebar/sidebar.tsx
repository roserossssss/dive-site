
"use client"

import { useState } from "react";
import { MdDashboard, MdSearch } from "react-icons/md";
import { CiLogout, CiSettings } from "react-icons/ci";
import { FaStore, FaHouseUser, FaFileMedical } from "react-icons/fa";
import { GiSnorkel } from "react-icons/gi";
import { TbCertificate } from "react-icons/tb";
import { IoAnalytics, IoClose, IoMenu } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import Link from "next/link";

import { usePathname } from "next/navigation";


const Itemmenu = [
  {
      title: "Dashboard",
      list: [
          { title: "Dashboard", path: "/Admin-Dashboard", icon: <MdDashboard /> }
      ],
  },
  {
      title: "Management",
      list: [
          { title: "User Management", path: "/Admin-Dashboard/UsersManagement", icon: <FaHouseUser/> },
          { title: "Dive Management", path: "/Admin-Dashboard/DiveManagement", icon: <GiSnorkel /> },
          { title: "Gallery", path: "/Admin-Dashboard/GalleryManagement", icon: <GrGallery/> },
          { title: "Certificates", path: "/Admin-Dashboard/CertificateManagement", icon: <TbCertificate /> },
          { title: "Medical Records", path: "/Admin-Dashboard/MedicalManagement", icon: <FaFileMedical /> },
      ],
  },
  {
      title: "Store",
      list: [
          { title: "Merch Store", path: "/Admin-Dashboard/Store", icon: <FaStore /> },
          { title: "Orders", path: "/Admin-Dashboard/Orders", icon: <FaStore /> },
      ],
  },
  {
      title: "Analytics",
      list: [
          { title: "Analytics ", path: "/Admin-Dashboard/AnalyticsPage", icon: <IoAnalytics/> }
      ],
  },
  {
      title: "Settings",
      list: [
          { title: "General Settings", path: "/Admin-Dashboard/SettingsPage", icon: <CiSettings /> },
          { title: "Logout", path: "/login", icon: <CiLogout />},
      ],
  },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    return (
      <>
        {/* Sidebar Toggle Button for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden fixed top-4 right-4 z-50 bg-white text-black p-2 rounded-full shadow-md"
        >
          {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
        </button>
  
        {/* Sidebar Header (Separate but Follows Sidebar State) */}
        <div
          className={`fixed top-0 left-0 w-64 md:w-72 bg-white p-4 flex items-center justify-center z-40 transition-transform duration-300  
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <img className="h-10 w-10" src="/images/dive_light_logo.svg" alt="Logo" />
          <span className="ml-2 text-[#001526] font-bold">MASTER LIVEBOARDS</span>
        </div>
  
        {/* Sidebar */}
        <div
          className={`fixed top-14 left-0 h-[calc(100%-56px)] w-64 md:w-72 flex flex-col text-black z-50 
          transition-transform duration-300 bg-[#001526] rounded-tr-3xl overflow-y-auto 
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          {/* Sidebar Menu */}
          <div className="mt-8 p-4">
            <ul>
              {Itemmenu.map((category) => (
                <li key={category.title} className="mb-3 relative -left-5">
                  <ul className="mb-8 mt-1 space-y-1">
                    {category.list.map((item) => (
                      <li key={item.title} className="relative text-center">
                        <Link
                          href={item.path}
                          className="flex gap-2 p-2 pl-12 text-white relative"
                          onClick={() => setIsOpen(false)}
                        >
                          {/* Active Page Indicator */}
                          <span
                            className={`absolute left-0 top-0 h-full w-8 rounded-r-lg 
                            ${pathname === item.path ? "bg-[#2C7DA0] block" : "hidden group-hover:block"}`}
                          ></span>
  
                          <span className="text-xl mr-4">{item.icon}</span>
                          <span className="text-sm">{item.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
  
          {/* User Profile Section */}
          <div className="m-4  flex items-center gap-2 p-2 rounded-lg bg-gray-100 ">
            <img src="/globe.svg" width="32" height="32" className="rounded-full" alt="User Avatar" />
            <div className="flex-1">
              <span className="block font-semibold text-black text-sm truncate">John Doe</span>
              <span className="text-gray-500 text-xs truncate">johndoe@gmail.com</span>
            </div>
            <Link href="/dashboard/ProfilePage/ProfileSettings">
              <span className="text-lg text-black cursor-pointer">...</span>
            </Link>
          </div>
        </div>
      </>
    );
  }
  
"use client";

import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { GiSnorkel } from "react-icons/gi";
import { TbCertificate } from "react-icons/tb";
import { FaFileMedical } from "react-icons/fa";
import { IoAnalytics, IoClose, IoMenu } from "react-icons/io5";
import { TfiGallery } from "react-icons/tfi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Itemmenu = [
  {
    title: "User Log",
    list: [
      { title: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
      { title: "Manage Dive", path: "/dashboard/DiveManagement", icon: <GiSnorkel /> },
      { title: "Gallery", path: "/dashboard/GalleryPage", icon: <TfiGallery /> },
    ],
  },
  {
    title: "Requirements",
    list: [
      { title: "Diving Certificate", path: "/dashboard/CertificatePage", icon: <TbCertificate /> },
      { title: "Medical Profile", path: "/dashboard/MedicalPage", icon: <FaFileMedical /> },
    ],
  },
  {
    title: "Account",
    list: [
      { title: "Settings", path: "/dashboard/SettingsPage", icon: <CiSettings /> },
      { title: "Logout", path: "/Authentication/login", icon: <IoAnalytics /> },
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

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 md:w-72 flex flex-col text-black z-50 
        transition-transform duration-300 ease-in-out bg-[#001526] rounded-3xl overflow-y-auto 
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Sidebar Header */}
        <div className=" md:flex bg-white p-4 items-center justify-center mb-2">
          <img className="h-10 w-10" src="../images/dive_light_logo.svg" alt="Logo" />
          <span className="ml-2 text-[#001526] font-bold">MASTER LIVEBOARDS</span>
        </div>

        {/* Sidebar Menu */}
        <div className="mt-14">
          <ul>
            {Itemmenu.map((category) => (
              <li key={category.title} className="mb-3 relative">
                <ul className="mb-14 mt-4 space-y-2">
                  {category.list.map((item) => (
                    <li key={item.title} className="relative text-center">
                      <Link
                        href={item.path}
                        className="flex gap-2 p-2 pl-12 text-white text-l relative"
                        onClick={() => setIsOpen(false)}
                      >
                        {/* Active Page Indicator */}
                        <span
                          className={`absolute left-0 top-0 h-full w-8 rounded-r-lg 
                          ${pathname === item.path ? "bg-[#2C7DA0] block" : "hidden group-hover:block"}`}
                        ></span>

                        <span className="text-2xl mr-4">{item.icon}</span>
                        <span className="truncate">{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* User Profile Section */}
        <div className="absolute left-2 bottom-4 flex items-center gap-2 p-2 rounded-lg bg-gray-100 w-[calc(100%-1rem)]">
          <img src="/globe.svg" width="32" height="32" className="rounded-full" alt="User Avatar" />
          <div className="flex-1">
            <span className="block font-semibold text-black text-sm truncate">John Doe</span>
            <span className="text-gray-500 text-xs truncate">johndoe@gmail.com</span>
          </div>
          <Link href="/dashboard/ProfilePage">
            <span className="text-lg text-black cursor-pointer">...</span>
          </Link>
        </div>
      </div>
    </>
  );
}

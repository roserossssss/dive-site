"use client";

import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { GiSnorkel } from "react-icons/gi";
import { PiCertificateFill } from "react-icons/pi";
import { IoAnalytics, IoClose, IoMenu } from "react-icons/io5";
import { IoPower } from "react-icons/io5";
import { FaNotesMedical, FaStore, FaUserCheck, FaUserCog, FaUserLock } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";

const Itemmenu = [
  {
    title: "HOME",
    list: [
      { title: "Dashboard", path: "/Admin-Dashboard", icon: <MdDashboard /> },
    ],
  },
  {
    title: "USER AND ACCESS CONTROL",
    list: [
      { title: "User Management", path: "/Admin-Dashboard/UsersManagement", icon: <FaUserCheck /> },
      { title: "Admin Management", path: "/Admin-Dashboard/AdminManagement", icon: <FaUserCog /> },
      { title: "Roles and Permission", path: "/Admin-Dashboard/RolesPermissions", icon: <FaUserLock /> },
    ],
  },
  {
    title: "DIVE SECTION",
    list: [
      { title: "Dive Management", path: "/Admin-Dashboard/DiveManagement", icon: <GiSnorkel /> },
      { title: "Certificates", path: "/Admin-Dashboard/CertificateManagement", icon: <PiCertificateFill /> },
    ],
  },
  {
    title: "HEALTH AND SAFETY",
    list: [
      { title: "Medical Records", path: "/Admin-Dashboard/MedicalManagement", icon: <FaNotesMedical /> },
    ],
  },
  // {
  //   title: "Store",
  //   list: [
  //     { title: "Merch Store", path: "/Admin-Dashboard/StoreManagement", icon: <FaStore /> },
  //     { title: "Orders", path: "/Admin-Dashboard/OrdersManagement", icon: <FaStore /> },
  //   ],
  // },
  {
    title: "INSIGHTS AND REPORTING",
    list: [
      { title: "Analytics", path: "/Admin-Dashboard/AnalyticsPage", icon: <IoAnalytics /> },
    ],
  },
  {
    title: "SETTINGS",
    list: [
      { title: "System Settings", path: "/Admin-Dashboard/SettingsPage", icon: <IoIosSettings /> },
      { title: "Log out", path: "/", icon: <IoPower /> },
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
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        className="md:hidden fixed top-4 right-4 z-50 bg-white text-black p-2 rounded-full shadow-md"
      >
        {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
      </button>

      {/* Sidebar Header (Separate but Follows Sidebar State) */}
      <div
        className={`fixed top-0 left-0 w-64 md:w-72 bg-[#001526] p-4 pb-8 flex items-center justify-center transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <Image
          className="h-12 w-12 mr-2 -mt-1"
          width={12}
          height={12}
          src="/images/dive_dark_logo.svg"
          alt="Logo"
        />
        <span className="mr-3 text-white text-sm md:text-base font-bold whitespace-nowrap">
          MASTER LIVEABOARDS
        </span>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-[4.5rem] left-0 h-[calc(100%-60px)] w-72 flex flex-col text-black z-50 
        transition-transform duration-300 ease-in-out bg-[#FDFDFD] rounded-tr-3xl overflow-hidden 
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Sticky Top Spacer */}
        <div className="sticky top-0 bg-[#FDFDFD] w-full h-[2rem] z-10"></div>

        {/* Sidebar Menu */}
        <div className="flex-1 overflow-y-auto p-4 pb-18">
          <ul>
            {Itemmenu.map((category) => (
              <li key={category.title} className="mb-3 relative -left-5">
                {/* Section Title */}
                <h4 className="text-[#001526] text-xs font-medium mb-2 pl-12">{category.title}</h4>
                <ul className="mb-8 mt-4 space-y-2">
                  {category.list.map((item) => (
                    <li key={item.title} className="relative text-center">
                      <Link
                        href={item.path}
                        className="flex gap-0 p-2 pl-12 text-[#001526] font-semibold text-[0.95rem] relative"
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

        {/* User Profile Section Wrapper */}
        <div className="bg-[#FDFDFD] w-full h-[4.9rem] relative">
          <Link href="">
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 p-[0.85rem] rounded-3xl bg-[#001526] cursor-pointer">
              <Image
                src="/images/sample_profile_pic.jpg"
                width="36"
                height="36"
                className="rounded-full ml-2"
                alt="User Avatar"
              />
              <div className="flex-1 flex flex-col">
                <span className="font-semibold text-white text-sm truncate">John Doe</span>
                <span className="text-white text-xs truncate">johndoe@gmail.com</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
"use client";

import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { GiSnorkel } from "react-icons/gi";
import { PiCertificateFill } from "react-icons/pi";
import { IoClose, IoMenu } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoPower } from "react-icons/io5";
import { FaNotesMedical } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import Image from 'next/image';

const Itemmenu = [
  {
    title: "User Log",
    list: [
      { title: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
      { title: "Manage Dive", path: "/dashboard/DiveManagement", icon: <GiSnorkel /> },
      { title: "Gallery", path: "/dashboard/GalleryPage", icon: <IoMdPhotos /> },
    ],
  },
  { 
    title: "Requirements",
    list: [
      { title: "Diving Certificate", path: "/dashboard/CertificatePage", icon: <PiCertificateFill /> },
      { title: "Medical Profile", path: "/dashboard/MedicalPage", icon: <FaNotesMedical /> },
    ],
  },
  {
    title: "Account",
    list: [
      { title: "Settings", path: "/dashboard/SettingsPage", icon: <IoIosSettings /> },
      { title: "Logout", path: "/Authentication/login", icon: <IoPower /> },
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
        className={`fixed top-0 left-0 w-64 md:w-72 bg-white p-4 flex items-center justify-center z-40 transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <img className="h-12 w-12 mr-2 -mt-1" src="/images/dive_light_logo.svg" alt="Logo" />
        <span className="mr-3 text-[#001526] text-sm md:text-base font-bold whitespace-nowrap">MASTER LIVEABOARDS</span>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-[4.5rem] left-0 h-[calc(100%-72px)] w-64 md:w-72 flex flex-col text-black z-50 
        transition-transform duration-300 ease-in-out bg-[#001526] rounded-tr-3xl overflow-y-auto 
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Sidebar Menu */}
        <div className="mt-4 md:mt-8 p-4">
          <ul>
            {Itemmenu.map((category) => (
              <li key={category.title} className="mb-3 relative -left-5">
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
        <Link href="/dashboard/ProfilePage/ProfileSettings">
          <div className="absolute left-4 bottom-5 flex items-center gap-4 p-[0.85rem] rounded-3xl bg-[#D9E7EC] w-[calc(100%-2rem)] cursor-pointer">
            <Image src="/images/sample_profile_pic.jpg" width="36" height="36" className="rounded-full ml-2" alt="User Avatar" />
            <div className="flex-1 flex flex-col">
              <span className="font-semibold text-black text-sm truncate">John Doe</span>
              <span className="text-[#001526] text-xs truncate">johndoe@gmail.com</span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

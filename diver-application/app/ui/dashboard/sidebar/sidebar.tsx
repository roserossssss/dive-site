"use client"

import { useState } from "react";
import { MdDashboard, MdSearch } from "react-icons/md";
import { CiUser, CiSettings } from "react-icons/ci";
import { GiSnorkel } from "react-icons/gi";
import { TbCertificate } from "react-icons/tb";
import { FaFileMedical } from "react-icons/fa";
import { IoAnalytics } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { IoClose, IoMenu } from "react-icons/io5";
import Link from "next/link";

const Itemmenu = [
    {
        title: "User Log",
        list: [
            { title: "Dashboard",
             path: "/dashboard",
             icon: <MdDashboard /> },
            { title: "Gallery", 
              path: "#", icon: <GrGallery /> },
            { title: "Dive Management",
             path: "/dashboard/DiveManagement", icon: <GiSnorkel /> },
        ],
    },
    {
        title: "Requirements",
        list: [
            { title: "Certificate Management", path: "/dashboard/CertificatePage", icon: <TbCertificate /> },
            { title: "Medical Management", path: "/dashboard/MedicalPage", icon: <FaFileMedical /> },
        ],
    },
    {
        title: "Analytics",
        list: [{ title: "Analytics Dashboard", path: "/dashboard/AnalyticsPage", icon: <IoAnalytics /> }],
    },
    {
        title: "Account",
        list: [
            { title: "Settings", path: "#", icon: <CiSettings /> },
            { title: "Logout", path: "/login", icon: <IoAnalytics /> },
        ],
    },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden absolute top-4 right-4 z-50 bg-white text-black p-2 rounded-full"
            >
                {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>

            
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white text-black p-4 transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform md:translate-x-0 md:relative md:w-72 overflow-y-auto`}
            >
                {/* Search Bar */}
                <div className="flex items-center bg-white p-2 rounded-lg mb-4">
                    <MdSearch className="text-black" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent text-white outline-none ml-2 w-full"
                    />
                </div>

                {/* Button */}
                <ul>
                    {Itemmenu.map((category) => (
                        <li key={category.title} className="mb-4">
                            <span className="text-gray-400 uppercase text-xs tracking-wider">{category.title}</span>
                            <ul className="mt-2 space-y-2">
                                {category.list.map((item) => (
                                    <li key={item.title}>
                                        <Link
                                            href={item.path}
                                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-500 transition shadow-black"
                                        >
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                ))}
                              
                                
                            </ul>
                            
                           
                        </li>
                    ))}
                     
                </ul>
                <div className="absolute bottom-4 left-2 flex items-center space-x-3 p-2 rounded-lg bg-gray-100 w-[calc(100%-2rem)]">
        <img src="/globe.svg" width="40" height="40" className="rounded-full" />
        <div className="flex-1">
            <span className="block font-semibold text-black">User Name</span>
            <span className="text-gray-500 text-sm">User email</span>
        </div>
        <Link href="/dashboard/ProfilePage">
            <span className="text-xl text-black cursor-pointer">...</span>
        </Link>
    </div>
               
            </aside>

            
        </>
    );
}

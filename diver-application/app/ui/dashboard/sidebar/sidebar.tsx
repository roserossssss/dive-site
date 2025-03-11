"use client";

import { useState } from "react";
import { MdDashboard, MdSearch } from "react-icons/md";
import { CiUser, CiSettings } from "react-icons/ci";
import { GiSnorkel } from "react-icons/gi";
import { TbCertificate } from "react-icons/tb";
import { FaFileMedical } from "react-icons/fa";
import { IoAnalytics, IoClose, IoMenu } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import Link from "next/link";

const Itemmenu = [
    {
        title: "User Log",
        list: [
            { title: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
            { title: "Gallery", path: "/dashboard/GalleryPage", icon: <GrGallery /> },
            { title: "Manage Dive", path: "/dashboard/DiveManagement", icon: <GiSnorkel /> },
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
            { title: "Settings", path: "/dashboard/SettingsPage", icon: <CiSettings /> },
            { title: "Logout", path: "/login", icon: <IoAnalytics /> },
        ],
    },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 right-4 z-50 bg-white text-black p-2 rounded-full shadow-md"
            >
                {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>

            
            <aside
                className={`fixed top-0 left-0 h-full w-64 md:w-72 bg-white text-black p-4 shadow-lg z-50 transform md:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform md:relative overflow-y-auto`}
            >
             <div className="flex items-center mb-4">
                    <img className="h-10 w-10" src="../images/sidebarlogo.svg" />
                    <span className={`ml-2 font-semibold transition-all ${isOpen ? "block" : "hidden md:block"}`}><a>Master</a> <a className="text-yellow-300">LiveBoards</a></span>
                </div>
                <div className="flex items-center p-2 rounded-lg mb-4 bg-slate-200">
                    <MdSearch className="text-black" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className={`bg-transparent text-black outline-none ml-2 w-full text-sm transition-all ${isOpen ? "block" : "hidden md:block"}`}
                    />
                </div>
                <ul>
                    {Itemmenu.map((category) => (
                        <li key={category.title} className="mb-3">
                            <span className="text-gray-400 uppercase text-xs tracking-wider block truncate">
                                {category.title}
                            </span>
                            <ul className="mt-2 space-y-1">
                                {category.list.map((item) => (
                                    <li key={item.title}>
                                        <Link
                                            href={item.path}
                                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-cyan-300 transition text-sm"
                                            onClick={() => setIsOpen(false)} // Close sidebar when a link is clicked
                                        >
                                            {item.icon}
                                            <span className="truncate">{item.title}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

                <div className="absolute bottom-4 left-2 flex items-center gap-2 p-2 rounded-lg bg-gray-100 w-[calc(100%-1rem)]">
                    <img src="/globe.svg" width="32" height="32" className="rounded-full" alt="User Avatar" />
                    <div className="flex-1">
                        <span className="block font-semibold text-black text-sm truncate">User Name</span>
                        <span className="text-gray-500 text-xs truncate">User email</span>
                    </div>
                    <Link href="/dashboard/ProfilePage">
                        <span className="text-lg text-black cursor-pointer">...</span>
                    </Link>
                </div>
            </aside>

           
            {/* {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )} */}
        </>
    );
}

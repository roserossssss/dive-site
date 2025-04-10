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
import Image from 'next/image';

const Itemmenu = [
    {
        title: "Dashboard",
        list: [{ title: "Dashboard", path: "/Admin-Dashboard", icon: <MdDashboard /> }],
    },
    {
        title: "Admin Management",
        list: [
            { title: "User Management", path: "/Admin-Dashboard/UsersManagement", icon: <CiUser /> },
            { title: "Dive Management", path: "/Admin-Dashboard/DiveManagement", icon: <GiSnorkel /> },
            { title: "Gallery Module", path: "/Admin-Dashboard/GalleryManagement", icon: <GrGallery /> },
        ],
    },
    {
        title: "Requirements",
        list: [
            { title: "Certificate Management", path: "/Admin-Dashboard/CertificateManagement", icon: <TbCertificate /> },
            { title: "Medical Management", path: "/Admin-Dashboard/MedicalManagement", icon: <FaFileMedical /> },
        ],
    },
    {
        title: "Analytics",
        list: [{ title: "Analytics Dashboard", path: "/Admin-Dashboard/AnalyticsPage", icon: <IoAnalytics /> }],
    },
    {
        title: "Account",
        list: [
            { title: "Settings", path: "/Admin-Dashboard/SettingsPage", icon: <CiSettings /> },
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
                className="md:hidden fixed top-4 right-4 z-50 bg-gray-900 text-white p-2 rounded-full shadow-md"
            >
                {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>

            <aside
                className={`fixed top-0 left-0 h-full w-64 md:w-72 bg-gray-900 text-white p-4 shadow-lg z-50 transform md:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform md:relative overflow-y-auto`}
            >
               <div className="flex items-center">
                    <Image width={12} height={12} className="h-12 w-12" src="../images/sidebarlogo.svg" alt={"admin section"} />
                    <span className={`ml-2 font-semibold transition-all ${isOpen ? "block" : "hidden md:block"}`}>Admin Panel</span>
                </div>
                <div className="flex items-center p-2 rounded-lg mb-4 bg-gray-800">
                    <MdSearch className="text-white" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className={`bg-transparent text-white outline-none ml-2 w-full text-sm transition-all ${isOpen ? "block" : "hidden md:block"}`}
                    />
                </div>
                <ul>
                    {Itemmenu.map((category) => (
                        <li key={category.title} className="">
                            <span className="text-gray-400 uppercase text-xs ">
                                {category.title}
                            </span>
                            <ul className="">
                                {category.list.map((item) => (
                                    <li key={item.title}>
                                        <Link
                                            href={item.path}
                                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-cyan-300 transition  text-sm"
                                            onClick={() => setIsOpen(false)}
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

                            <div className="flex absolute bottom-4 left-2 items-center gap-2 p-2 rounded-lg bg-gray-800 w-[calc(100%-1rem)]">
                    <Image src="/globe.svg" width="32" height="32" className="rounded-full" alt="User Avatar" />
                    <div className="flex-1">
                        <span className="block font-semibold  text-whitetext-sm truncate">User Name</span>
                        <span className="text-white text-xs truncate">User email</span>
                    </div>
                    <Link href="/Admin-Dashboard/ProfilePage">
                        <span className="text-lg text-white cursor-pointer">...</span>
                    </Link>
                </div>
            </aside>
                    
           
        </>
    );
}

import styles from "./sidebar.module.css";
import {MdDashboard, MdSearch, } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { GiSnorkel } from "react-icons/gi";
import { TbCertificate } from "react-icons/tb";
import { FaFileMedical } from "react-icons/fa";
import { IoAnalytics } from "react-icons/io5";
import MenuLink from "./menulink/menulink";

const Itemmenu = [
    {
        title: "ML Dive",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard />
            },
            {
                title: "Profile",
                path: "/dashboard/ProfilePage",
                icon: <CiUser />
            },
            {
                title: "Dive Management",
                path: "/dashboard/DiveManagement",
                icon: <GiSnorkel/>
            },
            {
                title: "Certificate Management",
                path: "/dashboard/CertificatePage",
                icon: <TbCertificate />
            },
            {
                title: "Medical Management",
                path: "/dashboard/MedicalPage",
                icon: <FaFileMedical />
            },
            {
                title: "Analytics",
                path: "/dashboard/AnalyticsPage",
                icon: <IoAnalytics />
            },
            {
                title: "Logout",
                path: "/login",
                icon: <IoAnalytics />
            },
        ],
       
    },
    
            
];


export default function Sidebar() {
    return (
        <div className={styles.container}>
            <div className={styles.containersearch}>
                <MdSearch/>
                <input type="text" placeholder="Search..." className={styles.input}></input> 
            </div>    
            <ul>
            {Itemmenu.map((cat)=>(
                <li key={cat.title}>
                    <span className={styles.cat}>{cat.title}</span>
                    {cat.list.map(item=>(
                        <MenuLink item={item} key={item.title} />
                    ))}
                </li>
            ))}
            </ul>

            <div className={styles.user}>
                <img className={styles.userimage} src="/globe.svg" width="50" height="50"/>
                <div className={styles.userDetail}>
                    <span className={styles.username}>User Name</span>
                    <span className={styles.userTitle}>User email</span>
                </div>
            </div>
        </div>


    );};
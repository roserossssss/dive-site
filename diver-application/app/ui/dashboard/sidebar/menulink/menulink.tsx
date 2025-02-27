"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './menulink.module.css';
import { JSX } from 'react';

interface MenuItem {
    title: string;
    path: string;
    icon?: JSX.Element;
}

const MenuLink: React.FC<{ item: MenuItem }> = ({ item }) => {
    const pathname = usePathname();

    return (
        <Link 
            href={item.path} 
            className={`${styles.container} ${pathname === item.path ? styles.active : ''}`}
        >
            {item.icon}
            <span>{item.title}</span>
        </Link>
    );
};

export default MenuLink;
import Link from 'next/link';
import styles from './menulink.module.css';
import { JSX } from 'react';

interface MenuItem {
    title: string;
    path: string;
    icon?: JSX.Element;
}

const MenuLink: React.FC<{ item: MenuItem }> = ({ item }) => (
    <Link href={item.path} className={styles.container}>
        {item.icon}
        <span>{item.title}</span>
    </Link>
);

export default MenuLink;

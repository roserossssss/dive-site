"use client";

import styles from './CardDisplayName.module.css';
import Image from 'next/image';
import Welcome from '@/public/images/db_welcome_user.svg';

export default function Card() {
  return (
    <div className="bg-[#2C7DA0] text-white p-8 rounded-lg shadow-md w-full h-auto mb-2 grid grid-cols-2">
        <div>
            <h1 className="text-3xl font-bold mb-2 text-bold">Welcome, John Doe!</h1>
            <p className="text-xs text-white text-opacity-70 mb-2 ">Stay updated with your dive history and make every <br /> dive count!</p>
            <a href="/dashboard/DiveManagement">
              <button>
                <p className="text-sm text-white bg-[#001526] rounded-lg p-1 text-center px-3 w-full font-semibold">Check Dive Logs →</p>
              </button>
            </a>
        </div>
      
        <div className="flex justify-center items-center">
          <div className={styles.logoContainer}>
            <Image src={Welcome} alt="Logo" className={styles.logo} />
          </div>
        </div>
    </div>
  );
}
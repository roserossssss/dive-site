"use client";

import Card from "@/app/ui/dashboard/card/card";
import Image from 'next/image';
import DestinationDiscovered from '@/public/images/db_destination.svg';
import styles from './Destinations.module.css';

const Destination = [
    {
      title: "Destination",
      value: 50,
      description: "DESTINATION DISCOVERED",
      icon: (
        <div className={styles.iconContainer}>
          <Image src={DestinationDiscovered} alt="Destination Discovered Icon" />
        </div>
      ),
    }
];

export default function Data1() {
  return (
    <div className="flex gap-4 flex-wrap">
      {Destination.map((category) => (
         <Card key={category.title} title={category.title} value={category.value} description={category.description} icon={category.icon} />
        ))}
    </div>
  );
}
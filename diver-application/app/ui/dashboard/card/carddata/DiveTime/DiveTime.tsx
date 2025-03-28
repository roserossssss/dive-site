
import Card from "@/app/ui/dashboard/card/card";
import Image from 'next/image';
import DiveTimeIcon from '@/public/images/db_dive_time.svg';
import styles from './DiveTime.module.css';

const DiveTime = [
    {
      title: "DiveTime",
      value: 10,
      description: "TOTAL DIVE TIME",
      icon: (
        <div className={styles.iconContainer}>
          <Image src={DiveTimeIcon} alt="Dive Time Icon" />
        </div>
      ),
    }
];

export default function Data3() {
  return (
    <div className="flex gap-4 flex-wrap">
      {DiveTime.map((category) => (
        <Card 
          key={category.title} 
          title={category.title} 
          value={category.value + 'hr'} 
          description={category.description} 
          icon={category.icon} />
      ))}
    </div>
  );
}
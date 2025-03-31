

import Card from "@/app/ui/dashboard/card/card";
import Image from 'next/image';
import DiveDepthIcon from '@/public/images/db_dive_depth.svg';
import styles from './Divedepth.module.css';

const Divedepth = [
    {
      title: "DiveDepth",
      value: 500,
      description: "TOTAL DIVE DEPTHS",
      icon: (
        <div className={styles.iconContainer}>
          <Image src={DiveDepthIcon} alt="Dive Depth Icon" />
        </div>
      ),
    }
];

export default function Data2() {
  return (
    <div className="flex gap-4 flex-wrap">
      {Divedepth.map((category) => (
        <Card key={category.title} title={category.title} value={category.value + 'm'} description={category.description} icon={category.icon} />
      ))}
    </div>
  );
}
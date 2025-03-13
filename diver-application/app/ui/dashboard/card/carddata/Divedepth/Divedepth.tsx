"use client";

import { FaUser, FaShoppingCart } from "react-icons/fa";
import Card from "@/app/ui/dashboard/card/card";

const Divedepth = [{

      title: "DiveDepth",
      value: 500,
      description: "TOTAL DIVE DEPTHS",
      icon: <FaUser />,

}];

export default function Data2() {
  return (
    <div className="flex gap-4 flex-wrap ">
      {Divedepth.map((category) => (
        <Card key={category.title} title={category.title} value={category.value + 'm'} description={category.description} icon={category.icon} />
      ))}
      
    </div>
  );
}
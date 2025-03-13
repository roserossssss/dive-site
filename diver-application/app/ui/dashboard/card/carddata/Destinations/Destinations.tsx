"use client";

import { FaUser } from "react-icons/fa";
import Card from "@/app/ui/dashboard/card/card";


const Destination = [
    {
      title: "Destination",
      value: 50,
      description: "DESTINATION DISCOVERED",
      icon: <FaUser />,
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
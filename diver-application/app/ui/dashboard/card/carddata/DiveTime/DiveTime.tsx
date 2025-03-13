import { FaUser, FaShoppingCart } from "react-icons/fa";
import Card from "@/app/ui/dashboard/card/card";


const DiveTime = [{

  title: "DiveTime",
  value: 10,
  description: "TOTAL DIVE TIME",
  icon: <FaUser />,

}];


export default function Data3() {
  return (
    <div className="flex gap-4 flex-wrap ">
          {DiveTime.map((category) => (
            <Card key={category.title} title={category.title} value={category.value + 'hr'} description={category.description} icon={category.icon} />
          ))}
          
        </div>
  );
}
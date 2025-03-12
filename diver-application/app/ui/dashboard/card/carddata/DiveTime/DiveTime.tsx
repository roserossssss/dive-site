import { FaUser, FaShoppingCart } from "react-icons/fa";
import Card from "@/app/ui/dashboard/card/card";

export default function Data3() {
  return (
    <div className="flex gap-4 flex-wrap">
      <Card title="Users" value={120} description="TOTAL DIVE TIME" icon={<FaUser />} />
    </div>
  );
}
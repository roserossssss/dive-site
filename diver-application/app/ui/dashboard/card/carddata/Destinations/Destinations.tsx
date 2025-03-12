import { FaUser } from "react-icons/fa";
import Card from "@/app/ui/dashboard/card/card";

export default function Data1() {
  return (
    <div className="flex gap-4 flex-wrap">
      <Card title="Destination" value={120} description="DESTINATION DISCOVERED" icon={<FaUser />} />
    </div>
  );
}
import React from "react";
import { FaArrowRight } from "react-icons/fa";

interface RecordsCardProps {
  title: string;
  subtitle: string;
  count: number;
  link: string;
  Icon: React.ElementType;
  iconSize?: string;
}

const RecordsCard: React.FC<RecordsCardProps> = ({ title, subtitle, count, link, Icon, iconSize = "2rem" }) => {
  return (
    <div className="bg-[#D9E7EC] shadow-md rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition-shadow md:px-6 md:py-4 px-8 py-5">
      {/* Left Section - Texts */}
      <div className="">
        <h3 className="text-xl font-bold text-[#001526]">{title}</h3>
        <p className="text-sm font-semibold text-[#001526] -mt-1">{subtitle}</p>
        <p className="text-[2.5rem] font-bold text-[#001526]">{count}</p>
      </div>

      {/* Right Section - Icons */}
      <div className="flex flex-col items-end md:-mr-[0.5rem]">
        {/* Arrow with diff adjustment */}
        <FaArrowRight
          style={{
            fontSize: "1.25rem",
            marginBottom: title === "TOTAL" ? "1.1rem" //mg for card with title 'TOTAL'
             : "0.6rem" //mg for card with title 'PENDING'
             ,
          }}
          className="text-[#001526]"
        />
        <Icon style={{ fontSize: iconSize }} className="text-[#001526] mt-3 -mr-1" />
      </div>
    </div>
  );
};

export default RecordsCard;
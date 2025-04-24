"use client";

interface CardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

export default function Card({value, description, icon }: CardProps) {
  return (
    <div className="bg-[#D9E7EC] mt-7 p-2 rounded-lg shadow-md w-96 h-auto mb-2 flex flex-1">
      <div className="flex items-center justify-center w-14 h-14 bg-[#001526] text-white rounded-md p-3 ml-2 mt-2 relative">
        <span className="text-[2rem] absolute">{icon}</span>
      </div>
      <div className="p-1 pt-1 pl-4">
        <h1 className="text-[1.8rem] font-extrabold -mb-[0.35rem]">{value}</h1>
        <p className="text-[14px] text-[#001526]">{description}</p>
      </div>
    </div>
  );
}
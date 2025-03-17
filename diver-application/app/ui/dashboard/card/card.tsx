"use client";

interface CardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

export default function Card({ title, value, description, icon }: CardProps) {
  return (
    <div className="bg-[#D9E7EC] p-4 rounded-lg shadow-md w-96 h-auto mb-2 flex flex-1">
      <div className="text-4xl mb-2 text-end pr-4">{icon}</div>
      <div>
      <h1 className="text-3xl font-extrabold">{value}</h1>
      <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

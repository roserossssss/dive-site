"use client";

interface CardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

export default function Card({ title, value, description, icon }: CardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full h-auto mb-2">
      {icon && <div className="text-4xl mb-2">{icon}</div>}
      <h2 className="text-gray-600 text-lg font-semibold">{title}</h2>
      <h1 className="text-3xl font-bold">{value}</h1>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
}

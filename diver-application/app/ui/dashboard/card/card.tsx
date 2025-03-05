"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "A", value: 25, color: "#A31D1D" },
  { name: "B", value: 25, color: "#A31D1D" },
  { name: "C", value: 25, color: "#A31D1D" },
  { name: "C", value: 25, color: "#A31D1D" },
  { name: "A", value: 25, color: "#A31D1D" },
  { name: "B", value: 25, color: "#A31D1D" },
  { name: "C", value: 25, color: "#A31D1D" },
  { name: "C", value: 25, color: "#A31D1D" },
  { name: "A", value: 25, color: "#A31D1D" },
  { name: "B", value: 25, color: "#A31D1D" },
  { name: "C", value: 25, color: "#A31D1D" },
  { name: "C", value: 25, color: "#A31D1D" },
  { name: "A", value: 25, color: "#A31D1D" },
  { name: "B", value: 25, color: "#A31D1D" },
  { name: "C", value: 25, color: "#A31D1D" },
  { name: "C", value: 25, color: "#A31D1D" },
  { name: "A", value: 25, color: "#A31D1D" },
  { name: "B", value: 25, color: "#A31D1D" },
  { name: "C", value: 25, color: "#A31D1D" },
  { name: "C", value: 25, color: "#A31D1D" },
  { name: "A", value: 25, color: "#A31D1D" },
  { name: "B", value: 25, color: "#A31D1D" },
  { name: "C", value: 25, color: "#A31D1D" },
  { name: "C", value: 25, color: "#A31D1D" },
];

const iR = 50; // Inner radius
const oR = 100; // Outer radius

export default function Card() {
  return (
    
    <div className="bg-white shadow-lg rounded-lg h-[900px]">
        <h1 className="text-black text-center">idk what to put here</h1>
        <h1 className="text-black text-center text-2xl">Awesome</h1>
      <ResponsiveContainer width="100%" height="20%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={1}
            data={data}
            cx="50%" // Center X
            cy="80%" // Center Y
            innerRadius={iR}
            paddingAngle={5}
            outerRadius={oR}
            fill="#8884d8"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <h1 className="text-black text-center">idk what to put here</h1>
      <h1 className="text-black text-center">idk what to put here</h1>
      <div>
      <div className="flex justify-center mt-4">
         <button className="bg-pink-600 text-white p-2 rounded-lg w-64">
                     See Analytics
         </button>
            </div>
      </div>
    </div>
  );
}

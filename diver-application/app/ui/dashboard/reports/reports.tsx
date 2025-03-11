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

const iR = 50; 
const oR = 100; 

export default function Card() {
  return (
    
    <div className="bg-white shadow-lg rounded-lg h-[600px] p-2">
        <h1 className="text-black text-center">Your score is</h1>
        <h1 className="text-black text-center text-2xl">Awesome</h1>
      <ResponsiveContainer width="100%" height="30%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={1}
            data={data}
            cx="50%" 
            cy="80%" 
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
      <h1 className="text-black text-center text-3xl font-bold relative -mt-16">60</h1>

      <h1 className="text-black text-center mt-10">idk what to put here</h1>
      <h3 className="text-black text-center text-sm">idk what to put here</h3>
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

"use client";
import style from "./chart.module.css";
import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from "recharts";

const data = [
  { name: "Monday", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Tuesday", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Wednesday", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Thursday", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Friday", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Saturday", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Sunday", uv: 3490, pv: 4300, amt: 2100 },
];

export default function Chart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-2">
      <h2 className="mb-2 font-semibold text-black">Your Dive Data</h2>
      
      <div className="w-full h-80">  
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill="#211C84" />
            <Bar dataKey="uv" stackId="a" fill="#D91656" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

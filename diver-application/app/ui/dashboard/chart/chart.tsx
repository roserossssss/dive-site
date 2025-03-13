"use client";
import React, { useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from "recharts";

const yearlyData = [
  { name: "Jan", time: 150, depth: 240 },
  { name: "Feb", time: 130, depth: 139 },
  { name: "Mar", time: 20, depth: 198 },
  { name: "Apr", time: 27, depth: 39 },
  { name: "May", time: 118, depth: 148 },
  { name: "Jun", time: 23, depth: 38 },
  { name: "Jul", time: 34, depth: 43 },
];

const monthlyData = [
  { name: "Week 1", time: 500, depth: 800 },
  { name: "Week 2", time: 450, depth: 750 },
  { name: "Week 3", time: 600, depth: 950 },
  { name: "Week 4", time: 700, depth: 1000 },
];

const dailyData = [
  { name: "6AM", time: 10, depth: 20 },
  { name: "12PM", time: 30, depth: 50 },
  { name: "6PM", time: 40, depth: 60 },
  { name: "12AM", time: 20, depth: 30 },
];

export default function Chart() {
  const [selectedTime, setSelectedTime] = useState("year");
  
  const getChartData = () => {
    if (selectedTime === "month") return monthlyData;
    if (selectedTime === "day") return dailyData;
    return yearlyData;
  };

  return (
    <div className="bg-[#D9E7EC] p-4 rounded-lg shadow-md mb-2">
      <div className="flex justify-between items-center">
        <h2 className="mb-2 font-bold text-3xl text-black">Your Dive Data</h2>
        

        <div className="relative">
          <select 
            value={selectedTime} 
            onChange={(e) => setSelectedTime(e.target.value)}
            className="text-sm text-white bg-[#001526] rounded-lg p-1 px-6"
          >
            <option value="year">Current Year</option>
            <option value="month">Current Month</option>
            <option value="day">Current Day</option>
          </select>
        </div>
      </div>

      <div className="w-full h-80 mt-4">  
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={getChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="depth" stackId="a" fill="#001526" />
            <Bar dataKey="time" stackId="a" fill="#2C7DA0" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

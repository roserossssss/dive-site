"use client";

import React, { useState } from "react";

import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from "recharts";

// Define an interface for your data points
interface ChartDataPoint {
  name: string;
  time: number;
  depth: number;
}

const yearlyData: ChartDataPoint[] = [
  { name: "Jan", time: 150, depth: 240 },
  { name: "Feb", time: 130, depth: 139 },
  { name: "Mar", time: 20, depth: 198 },
  { name: "Apr", time: 27, depth: 39 },
  { name: "May", time: 118, depth: 148 },
  { name: "Jun", time: 23, depth: 38 },
  { name: "Jul", time: 34, depth: 43 },
];

const monthlyData: ChartDataPoint[] = [
  { name: "Week 1", time: 500, depth: 800 },
  { name: "Week 2", time: 450, depth: 750 },
  { name: "Week 3", time: 600, depth: 950 },
  { name: "Week 4", time: 700, depth: 1000 },
];

const dailyData: ChartDataPoint[] = [
  { name: "6AM", time: 10, depth: 20 },
  { name: "12PM", time: 30, depth: 50 },
  { name: "6PM", time: 40, depth: 60 },
  { name: "12AM", time: 20, depth: 30 },
];

export default function Chart() {

  const [selectedTime, setSelectedTime] = useState<'year' | 'month' | 'day'>('year');


  const getChartData = (): ChartDataPoint[] => {
    if (selectedTime === "month") return monthlyData;
    if (selectedTime === "day") return dailyData;
    return yearlyData;
  };

  return (
    <div className="bg-[#D9E7EC] py-5 px-1 rounded-lg shadow-md mb-0 mt-[0.65rem] md:mt-4 w-full h-full mx-auto">
      <div className="lg:flex justify-between items-center md:ml-8">
        <h2 className="text-[#001526] text-2xl md:text-2xl p-2 font-bold text-center lg:text-left">Your Dive Data</h2>

      <div className="mt-2 lg:mt-0 flex justify-center md:mr-8">

          <select 
            aria-label="Select Time Range"
            id="timeSelect"
            value={selectedTime} 
            onChange={(e) => setSelectedTime(e.target.value as 'year' | 'month' | 'day')}
            className={`text-sm text-white bg-[#001526] rounded-lg p-1 px-6`}
          >
            <option value="year">Current Year</option>
            <option value="month">Current Month</option>
            <option value="day">Current Day</option>
          </select>
        </div>
      </div>

      <div className="w-full h-72 mt-2 -mx-2">  
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
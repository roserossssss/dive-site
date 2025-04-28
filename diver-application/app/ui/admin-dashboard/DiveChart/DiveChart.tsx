"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const diveSpotData = [
  { name: "Philippines", popularity: 120 },
  { name: "Maldives", popularity: 95 },
  { name: "Truk Lagoon", popularity: 80 },
  { name: "Palau", popularity: 70 },
  { name: "Thailand", popularity: 60 },
  { name: "Indonesia", popularity: 50 },
];

export default function DiveChart() {
  return (
    <div className="bg-[#D9E7EC] py-5 px-1 rounded-2xl shadow-md mb-0 mt-0 md:mt-0 w-full h-[22.75rem] mx-auto">
      <div className="lg:flex justify-between items-center md:ml-8">
        <h2 className="text-[#001526] text-2xl md:text-2xl p-2 font-bold text-center lg:text-left">
          Dive Spot Popularity
        </h2>
      </div>

      {/* Chart Container */}
      <div className="w-full h-[17rem] -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={diveSpotData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="popularity" fill="#2C7DA0" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
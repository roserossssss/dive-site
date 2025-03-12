"use client";
import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from "recharts";

const data = [
  { name: "Monday", time: 150, depth: 240, },
  { name: "Tuesday", time: 130, depth: 139, },
  { name: "Wednesday", time: 20, depth: 198,  },
  { name: "Thursday", time: 27, depth: 39,  },
  { name: "Friday", time: 118, depth: 148,  },
  { name: "Saturday", time: 23, depth: 38,  },
  { name: "Sunday", time: 34, depth: 43,  },
];

export default function Chart() {
  return (
    <div className="bg-[#D9E7EC] p-4 rounded-lg shadow-md mb-2">
      <h2 className="mb-2 font-bold text-3xl text-black">Your Dive Data</h2>
      
      <div className="w-full h-80">  
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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

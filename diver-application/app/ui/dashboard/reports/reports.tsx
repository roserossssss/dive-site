"use client";

import React from "react";

const CircularProgress: React.FC<{ progress: number }> = ({ progress }) => {
  const totalgoal = 100;
  const size = 350; // SVG size
  const strokeWidth = 45; // Circle thickness
  const radius = (size - strokeWidth) / 2; // Circle radius
  const circumference = 2 * Math.PI * radius; // Total circumference
  const offset = circumference - (progress / totalgoal) * circumference; // Progress calculation

  return (
    <div className="relative w-[150px] h-[120px] flex items-center justify-center mx-auto bg-[#001526] rounded-full">
  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
    {/* 🔷 Define Gradient for Stroke */}
    <defs>
      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#7C3AED" /> {/* Violet-600 */}
        <stop offset="100%" stopColor="#4F46E5" /> {/* Indigo-600 */}
      </linearGradient>
    </defs>

    <circle
      cx={size / 2}
      cy={size / 2}
      r={radius}
      stroke="#E0E0E0"
      strokeWidth={strokeWidth}
      fill="none"
    />


    <circle
      cx={size / 2}
      cy={size / 2}
      r={radius}
      stroke="url(#progressGradient)" // Apply the gradient
      strokeWidth={strokeWidth}
      fill="none"
      strokeDasharray={circumference}
      strokeDashoffset={offset}
      strokeLinecap="round"
      transform={`rotate(-90 ${size / 2} ${size / 2})`} // Start from top
    />
  </svg>

  <span className="absolute text-4xl font-bold text-center text-white">{progress}</span>
  <h1 className="absolute -mb-8 text-xs text-white mt-4 text-opacity-25 ">out of {totalgoal}</h1>
</div>
  );
};

export default function Card() {
  const data = { progress: 69 };

  return (
    <div className="bg-[#D9E7EC] shadow-lg rounded-lg h-[500px] pt-8">
      <h1 className="text-black text-center text-sm">Your score is</h1>
      <h1 className="text-black text-center text-2xl font-bold">Awesome</h1>

      <div className="mt-8">
        <CircularProgress progress={data.progress}/>
      </div>
      


      <h1 className="text-xs text-black text-center mt-10">
        Your score is based on the completed
      </h1>
      <h3 className="text-black text-center text-sm">{data.progress} Total Dives</h3>

      <div className="flex justify-center mt-4">
        <button>
          <p className="text-sm text-white bg-[#001526] rounded-lg p-1 text-center px-12 w-full">
            View My Perks
          </p>
        </button>
      </div>
    </div>
  );
}

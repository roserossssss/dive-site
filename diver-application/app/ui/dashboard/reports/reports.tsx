

import React from "react";

interface CircularProgressProps {
  progress: number;
  totalGoal?: number;
  label?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ 
  progress, 
  totalGoal = 100,
  label = "OUT OF"
}) => {
  const size = 150; // Reduced SVG size for better responsiveness
  const strokeWidth = 20; // Reduced stroke width
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / totalGoal) * circumference;

  //for the circular progress bar
  return (
    <div className="relative w-[210px] h-[210px] flex flex-col items-center justify-center mx-auto bg-[#001526] rounded-full shadow-md">
      <svg 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${size} ${size}`} 
        className="absolute top-0 left-0"
      >
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" /> 
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
        
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#334155" // Slightly darker background for better contrast
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      {/* Progress Text */}
      <div className="z-10 text-center">
        <span className="block text-5xl font-bold text-white">{progress}</span>
        <span className="block text-xs text-[#D9E7EC] mt-1">
          {label} {totalGoal}
        </span>
      </div>
    </div>
  );
};

export default function Card() {
  const data = { progress: 80 };

  return (
    <div className="bg-[#D9E7EC] shadow-lg rounded-2xl h-full p-8 w-full lg:max-w-[100%] flex flex-col justify-center items-center">
      <h1 className="text-[#001526] text-center text-[1rem] -mb-1">Your score is</h1>
      <h2 className="text-[#001526] text-center text-[1.75rem] font-bold">Awesome</h2>

      <div className="mt-8">
        <CircularProgress progress={data.progress} />
      </div>

      <h1 className="text-[0.85rem] text-[#001526] text-center mt-8">
        Your score is based on the <br />completed
      </h1>
      <h2 className="text-[#001526] font-bold text-center text-[1.1rem]">{data.progress} Total Dives</h2>

      <div className="flex justify-center mt-4 w-full px-10">
        <button className="w-full">
          <p className="text-sm text-white bg-[#001526] font-semibold rounded-lg p-3 text-center">
            View My Perks
          </p>
        </button>
      </div>
    </div>
  );
}
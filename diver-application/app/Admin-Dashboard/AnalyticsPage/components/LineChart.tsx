import React from 'react';

interface GraphData {
  active: number[];
  new: number[];
}

interface LineChartProps {
  graphData: GraphData;
  convertToPolylinePoints: (data: number[], height?: number, width?: number) => string;
}

const LineChart: React.FC<LineChartProps> = ({ graphData, convertToPolylinePoints }) => {
  return (
    <div className="bg-[#D9E4EB] py-7 px-8 rounded-xl text-[#0B1E2D]">
      <h2 className="font-semibold mb-4 text-[#001526]">Active / New Users</h2>
      <div className="relative w-full h-72 border border-gray-400 overflow-hidden">
        <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="w-full h-full">
          {[...Array(6)].map((_, i) => (
            <line key={i} x1="0" y1={(i * 200) / 5} x2="400" y2={(i * 200) / 5} stroke="#1E2A38" strokeWidth="1" />
          ))}
          {[...Array(7)].map((_, i) => (
            <line key={i} x1={(i * 400) / 6} y1="0" x2={(i * 400) / 6} y2="200" stroke="#1E2A38" strokeWidth="1" />
          ))}
          <polyline fill="none" stroke="#3B9FCC" strokeWidth="3" points={convertToPolylinePoints(graphData.new)} />
          <polyline fill="none" stroke="#2D3E50" strokeWidth="3" points={convertToPolylinePoints(graphData.active)} />
        </svg>
      </div>
      <div className=" flex gap-4 mt-3 text-sm text-[#1E2A38]">
        <div className="flex items-center gap-2 mt-3 font-semibold">
          <span className="w-3 h-3 bg-[#374957] text-[#001526] rounded-full"></span> Active Users
        </div>
        <div className="flex items-center gap-2 font-semibold mt-3">
          <span className="w-3 h-3 bg-[#2C7DA0] text-[#001526] rounded-full"></span> New Users
        </div>
      </div>
    </div>
  );
};

export default LineChart;
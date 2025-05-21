'use client';

import React, { useMemo, useState } from 'react';
import { GiTropicalFish } from 'react-icons/gi';
import { FiInfo } from 'react-icons/fi';

const stats = [
  { title: 'Profile Updates', count: '1,434', color: '#135184' },
  { title: 'App Session Started', count: '2,678', color: '#2C7DA0' },
  { title: 'Dive Logs', count: '534', color: '#6EB5CD' },
];

const activityLog = [
  ['Juan Dela Cruz', 'added a new dive at Pampanga', 'green'],
  ['George K. Miller', 'just logged in', 'yellow'],
  ['Luis Mendoza', 'added a new diving certificate', 'blue'],
  ['Kai Yamato', 'updated their personal details', 'red'],
  ['Arvin Cruz', 'used Master LiveAboards for the first time', 'purple'],
  ['Juan Dela Cruz', 'added a new dive at Pampanga', 'green'],
];

const colorMap = {
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  blue: 'bg-blue-500',
  red: 'bg-red-500',
  purple: 'bg-purple-500',
};

const dailyUserStats = [
  { label: 'Returning Users', value: 20, color: '#2D3E50' },
  { label: 'New Users', value: 15, color: '#3B9FCC' },
  { label: 'Inactive Users', value: 5, color: '#A7D2E9' },
];

const weeklyUserStats = [
  { label: 'Returning Users', value: 200, color: '#2D3E50' },
  { label: 'New Users', value: 100, color: '#3B9FCC' },
  { label: 'Inactive Users', value: 50, color: '#A7D2E9' },
];

const monthlyUserStats = [
  { label: 'Returning Users', value: 1000, color: '#2D3E50' },
  { label: 'New Users', value: 700, color: '#3B9FCC' },
  { label: 'Inactive Users', value: 150, color: '#A7D2E9' },
];

const dailyGraphData = {
  active: [30, 28, 25, 22, 20, 18, 15],
  new: [20, 19, 17, 14, 12, 10, 8],
};

const weeklyGraphData = {
  active: [160, 150, 140, 130, 120, 110, 100],
  new: [120, 130, 110, 70, 40, 60, 100],
};

const monthlyGraphData = {
  active: [180, 170, 160, 150, 140, 130, 120],
  new: [140, 160, 130, 100, 80, 90, 110],
};

const getPercentage = (value: number, total: number) =>
  total === 0 ? 0 : Math.round((value / total) * 100);

const AnalyticsDashboard = () => {
  const [timeframe, setTimeframe] = useState<'Daily' | 'Weekly' | 'Monthly'>('Weekly');

  const selectedUserStats =
    timeframe === 'Daily'
      ? dailyUserStats
      : timeframe === 'Weekly'
      ? weeklyUserStats
      : monthlyUserStats;

  const graphData =
    timeframe === 'Daily'
      ? dailyGraphData
      : timeframe === 'Weekly'
      ? weeklyGraphData
      : monthlyGraphData;

  const totalUsers = useMemo(
    () => selectedUserStats.reduce((acc, item) => acc + item.value, 0),
    [selectedUserStats]
  );

  const percentages = useMemo(
    () =>
      selectedUserStats.map((stat) => ({
        ...stat,
        percentage: getPercentage(stat.value, totalUsers),
      })),
    [selectedUserStats, totalUsers]
  );

  const convertToPolylinePoints = (data: number[], height = 200, width = 400) => {
    return data
      .map((val, idx) => {
        const x = (idx * width) / (data.length - 1);
        const y = height - (val / Math.max(...data)) * height;
        return `${x},${y}`;
      })
      .join(' ');
  };

  return (
    <div className="fixed top-0 left-0 w-full z-10 p-4 rounded-t-2xl md:pl-80 h-screen overflow-hidden">
      <div className="h-full overflow-y-auto pr-2">
        <h2 className="text-xl lg:text-2xl font-bold text-white text-center md:text-left mt-2 mb-4">
          Analytics Management
        </h2>

        <div className="flex justify-center lg:justify-end mb-4">
          <div className="flex gap-2 mt-4 lg:mt-0">
            {['Daily', 'Weekly', 'Monthly'].map((label) => (
              <button
                key={label}
                onClick={() => setTimeframe(label as 'Daily' | 'Weekly' | 'Monthly')}
                className={`px-4 py-1 text-sm font-semibold rounded-md border ${
                  timeframe === label
                    ? 'bg-[#2C7DA0] text-white border-[#2C7DA0]'
                    : 'bg-[#D9E4EB] text-[#0B1E2D] border-gray-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-start">
          <div className="w-full max-w-[1600px]">
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
              {/* Line Chart */}
              <div className="bg-[#D9E4EB] p-6 rounded-xl text-[#0B1E2D]">
                <h2 className="font-semibold mb-4">Active / New Users</h2>
                <div className="relative w-full h-64 border border-gray-400 overflow-hidden">
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

                <div className="flex gap-4 mt-4 text-sm text-[#1E2A38]">
                  <div className="flex items-center gap-2 ml-7 mt-3 font-semibold">
                    <span className="w-3 h-3 bg-[#374957] rounded-full"></span> Active Users
                  </div>
                  <div className="flex items-center gap-2 font-semibold mt-3">
                    <span className="w-3 h-3 bg-[#2C7DA0] rounded-full"></span> New Users
                  </div>
                </div>
              </div>

              {/* User Categories with Tooltip*/}
              <div className="bg-[#D9E4EB] p-6 rounded-xl text-[#0B1E2D] flex flex-col justify-between">
                <h2 className="font-semibold text-lg mb-4">User Categories</h2>

                <div className="relative w-full h-60 flex justify-center items-center mb-6 overflow-visible">
                  {percentages.map((stat, i) => {
                    const size = 72 + stat.percentage;
                    const positionStyles = [
                      'left-1/2 -translate-x-1/2 z-20',
                      'left-[52%] bottom-[5%] z-30',
                      'left-[35%] top-[10%] z-30',
                    ];

                    return (
                      <div
                        key={i}
                        className={`absolute ${positionStyles[i]} group`}
                        style={{ width: `${size}px`, height: `${size}px` }}
                      >
                        <div
                          className="flex items-center justify-center text-white font-semibold border-2 md:border-4 border-[#D9E4EB] rounded-full text-xs md:text-sm w-full h-full transition-all duration-300"
                          style={{ backgroundColor: stat.color }}
                        >
                          {stat.percentage}%
                        </div>

                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full mr-2 px-3 py-1 bg-[#2C7DA0] text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-[9999] shadow-md whitespace-nowrap">
                          {`${stat.label}: ${stat.value} users`}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between border-t-2 border-[#C4D6DE] pt-4 text-center text-sm font-semibold">
                  {selectedUserStats.map((item, i) => (
                    <div
                      key={i}
                      className={`flex-1 ${
                        i === 0
                          ? 'pr-2 border-r-2'
                          : i === 2
                          ? 'pl-2 border-l-2'
                          : 'px-2'
                      } border-[#C4D6DE]`}
                    >
                      <div className="text-xl">{item.value}</div>
                      <div className="text-xs text-gray-500 mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards and History */}
        <div className="mt-6 grid md:grid-cols-[2fr_2fr] gap-6 w-full overflow-hidden">
          <div className="flex flex-col gap-4 overflow-hidden">
            {stats.map((item, index) => (
              <div key={index} className="bg-[#D9E4EB] p-4 rounded-xl flex items-center justify-between shadow-md sm:h-36 md:h-32 relative group">
                <div className="flex gap-4 items-start w-full">
                  <div className="flex-shrink-0 self-center sm:self-start ml-2 lg:ml-12 mt-7">
                    <GiTropicalFish size={55} color={item.color} />
                  </div>
                  <div className="flex flex-col gap-4 w-full mx-auto">
                    <div className="text-lg md:text-lg lg:text-xl font-bold text-[#001526] flex items-center whitespace-nowrap gap-1 -mt-2 -ml-20 relative">
                      {item.title}
                      <div className="relative group">
                        <FiInfo className="w-4 h-4 text-[#374957] cursor-pointer" />
                        <div className="absolute top-full left-full mt-1 -ml-1 w-max max-w-xs px-3 py-2 bg-[#2C7DA0] text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 shadow-md">
                          {`This shows the total number of ${item.title.toLowerCase()}.`}
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-[#001526] mt-1">{item.count}</div>
                  </div>
                </div>
                <div className="w-20 h-12 sm:w-24 sm:h-14 md:w-16 md:h-10 lg:w-32 lg:h-16 -ml-16 flex-shrink-0">
                  <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full">
                    <polyline fill="none" stroke="#3B9FCC" strokeWidth="2" points="0,30 20,20 40,25 60,15 80,10 100,20" />
                    <polyline fill="rgba(59,159,204,0.2)" stroke="none" points="0,50 0,30 20,20 40,25 60,15 80,10 100,20 100,50" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* History Section */}
          <div className="bg-[#D9E4EB] rounded-2xl p-4 w-full shadow-lg self-start h-[300px] md:h-[415px] overflow-hidden">
            <div className="flex justify-between items-center border-b-2 border-[#C4D6DE] pb-2 mb-5 mt-2">
              <h3 className="font-semibold text-[#001526] text-lg -mt-1">History</h3>
              <span className="text-sm font-semibold text-gray-500 -mt-1">Showing: All</span>
            </div>
            <ul className="space-y-6 text-sm text-[#001526] overflow-y-auto max-h-[290px] px-2 min-w-0">
              {activityLog.map(([name, action, color], idx) => (
                <li className="flex items-start justify-between gap-2" key={idx}>
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <span className={`w-2 h-2 rounded-full mt-1 ${colorMap[color]}`}></span>
                    <p>
                      <span className="font-semibold mr-2">{name}</span>
                      <span className="text-gray-600">{action}</span>
                    </p>
                  </div>
                  <span className="text-gray-400 font-semibold text-sm whitespace-nowrap">3 hrs ago</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

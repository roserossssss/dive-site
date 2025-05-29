'use client';

import React, { useMemo, useState } from 'react';
import LineChart from './components/LineChart';
import UserCategories from './components/UserCategories';
import StatsCards from './components/StatsCards';
import HistorySection from './components/HistorySection';

const stats = [
  {
    title: 'Profile Updates',
    color: '#135184',
    data: {
      Daily: 143,
      Weekly: 1434,
      Monthly: 5430,
    },
    trend: {
      Daily: [10, 20, 15, 18, 22, 24, 28],
      Weekly: [100, 150, 130, 140, 160, 170, 180],
      Monthly: [200, 250, 220, 230, 240, 260, 270],
    },
  },
  {
    title: 'Sessions Started',
    color: '#2C7DA0',
    data: {
      Daily: 268,
      Weekly: 2678,
      Monthly: 8678,
    },
    trend: {
      Daily: [30, 25, 28, 32, 35, 38, 40],
      Weekly: [300, 350, 320, 330, 340, 360, 370],
      Monthly: [600, 650, 620, 630, 640, 660, 670],
    },
  },
  {
    title: 'Dive Logs',
    color: '#6EB5CD',
    data: {
      Daily: 53,
      Weekly: 534,
      Monthly: 2134,
    },
    trend: {
      Daily: [5, 10, 8, 12, 15, 14, 16],
      Weekly: [50, 70, 65, 60, 75, 80, 90],
      Monthly: [100, 130, 120, 140, 150, 160, 180],
    },
  },
];

const activityLog = [
  { name: 'Juan Dela Cruz', action: 'added a new dive at Pampanga', color: 'green', type: 'Dive Added' },
  { name: 'George K. Miller', action: 'just logged in', color: 'yellow', type: 'Logged In' },
  { name: 'Luis Mendoza', action: 'added a new diving certificate', color: 'blue', type: 'Certificate Added' },
  { name: 'Kai Yamato', action: 'updated their personal details', color: 'red', type: 'Personal Details Updated' },
  { name: 'Arvin Cruz', action: 'used Master LiveAboards for the first time', color: 'purple', type: 'Used LiveAboards' },
  { name: 'Juan Dela Cruz', action: 'added a new dive at Pampanga', color: 'green', type: 'Dive Added' },
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
  { label: 'New Users', value: 15, color: '#3295BF' },
  { label: 'Inactive Users', value: 5, color: '#257192' },
];

const weeklyUserStats = [
  { label: 'Returning Users', value: 200, color: '#2D3E50' },
  { label: 'New Users', value: 100, color: '#3295BF' },
  { label: 'Inactive Users', value: 50, color: '#257192' },
];

const monthlyUserStats = [
  { label: 'Returning Users', value: 1000, color: '#2D3E50' },
  { label: 'New Users', value: 700, color: '#3295BF' },
  { label: 'Inactive Users', value: 150, color: '#257192' },
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
  const [historyFilter, setHistoryFilter] = useState('All');
  const activityTypes = ['All', ...new Set(activityLog.map((a) => a.type))];
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
    <div className="text-[#001526] lg:px-4 lg:ml-1 lg:pt-[2rem] relative">
      {/* Top Header */}
      <div className="fixed top-0 left-0 w-full bg-[#001526] z-40 p-4 rounded-t-2xl md:pl-80">
        <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-white text-center md:text-left mt-2">
          Analytics Management
        </h2>
      </div>

      {/* Main Content */}
      <div className="mt-10">
        {/* Timeframe Buttons */}
        <div className="flex justify-center lg:justify-end mb-4">
          <div className="flex gap-2 mt-4 lg:-mt-4">
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

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[2fr_1fr] md:grid-cols-1 gap-x-4 gap-y-4">
          {/* Line Chart */}
          <LineChart graphData={graphData} convertToPolylinePoints={convertToPolylinePoints} />

          {/* User Categories */}
          <UserCategories percentages={percentages} selectedUserStats={selectedUserStats} />
        </div>

        {/* Stats Cards and History Section */}
        <div className="mt-4 grid md:grid-cols-[2fr_2fr] gap-x-4 gap-y-4 w-full overflow-hidden">
          {/* Stats Cards */}
          <StatsCards stats={stats} timeframe={timeframe} />

          {/* History Section */}
          <HistorySection
            activityLog={activityLog}
            activityTypes={activityTypes}
            colorMap={colorMap}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
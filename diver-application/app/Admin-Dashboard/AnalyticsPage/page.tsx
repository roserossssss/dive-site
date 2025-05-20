import React from 'react';
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

const AnalyticsDashboard = () => {
  return (
    <div className="w-full min-h-screen p-4 rounded-t-2xl md:ml-1 overflow-y-auto">
      <h2 className="text-xl lg:text-2xl font-bold text-white text-center md:text-left -mt-3 mb-4">
        Analytics Management
      </h2>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-[#D9E4EB] p-6 rounded-xl text-[#0B1E2D]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Active / New Users</h2>
            <span className="text-sm text-[#1E2A38]">This Week</span>
          </div>

          <div className="relative w-full h-64 sm:h-72 md:h-80 border border-gray-400">
            <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="w-full h-full">
              {[...Array(6)].map((_, i) => (
                <line key={i} x1="0" y1={(i * 200) / 5} x2="400" y2={(i * 200) / 5} stroke="#1E2A38" strokeWidth="1" />
              ))}
              {[...Array(7)].map((_, i) => (
                <line key={i} x1={(i * 400) / 6} y1="0" x2={(i * 400) / 6} y2="200" stroke="#1E2A38" strokeWidth="1" />
              ))}

              <polyline fill="none" stroke="#3B9FCC" strokeWidth="3" points="0,120 66,130 133,110 200,70 266,40 333,60 400,100" />
              <polyline fill="none" stroke="#2D3E50" strokeWidth="3" points="0,160 66,150 133,140 200,130 266,120 333,110 400,100" />
            </svg>

            <div className="absolute bottom-2 left-0 w-full flex justify-between text-xs text-[#0B1E2D] px-4">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
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

        {/* User Categories */}
        <div className="bg-[#D9E4EB] p-6 rounded-xl text-[#0B1E2D] flex flex-col justify-between">
          <h2 className="font-semibold text-lg mb-4 text-center">User Categories</h2>

          <div className="relative w-full h-52 flex justify-center items-center mb-6">
            <div className="absolute w-44 h-44 bg-[#2D3E50] rounded-full flex items-center justify-center text-white text-medium z-10 left-1/2 -translate-x-1/2">
              70%
            </div>
            <div className="absolute w-32 h-32 bg-[#3B9FCC] rounded-full flex items-center justify-center text-white text-meedium border-4 border-[#D9E4EB] z-20 left-[55%] bottom-[1%]">
              40%
            </div>
            <div className="absolute w-20 h-20 bg-[#A7D2E9] rounded-full flex items-center justify-center text-white text-medium border-4 border-[#D9E4EB] z-30 left-[35%] top-[5%]">
              12%
            </div>
          </div>

          <div className="flex justify-between border-t-2 border-[#C4D6DE] pt-4 text-center text-sm font-semibold">
            {[
              { label: 'Returning Users', value: 200 },
              { label: 'New Users', value: 10 },
              { label: 'Inactive Users', value: 50 },
            ].map((item, i) => (
              <div key={i} className={`flex-1 ${i === 0 ? 'pr-2 border-r-2' : i === 2 ? 'pl-2 border-l-2' : 'px-2'} border-[#C4D6DE]`}>
                <div className="text-xl">{item.value}</div>
                <div className="text-xs text-gray-500 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats + History Section */}
      <div className="mt-6 grid md:grid-cols-2 gap-6 w-full">
        {/* Stats Cards */}
        <div className="flex flex-col gap-4">
          {stats.map((item, index) => (
            <div key={index} className="bg-[#D9E4EB] p-4 rounded-xl flex items-center justify-between shadow-md sm:h-36 md:h-32">
              <div className="flex gap-4 items-start w-full">
                <div className="ml-12 mt-7 flex-shrink-0">
                  <GiTropicalFish size={44} color={item.color} />
                </div>

                <div className="flex flex-col justify-between w-full">
                  <div className="text-xl font-bold text-[#001526] flex items-center gap-1 -mt-3 -ml-20">
                    {item.title}
                    <FiInfo className="w-4 h-4 text-[#374957]" />
                  </div>
                  <div className="text-3xl font-bold ml-1 mt-4 text-[#001526]">{item.count}</div>
                </div>
              </div>

              <div className="w-24 h-12 ml-2 flex-shrink-0">
                <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full">
                  <polyline fill="none" stroke="#3B9FCC" strokeWidth="2" points="0,30 20,20 40,25 60,15 80,10 100,20" />
                  <polyline fill="rgba(59,159,204,0.2)" stroke="none" points="0,50 0,30 20,20 40,25 60,15 80,10 100,20 100,50" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* History Section */}
        <div className="bg-[#D9E4EB] rounded-2xl p-4 w-full shadow-lg self-start h-auto min-h-[250px] md:h-[415px]">
          <div className="flex justify-between items-center border-b-2 border-[#C4D6DE] pb-2 mb-5 mt-2">
            <h3 className="font-semibold text-[#001526] text-lg -mt-1">History</h3>
            <span className="text-sm font-semibold text-gray-500 -mt-1">Showing: All</span>
          </div>

          <ul className="space-y-8 text-sm text-[#001526] overflow-y-auto max-h-[290px] pr-2">
            {activityLog.map(([name, action, color], idx) => (
              <li className="flex items-start justify-between gap-2" key={idx}>
                <div className="flex items-start gap-2 flex-1">
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
  );
};

export default AnalyticsDashboard;

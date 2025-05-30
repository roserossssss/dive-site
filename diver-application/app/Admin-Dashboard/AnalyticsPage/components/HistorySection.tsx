import React, { useState } from 'react';

// Define types for props
interface ActivityLogEntry {
  name: string;
  action: string;
  color: string;
  type: string;
}

interface HistorySectionProps {
  activityLog: ActivityLogEntry[];
  activityTypes: string[];
  colorMap: Record<string, string>;
}

const HistorySection: React.FC<HistorySectionProps> = ({ activityLog, activityTypes, colorMap }) => {
  const [historyFilter, setHistoryFilter] = useState('All');

  return (
    <div className="bg-[#D9E4EB] rounded-2xl p-4 w-full shadow-lg self-start h-[300px] md:h-[415px] overflow-hidden">
      <div className="flex justify-between items-center border-b-2 border-[#C4D6DE] pb-3 mb-4 mt-2">
        <h3 className="font-semibold text-[#001526] text-medium md:text-sm lg:text-lg -mt-2 px-2">History</h3>

        {/* Grouping Showing + Dropdown */}
        <div className="flex items-center text-sm md:text-xs font-medium text-gray-700 gap-2 ml-auto -mt-2">
          <span>Showing:</span>
          <div className="relative">
            <select
              className="bg-[#2C7DA0] text-white border-b-2 border-[#C4D6DE] rounded-md py-1.5 pl-3 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 appearance-none transition-all truncate w-[90px] md:w-[70px] lg:w-[200px] cursor-pointer"
              value={historyFilter}
              onChange={(e) => setHistoryFilter(e.target.value)}
            >
              {activityTypes.map((type) => (
                <option key={type} value={type} className="text-white">
                  {type}
                </option>
              ))}
            </select>

            {/* Custom Dropdown Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <svg
                className="w-4 h-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.292l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.66a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <ul className="space-y-6 text-sm text-[#001526] overflow-y-auto max-h-[190px] sm:max-h-[305px] px-4">
        {activityLog
          .filter(({ type }) => historyFilter === 'All' || type === historyFilter)
          .map(({ name, action, color }, idx) => (
            <li className="flex items-start justify-between gap-2" key={idx}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2 flex-1 min-w-0">
                <div className="flex items-start gap-2 min-w-0">
                  <span
                    className={`min-w-[8px] min-h-[8px] w-2 h-2 rounded-full mt-1 shrink-0 ${colorMap[color]}`}
                  ></span>
                  <div className="min-w-0">
                    <span className="font-semibold text-xs md:text-sm mr-2 block">{name}</span>
                    <span className="text-gray-600 text-xs md:text-sm block">{action}</span>
                  </div>
                </div>
              </div>
              <span className="text-xs md:text-sm text-gray-400 font-semibold whitespace-nowrap mt-1 sm:mt-0">
                3 hrs ago
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HistorySection;
import React from 'react';
import { GiTropicalFish } from 'react-icons/gi';
import { FiInfo } from 'react-icons/fi';

const StatsCards = ({ stats, timeframe }: any) => {
  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      {stats.map((item: any, index: number) => {
        const count = item.data[timeframe];
        const sparkPoints = item.trend[timeframe]
          .map((val: number, idx: number) => {
            const x = (idx * 100) / (item.trend[timeframe].length - 1);
            const y = 50 - (val / Math.max(...item.trend[timeframe])) * 50;
            return `${x},${y}`;
          })
          .join(' ');

        return (
          <div
            key={index}
            className="bg-[#D9E4EB] p-4 rounded-xl flex items-center justify-between shadow-md sm:h-36 md:h-32 relative group"
          >
            <div className="flex gap-4 items-start w-full">
              {/* Icon */}
              <div
                className="flex-shrink-0 self-center text-6xl md:text-5xl lg:text-[55px] sm:self-start ml-2 lg:ml-5 mt-7"
                style={{ color: item.color }}
              >
                <GiTropicalFish />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1 w-full">
                {/* Title with Tooltip */}
                <div className="text-lg md:text-sm lg:text-xl font-bold text-[#001526] flex items-center whitespace-nowrap gap-1 -mt-2 -ml-20 z-50 relative">
                  {item.title}
                  <div className="relative group">
                    <FiInfo className="w-4 h-4 text-[#374957] cursor-pointer" />
                    <div className="absolute top-full left-full mt-1 -ml-1 w-max max-w-xs px-3 py-2 bg-[#2C7DA0] text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 shadow-md">
                      {`This shows the total number of ${item.title.toLowerCase()}.`}
                    </div>
                  </div>
                </div>
                <div className="text-xl md:text-xl lg:text-2xl font-bold text-[#001526] mt-4 md:-ml-2">
                  {count.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Sparkline */}
            <div className="w-20 h-12 sm:w-24 sm:h-14 md:w-10 md:h-8 lg:w-32 lg:h-16 flex-shrink-0">
              <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full">
                <polyline fill="none" stroke="#3B9FCC" strokeWidth="2" points={sparkPoints} />
                <polyline fill="rgba(59,159,204,0.2)" stroke="none" points={`0,50 ${sparkPoints} 100,50`} />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
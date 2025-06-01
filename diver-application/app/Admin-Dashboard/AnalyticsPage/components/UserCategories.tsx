import React from 'react';

interface Percentage {
  label: string;
  value: number;
  color: string;
  percentage: number;
}

interface UserStat {
  label: string;
  value: number;
  color: string;
}

interface UserCategoriesProps {
  percentages: Percentage[];
  selectedUserStats: UserStat[];
}

const UserCategories: React.FC<UserCategoriesProps> = ({ percentages, selectedUserStats }) => {
  return (
    <div className="bg-[#D9E4EB] p-6 rounded-xl text-[#0B1E2D] flex flex-col justify-between">
      <h2 className="font-semibold text-lg mb-4">User Categories</h2>
      <div className="relative w-full h-60 flex justify-center items-center mb-6 overflow-visible">
        {percentages.map((stat, i) => {
          const size = 55 + stat.percentage;
          const positionStyles = [
            'left-1/2 -translate-x-1/2 z-20',
            'left-[50%] bottom-[5%] z-30',
            'left-[37%] top-[10%] z-30',
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
            <div className="text-lg md:text-sm lg:text-lg">{item.value}</div>
            <div className="text-sm md:text-xs lg:text-medium text-gray-500 mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCategories;
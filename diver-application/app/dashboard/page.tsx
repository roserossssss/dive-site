import { Suspense } from "react";

import Reports from "../ui/dashboard/reports/reports";
import Chart from "../ui/dashboard/chart/chart";
import CardDisplayName from "../ui/dashboard/CardDisplayName/CardDisplayName";
import Destinations from "../ui/dashboard/card/carddata/Destinations/Destinations";
import Divedepth from "../ui/dashboard/card/carddata/Divedepth/Divedepth";
import Divetime from "../ui/dashboard/card/carddata/DiveTime/DiveTime";

export default function Dashboard() {
  return (
    <div className="text-black lg:p-4 p-1 relative">
      {/* Top Header (Loads Immediately) */}
      <div className="fixed top-0 left-0 w-full bg-white z-10 p-4 rounded-t-2xl md:pl-80">
        <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-[#001526] text-center md:text-left mt-2">
          Dashboard
        </h2>
      </div>

      

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 gap-2 items-center mt-4 md:mt-2 py-2 md:pt-6">
        {/* Scrollable Carousel */}
        <div className="carousel-center flex lg:grid lg:grid-cols-3 gap-4 overflow-x-auto scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-[#001526]">
          <div className="flex-shrink-0 w-full min-w-[300px] md:min-w-0 md:w-auto">
            <Destinations />
          </div>
          <div className="flex-shrink-0 w-full min-w-[300px] md:min-w-0 md:w-auto">
            <Divedepth />
          </div>
          <div className="flex-shrink-0 w-full min-w-[300px] md:min-w-0 md:w-auto">
            <Divetime />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-[2.05fr_1fr] md:grid-cols-1 gap-x-2 -mt-4 md:-mt-0">
        {/* Left side */}
        <div className="mt-4 md:mt-0 mb-0 md:mb-2 md:h-full flex flex-col md:pr-1 md:pl-0">
          <Suspense fallback={<p className="text-center">Loading widgets...</p>}>
            <CardDisplayName />
          </Suspense>

          <Suspense fallback={<p className="text-center">Loading chart...</p>}>
            <Chart />
          </Suspense>
        </div>

        {/* Right side */}
        <div className="lg:mt-0 md:mt-4 mt-4 md:mb-2 md:h-full md:pl-1 md:pr-0">
          <Suspense fallback={<p className="text-center">Loading reports...</p>}>
            <Reports />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
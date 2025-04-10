import { Suspense } from "react";

import Reports from "../ui/dashboard/reports/reports";
import Chart from "../ui/dashboard/chart/chart";
import CardDisplayName from "../ui/dashboard/CardDisplayName/CardDisplayName";
import Destinations from "../ui/dashboard/card/carddata/Destinations/Destinations";
import Divedepth from "../ui/dashboard/card/carddata/Divedepth/Divedepth";
import Divetime from "../ui/dashboard/card/carddata/DiveTime/DiveTime";

export default function Dashboard() {
    return (
        <div className="text-black lg:p-5 p-1 relative">
            {/* Top Header (Loads Immediately) */}
            <div className="fixed top-0 left-0 w-full bg-white z-10 p-4 md:pl-80">
                <h1 className="text-3xl text-black p-2 font-extrabold">Dashboard</h1>
            </div>

{/* Dashboard Cards */}
    <div className="grid grid-cols-1 gap-2 items-center mt-4 pt-8">
    {/* Scrollable Carousel */}
            <div className="carousel-center flex gap-2 overflow-x-auto scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-[#001526] p-2">
                 <div className="flex gap-2">
                    <div className="w-full min-w-[300px]"><Destinations /></div>
                    <div className="w-full min-w-[300px]"><Divedepth /></div>
                    <div className="w-full min-w-[300px]"><Divetime /></div>
                </div>
            </div>
    </div>

            

            {/* Main Grid */}
            <div className="grid lg:grid-cols-[auto_1fr] md:grid-cols-1">
                {/* Left side */}
                <div className="mt-4 mb-4">
                    <Suspense fallback={<p className="text-center">Loading widgets...</p>}>
                        <CardDisplayName />
                    </Suspense>

                    <Suspense fallback={<p className="text-center ">Loading chart...</p>}>
                        <Chart />
                    </Suspense>
                </div>

                {/* Right side */}
                <div className="w-auto mt-2">
                    <Suspense fallback={<p className="text-center">Loading reports...</p>}>
                        <Reports />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

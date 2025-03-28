import { Suspense } from "react";

import Reports from "../ui/dashboard/reports/reports";
import Chart from "../ui/dashboard/chart/chart";
import CardDisplayName from "../ui/dashboard/CardDisplayName/CardDisplayName";
import Destinations from "../ui/dashboard/card/carddata/Destinations/Destinations";
import Divedepth from "../ui/dashboard/card/carddata/Divedepth/Divedepth";
import Divetime from "../ui/dashboard/card/carddata/DiveTime/DiveTime";

export default function Dashboard() {
    return (
        <div className="text-black p-5 relative">
            {/* Top Header (Loads Immediately) */}
            <div className="fixed top-0 left-0 w-full bg-white z-10 p-4 md:pl-80">
                <h1 className="text-3xl text-black p-2 font-extrabold">Dashboard</h1>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 gap-2 items-center mt-4 pt-8">
                <div className="carousel carousel-center ">
                    {/* Top Header of dashboard */}
                    <div className="carousel-item gap-2">
                        <a id="item1" className="w-full"><Destinations /></a>
                        <a id="item2" className="w-full"><Divedepth /></a>
                        <a id="item3" className="w-full"><Divetime /></a>
                    </div>
                </div>
            </div>

            {/* Mobile Pagination */}
            <div className="lg:hidden flex w-full justify-center gap-2 py-2">
                <a href="#item1" className="btn btn-xs bg-[#001526] text-white">1</a>
                <a href="#item2" className="btn btn-xs bg-[#001526] text-white">2</a>
                <a href="#item3" className="btn btn-xs bg-[#001526] text-white">3</a>
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-[auto_1fr] md:grid-cols-1">
                {/* Left side (Critical Components Preloaded) */}
                <div className="mt-4 mb-4">
                    <Suspense fallback={<p className="text-center">Loading widgets...</p>}>
                        <CardDisplayName />
                    </Suspense>

                    <Suspense fallback={<p className="text-center">Loading chart...</p>}>
                        <Chart />
                    </Suspense>
                </div>

                {/* Right side (Reports, Preloaded) */}
                <div className="w-auto mt-2">
                    <Suspense fallback={<p className="text-center">Loading reports...</p>}>
                        <Reports />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

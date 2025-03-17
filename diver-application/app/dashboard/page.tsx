import Reports from "../ui/dashboard/reports/reports";
import Card from "../ui/dashboard/card/card"
import styles from "../ui/dashboard/dashboard.module.css";
import Chart from "../ui/dashboard/chart/chart";
import CardDisplayName from "../ui/dashboard/CardDisplayName/CardDisplayName"

//Topbar
import Destinations from "../ui/dashboard/card/carddata/Destinations/Destinations"
import Divedepth from "../ui/dashboard/card/carddata/Divedepth/Divedepth"
import Divetime from "../ui/dashboard/card/carddata/DiveTime/DiveTime"

export default function Dashboard() {
    return (
        <div className="text-black">
            <h1 className="text-3xl text-black p-2">Dashboard</h1>
            <div className="grid grid-cols-1 gap-2 items-center">
            <div className="carousel carousel-center ">
            <div className="carousel-item gap-2">
                <a id="item1" className="w-full"><Destinations /></a>
                <a id="item2" className="w-full"><Divedepth /></a>
                <a id="item3" className="w-full"><Divetime /></a>
                </div>
                </div>
                {/* Add "Add more widget" here soon */}
            </div>
            <div className="lg:hidden flex w-full justify-center gap-2 py-2">
                <a href="#item1" className="btn btn-xs bg-[#001526] text-white">1</a>
                <a href="#item2" className="btn btn-xs bg-[#001526] text-white">2</a>
                <a href="#item3" className="btn btn-xs bg-[#001526] text-white">3</a>
            </div>
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-x-2 items-start gap-1">
                    {/* Left side*/}        
                    <div className="lg:w-[800px] mb-2">
                    <CardDisplayName />
                    </div>
                    {/* Right side flex-1 h-auto min-w-0*/}
                    <div className="w-auto">
                        <Reports />
                    </div>
                    <div className="lg:w-[800px] lg:-mt-80 md:-mt-72">
                    <Chart />
                    </div>
                </div>

        </div>
    );
}

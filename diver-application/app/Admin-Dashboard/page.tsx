import { Suspense } from "react";

import WelcomeCard from "../ui/admin-dashboard/WelcomeCard/WelcomeCard";
import RecordsCard from "../ui/admin-dashboard/RecordsCard/RecordsCard";
import RecentDiveLogs from "../ui/admin-dashboard/DiveLogs/DiveLogs";
import DiveChart from "../ui/admin-dashboard/DiveChart/DiveChart";

import { FaUserAstronaut } from "react-icons/fa";
import { LiaCertificateSolid } from "react-icons/lia";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { FaAnchorCircleCheck } from "react-icons/fa6";

export default function AdminDashboard() {
  return (
    <div className="text-[#001526] lg:px-4 pt-[0.75rem] relative">
      {/* Top Header (Dashboard Title) */}
      <div className="fixed top-0 left-0 w-full bg-[#001526] z-10 p-4 rounded-t-2xl md:pl-80">
        <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-white text-center md:text-left mt-2">
          Dashboard
        </h2>
      </div>

      {/* Main Content */}
      <div className="mt-10">
        {/* Top Header (Welcome Card) */}
        <div className="mb-4 md:pt-0">
          <WelcomeCard />
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 gap-2 items-center mb-4">
          <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
            <RecordsCard
              title="TOTAL"
              subtitle="NUMBER OF DIVERS"
              count={4353}
              link="/Admin-Dashboard/UsersManagement"
              Icon={FaUserAstronaut}
              iconSize="2.8rem"
            />
            <RecordsCard
              title="PENDING"
              subtitle="DIVE CERTIFICATIONS"
              count={15}
              link="/Admin-Dashboard/AdminManagement"
              Icon={LiaCertificateSolid}
              iconSize="3.5rem"
            />
            <RecordsCard
              title="PENDING"
              subtitle="MEDICAL CERTIFICATIONS"
              count={30}
              link="/Admin-Dashboard/MedicalManagement"
              Icon={MdOutlineHealthAndSafety}
              iconSize="3.5rem"
            />
            <RecordsCard
              title="TOTAL"
              subtitle="COMPLETED DIVES"
              count={4985}
              link="/Admin-Dashboard/DiveManagement"
              Icon={FaAnchorCircleCheck}
              iconSize="3.2rem"
            />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[2fr_1fr] md:grid-cols-1 gap-x-4">
          {/* Left side (Dive Chart) */}
          <div className="md:h-full flex flex-col">
            <Suspense fallback={<p className="text-center">Loading chart...</p>}>
              <DiveChart />
            </Suspense>

          </div>

          {/* Right side (Recent Dive Logs) */}
          <div className="md:h-full">
            <Suspense fallback={<p className="text-center">Loading recent dive logs...</p>}>
              <RecentDiveLogs />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
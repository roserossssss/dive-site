"use client";

import { useRouter } from "next/navigation";

const DiveCertification = () => {
  const router = useRouter();

  return (
    <div className="flex-1 p-10 pt-0 relative">
      <h2 className="text-4xl font-bold text-black flex items-center gap-2">
        My Dive Certification
      </h2>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <img src="/leftarrow.svg" alt="Left Arrow" className="w-6 h-6 cursor-pointer" />
          <img src="/rightarrow.svg" alt="Right Arrow" className="w-6 h-6 cursor-pointer" />

          <button
            onClick={() => router.push("/dashboard/CertificatePage/NewCertificate")}
            className="bg-[#001526] text-white px-6 py-2 rounded-full flex items-center gap-2"
          >
            <img src="/plus.svg" alt="Plus" className="w-3 h-3" />
            New Certificate
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <input type="text" placeholder="Search" className="border rounded-full px-4 py-2 w-64" />
            <img src="/search.svg" alt="Search" className="absolute right-3 top-2 w-5 h-5" />
          </div>

          <button className="bg-[#001526] text-white px-5 py-3 rounded-full flex items-center gap-2">
            <img src="/sort.svg" alt="Sort" className="w-4 h-4" />
            Sort
          </button>

          <button className="bg-[#001526] text-white px-5 py-3 rounded-full flex items-center gap-2">
            <img src="/filter.svg" alt="Filter" className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center min-w-[500px] min-h-[870px] bg-[#D9E7EC] border rounded-3xl">
        <div className="text-center">
          <div className="w-40 h-40 border-2 border-black rounded-full mx-auto"></div>
          <p className="text-5xl text-black font-bold mt-4">No Certifications Yet</p>
          <p className="text-black text-xl mt-7">
            You haven’t added any certifications. Start tracking your dive qualifications here!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiveCertification;

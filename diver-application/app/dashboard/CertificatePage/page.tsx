"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Certificate {
  id: number;
  name: string;
  level: string;
  agency: string;
  location: string;
  image: string;
}

const DiveCertification = () => {
  const router = useRouter();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCertId, setSelectedCertId] = useState<number | null>(null);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  useEffect(() => {
    requestIdleCallback(() => {
      const storedCertificates = localStorage.getItem("certificates");
      if (storedCertificates) {
        setCertificates(JSON.parse(storedCertificates));
      }
    });
  }, []);  


  // Sort function
  const handleSort = (type: string) => {
    let sortedCertificates = [...certificates];

    if (type === "name") {
      sortedCertificates.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === "level") {
      sortedCertificates.sort((a, b) => a.level.localeCompare(b.level));
    }

    setCertificates(sortedCertificates);
    setSortDropdownOpen(false);
  };

  // Filter function
  const handleFilter = (agency: string | null) => {
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") ?? "[]");

    if (agency) {
      setCertificates(storedCertificates.filter((cert: Certificate) => cert.agency === agency));
    } else {
      setCertificates(storedCertificates);
    }

    setFilterDropdownOpen(false);
  };

  // Delete a certificate
  const deleteCertificate = () => {
    if (selectedCertId !== null) {
      const updatedCertificates = certificates.filter((cert) => cert.id !== selectedCertId);
      setCertificates(updatedCertificates);
      localStorage.setItem("certificates", JSON.stringify(updatedCertificates));
      setShowDeleteModal(false);
    }
  };

  const updateCertificate = (id: number) => {
    router.push(`/dashboard/CertificatePage/UpdateCertificate?id=${id}`);
  };

  return (
    <div className="flex-1 p-5 pt-2 relative">
      {/* Header Section */}
      <div className="fixed top-0 left-0 w-full bg-white z-10 px-4 py-3 sm:px-6 md:pl-80 lg:pl-80">
        <h1 className="text-xl md:text-xl lg:text-2xl font-bold text-[#001526] text-center md:text-left mt-2">My Diving Certificate</h1>
        </div>

      <div className="flex items-center justify-between gap-1 md:gap-4 mt-14 flex-nowrap">
        <div className="flex items-center space-x-1">
          <img src="/leftarrow.svg" alt="" aria-hidden="true" className="w-4 md:w-7 lg:w-8 h-5 sm:h-6 md:h-7 lg:h-8 cursor-pointer -ml-3 -mt-1" />
          <img src="/rightarrow.svg" alt="" aria-hidden="true" className="w-4 md:w-7 lg:w-8 h-5 sm:h-6 md:h-7 lg:h-8 cursor-pointer -ml-3 -mt-1" />
          <button
            onClick={() => router.push("/dashboard/CertificatePage/NewCertificate")}
            className="flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 text-xs md:sm font-medium text-white bg-[#001526] rounded-full shadow-md transition duration-200 w-10 md:w-16 lg:w-52 h-6 md:h-12 lg:h-12"
            aria-label="Add a new certificate"
          >
            <img src="/plus.svg" alt="" aria-hidden="true" className="w-3 md:w-4 lg:w-5 h-3 md:h-4 lg:h-3.5 -mt-0.5" />
            <span className="text-xs md:text-base lg:text-lg sm: ml-0.5 md:-ml-0.5 lg:-ml-1 hidden lg:inline">New Certificate</span>
          </button>
        </div>

        <div className="flex items-center gap-8">
        <div className="relative group">
        <input
          type="text"
          placeholder="Search"
          className="relative flex items-center border border-[#001526] placeholder-[#001526] bg-white text-black rounded-full 
            w-20 md:w-32 lg:w-70 h-7 md:h-12 lg:h-12 pl-4 pr-10 text-xs sm:text-base 
            focus:ring-2 focus:ring-black focus:border-blue-500 
            ml-auto transition-all duration-300 ease-in-out 
            group-hover:w-40 group-focus-within:w-60 md:group-hover:w-60 md:group-focus-within:w-80"
          aria-label="Search certificate"
        />
        <img 
          src="/search.svg" 
          alt="Search" 
          className="absolute right-2 lg:right-5 top-1/2 transform -translate-y-1/2 
            w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6"
        />
      </div>


          <div className="flex items-center gap-2 md:gap-2 flex-1 justify-end">

          {/* Sort Dropdown */}
          <div className="relative ">
            <button
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="bg-[#001526] text-white w-10 md:w-16 lg:w-28 h-7 md:h-12 lg:h-54 rounded-full flex items-center justify-center gap-2 text-xs md:text-sm lg:text-lg -ml-7"
              aria-label="Sort certificates"
            >
              <img src="/sort.svg" alt="" aria-hidden="true" className="w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7"/>
              <span className="hidden lg:inline">Sort</span>
            </button>
            {sortDropdownOpen && (
              <div className="absolute right-20 mt-2 bg-white shadow-lg rounded-lg z-50">
                <button
                  onClick={() => handleSort("name")}
                  className="block w-28 text-left px-7 py-3 rounded-lg text-medium text-[#001526] hover:bg-[#001526] hover:bg-opacity-40 mx-auto"
                >
                  Name
                </button>
                <button
                  onClick={() => handleSort("level")}
                  className="block w-28 text-left px-7 py-2 rounded-lg text-medium text-[#001526] hover:bg-[#001526] hover:bg-opacity-40 mx-auto"
                >
                  Level
                </button>
              </div>
            )}
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
              className="bg-[#001526] text-white  w-10 md:w-16 lg:w-28 h-7 md:h-12 lg:h-54 rounded-full flex items-center justify-center gap-2 text-xs md:text-sm lg:text-lg"
              aria-label="Filter certificates"
            >
              <img src="/filter.svg" alt="" aria-hidden="true" className="w-4 md:w-5 lg:w-7 h-4 md:h-5 lg:h-7"/> 
              <span className="hidden lg:inline">Filter</span>
            </button>
            {filterDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg  z-50">
                <button
                  onClick={() => handleFilter(null)}
                  className="block w-24 text-left px-7 py-2 rounded-lg text-medium text-[#001526]hover:bg-[#001526] hover:bg-opacity-50 mx-auto"
                >
                  All
                </button>
                <button
                  onClick={() => handleFilter("ACUC")}
                  className="block w-24 text-left px-7 py-2 rounded-lg text-medium text-[#001526] hover:bg-[#001526] hover:bg-opacity-50 mx-auto"
                >
                  ACUC
                </button>
                <button
                  onClick={() => handleFilter("BSAC")}
                  className="block w-24 text-left px-7 py-2 rounded-lg text-medium text-[#001526] hover:bg-[#001526] hover:bg-opacity-50 mx-auto"
                >
                  BSAC
                </button>
                <button
                  onClick={() => handleFilter("CMAS")}
                  className="block w-24 text-left px-7 py-2 rounded-lg text-medium text-[#001526] hover:bg-[#001526] hover:bg-opacity-50 mx-auto"
                >
                  CMAS
                </button>
                <button
                  onClick={() => handleFilter("GUE")}
                  className="block w-24 text-left px-7 py-2 rounded-lg text-medium text-[#001526] hover:bg-[#001526] hover:bg-opacity-50 mx-auto"
                >
                  GUE
                </button>
                <button
                  onClick={() => handleFilter("IANTD")}
                  className="block w-24 text-left px-7 py-2 rounded-lg text-medium text-[#001526] hover:bg-[#001526] hover:bg-opacity-50 mx-auto"
                >
                  IANTD
                </button>
                <button
                  onClick={() => handleFilter("NASE")}
                  className="block w-24 text-left px-7 py-2 rounded-lg text-medium text-[#001526] hover:bg-[#001526] hover:bg-opacity-50 mx-auto"
                >
                  NASE
                </button>
                <button
                  onClick={() => handleFilter("NAUI")}
                  className="block w-24 text-left px-7 py-2 rounded-lg text-medium text-[#001526] hover:bg-[#001526] hover:bg-opacity-50 mx-auto"
                >
                  NAUI
                </button>
                <button
                  onClick={() => handleFilter("PADI")}
                  className="block w-24 text-left px-7 py-2 rounded-lg text-medium text-[#001526] hover:bg-[#001526] hover:bg-opacity-50 mx-auto"
                >
                  PADI
                </button>
                <button
                  onClick={() => handleFilter("RADI")}
                  className="block w-24 text-left px-7 py-2 rounded-lg text-medium text-[#001526] hover:bg-[#001526] hover:bg-opacity-50 mx-auto"
                >
                  RADI
                </button>
                <button
                  onClick={() => handleFilter("SDI")}
                  className="block w-24 text-left px-7 py-2 rounded-lg text-medium text-[#001526] hover:bg-[#001526] hover:bg-opacity-50 mx-auto"
                >
                  SDI
                </button>
                <button
                  onClick={() => handleFilter("SSI")}
                  className="block w-24 text-left px-7 py-2 rounded-lg text-medium text-[#001526] hover:bg-[#001526] hover:bg-opacity-50 mx-auto"
                >
                  SSI
                </button>
                <button
                  onClick={() => handleFilter("TDI")}
                  className="block w-24 text-left px-7 py-2 rounded-lg text-medium text-[#001526] hover:bg-[#001526] hover:bg-opacity-50 mx-auto"
                >
                  TDI
                </button>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>

   {/* Certification Display */}
<div className="mt-4 bg-[#D9E7EC] border rounded-3xl p-6 sm:p-8 md:p-10 w-full min-h-[80vh]">
  {certificates.length === 0 ? (
    <div className="flex items-center justify-center w-full min-h-[80vh] text-center">
      <div>
        <div className="w-36 h-36 border-2 border-[#001526] rounded-full mx-auto"></div>
        <p className="text-3xl sm:text-4xl font-bold text-[#001526] mt-5">
          No Certifications Yet
        </p>
        <p className="text-lg sm:text-xl text-[#001526] mt-6">
          You haven’t added any certifications.
        </p>
        <p className="text-lg sm:text-xl text-[#001526] mt-1">
          Start tracking your dive qualifications here!
        </p>
      </div>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {certificates.map((cert) => (
        <div key={cert.id} className="bg-[#2C7DA0] rounded-2xl p-4 shadow-lg relative">
          <div className="relative">
            <img
              src={cert.image}
              alt="Certificate"
              loading="lazy"
              className="w-full max-w-xs h-auto rounded-xl border-4 border-white"
            />
            <button
              onClick={() => setMenuOpen(menuOpen === cert.id ? null : cert.id)}
              className="absolute bottom-0 right-2 translate-y-20"
            >
              <img src="/threedots.svg" alt="Menu" className="w-6 h-6" />
            </button>

            {menuOpen === cert.id && (
              <div className="absolute bottom-[-3rem] right-2 bg-white shadow-lg rounded-lg p-2 w-32">
                <button
                  onClick={() => updateCertificate(cert.id)}
                  className="block w-full text-left px-4 py-2 rounded-lg text-[#001526] hover:bg-[#2C7DA0] hover:bg-opacity-50"
                  
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setSelectedCertId(cert.id);
                    setShowDeleteModal(true);
                  }}
                  className="block w-full text-left px-4 py-2 rounded-lg text-[#001526] hover:bg-[#2C7DA0] hover:bg-opacity-50"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

                      {/* Certificate Details */}
                      <div className="text-center mt-4">
                        <p className="text-lg font-bold text-white">{cert.name}</p>
                        <p className="text-white italic">{cert.level}</p>
                        <p className="text-white">{cert.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
              <div className="fixed inset-0 bg-[#001526] bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-[#D9E7EC] p-6 rounded-3xl shadow-lg w-full max-w-xl h-auto text-center">
                  <div className="flex justify-center mb-4">
                    <img src="/trash-delete.svg" alt="Delete" className="w-20 h-20 mt-10" />
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-bold text-[#001526] mt-6">Delete Certificate?</h2>
                  <p className="text-lg text-gray-600 mt-4">This action cannot be undone.</p>

                  <div className="mt-10 flex justify-center space-x-4">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="w-40 h-12 border-[#001526] border-2 rounded-full font-semibold text-[#001526] hover:bg-[#001526] hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={deleteCertificate}
                      className="w-40 h-12 border-[#001526] border-2 rounded-full font-semibold text-[#001526] hover:bg-[#001526] hover:text-white"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            )}

    </div>
  );
};

export default DiveCertification;


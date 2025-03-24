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

  // Load certificates from localStorage
  useEffect(() => {
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
    setCertificates(storedCertificates);
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
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");

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
      <h2 className="text-3xl font-bold text-[#001526]">My Dive Certification</h2>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <img src="/leftarrow.svg" alt="Left Arrow" className="w-7 h-7 cursor-pointer mt-3" />
          <img src="/rightarrow.svg" alt="Right Arrow" className="w-7 h-7 cursor-pointer mt-3" />
          <button
            onClick={() => router.push("/dashboard/CertificatePage/NewCertificate")}
            className="bg-[#001526] text-white px-6 py-3 rounded-full flex items-center gap-2 mt-4"
          >
            <img src="/plus.svg" alt="Plus" className="w-3 h-3 -mt-1 -ml-2" />
            New Certificate
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-full px-5 py-2 w-[300px]"
            />
            <img src="/search.svg" alt="Search" className="absolute right-3 top-2 w-6 h-6" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="bg-[#001526] text-white px-5 py-3 rounded-full flex items-center gap-3"
            >
              <img src="/sort.svg" alt="Sort" className="w-4 h-4" />
              Sort
            </button>
            {sortDropdownOpen && (
              <div className="absolute right-20 mt-2 bg-white shadow-lg rounded-lg w-[100px] h-[75px] z-50">
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
              className="bg-[#001526] text-white px-5 py-3 rounded-full flex items-center gap-3"
            >
              <img src="/filter.svg" alt="Filter" className="w-4 h-4" />
              Filter
            </button>
            {filterDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-[90px] h-[398px] z-50">
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

     {/* Certification Display */}
      <div className="mt-6 min-w-[500px] min-h-[870px] bg-[#D9E7EC] border rounded-3xl p-10 ">
        {certificates.length === 0 ? (
          <div className="flex items-center justify-center min-h-[700px] text-center">
            <div>
              <div className="w-[250px] h-[250px] border-2 border-[#001526] rounded-full mx-auto"></div>
              <p className="text-5xl text-[#001526] font-bold mt-20">No Certifications Yet</p>
              <p className="text-[#001526] text-xl mt-6">
                You haven’t added any certifications. 
              </p>
              <p className="text-[#001526] text-xl mt-1"> 
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
                    className="w-[250px] h-[470px] w-full rounded-xl border-4 border-white"
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
                        className="block w-full text-left px-4 py-2 rounded-lg text-medium text-[#001526] hover:bg-[#2C7DA0] hover:bg-opacity-50"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCertId(cert.id);
                          setShowDeleteModal(true);
                        }}
                        className="block w-full text-left px-4 py-2 rounded-lg text-medium text-[#001526] hover:bg-[#2C7DA0] hover:bg-opacity-50"
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
          <div className="bg-[#D9E7EC] p-6 rounded-3xl shadow-lg w-[680px] h-[600px] text-center">

            <div className="flex justify-center mb-4">
              <img src="/trash-delete.svg" alt="Delete" className="w-50 h-50 mt-40" />
            </div>

            <h2 className="text-5xl font-bold text-[#001526] mt-10">Delete Certificate?</h2>
            <p className="text-xl font-semibold text-gray-600 mt-4">This action cannot be undone.</p>

            <div className="mt-20 flex justify-center space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-48 h-14 border border-[#001526] border-2 rounded-full font-semibold text-[#001526] hover:bg-[#001526] hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={deleteCertificate}
                className="w-48 h-14 border border-[#001526] border-2 rounded-full font-semibold text-[#001526] hover:bg-[#001526] hover:text-white"
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


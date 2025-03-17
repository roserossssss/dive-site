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

  // Load certificates from localStorage
  useEffect(() => {
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
    setCertificates(storedCertificates);
  }, []);

  // Delete a certificate
  const deleteCertificate = () => {
    if (selectedCertId !== null) {
      const updatedCertificates = certificates.filter((cert) => cert.id !== selectedCertId);
      setCertificates(updatedCertificates);
      localStorage.setItem("certificates", JSON.stringify(updatedCertificates));
      setShowDeleteModal(false); g
    }
  };

  const updateCertificate = (id: number) => {
    router.push(`/dashboard/CertificatePage/UpdateCertificate?id=${id}`);
  };

  return (
    <div className="flex-1 p-10 pt-0 relative">
      {/* Header Section */}
      <h2 className="text-4xl font-bold text-black">My Dive Certification</h2>
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
            <input
              type="text"
              placeholder="Search"
              className="border rounded-full px-4 py-2 w-64"
            />
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

      {/* Certification Display */}
      <div className="mt-6 min-w-[500px] min-h-[870px] bg-[#D9E7EC] border rounded-3xl p-10">
        {certificates.length === 0 ? (
          <div className="flex items-center justify-center min-h-[700px] text-center">
            <div>
              <div className="w-[250px] h-[250px] border-2 border-black rounded-full mx-auto"></div>
              <p className="text-5xl text-black font-bold mt-20">No Certifications Yet</p>
              <p className="text-black text-xl mt-9">
                You haven’t added any certifications. 
              </p>
              <p className="text-black text-xl mt-1"> 
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
                    className="w-full rounded-xl border-4 border-white"
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
                        className="block w-full text-left px-4 py-2 rounded-lg text-sm text-black hover:bg-[#2C7DA0] hover:bg-opacity-50"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCertId(cert.id);
                          setShowDeleteModal(true);
                        }}
                        className="block w-full text-left px-4 py-2 rounded-lg text-sm text-black hover:bg-[#2C7DA0] hover:bg-opacity-50"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#D9E7EC] p-6 rounded-3xl shadow-lg w-[680px] h-[600px] text-center">

            <div className="flex justify-center mb-4">
              <img src="/trash-delete.svg" alt="Delete" className="w-50 h-50 mt-40" />
            </div>

            <h2 className="text-5xl font-bold text-black">Delete Certificate?</h2>
            <p className="text-xl font-semibold text-gray-600 mt-1">This action cannot be undone.</p>

            <div className="mt-20 flex justify-center space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-48 h-14 border border-black border-2 rounded-full font-semibold text-black hover:bg-black hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={deleteCertificate}
                className="w-48 h-14 border border-black border-2 rounded-full font-semibold text-black hover:bg-black hover:text-white"
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

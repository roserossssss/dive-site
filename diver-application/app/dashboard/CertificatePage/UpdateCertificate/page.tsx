"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditCertificate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const certId = searchParams.get("id"); 

  const [file, setFile] = useState<File | null>(null);
  const [certification, setCertification] = useState({
    id: null,
    name: "",
    level: "",
    agency: "",
    location: "",
    image: "", 
  });
  const [showModal, setShowModal] = useState(false);

  // Loads the existing certification
  useEffect(() => {
    const existingCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
    const certificateToEdit = existingCertificates.find((cert: any) => cert.id == certId);
    if (certificateToEdit) {
      setCertification(certificateToEdit);
    }
  }, [certId]);

  // Handle File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.size <= 5 * 1024 * 1024) {
      setFile(selectedFile);
      setCertification({ ...certification, image: URL.createObjectURL(selectedFile) });
    } else {
      alert("File size must be 5MB or less.");
    }
  };

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertification({ ...certification, [e.target.name]: e.target.value });
  };

  const saveCertificate = () => {
    if (!certification.name || !certification.level || !certification.agency || !certification.location) {
      alert("Please fill in all fields.");
      return;
    }

    const existingCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
    const updatedCertificates = existingCertificates.map((cert: any) =>
      cert.id === certification.id
        ? { ...cert, ...certification, image: file ? URL.createObjectURL(file) : cert.image }
        : cert
    );

    localStorage.setItem("certificates", JSON.stringify(updatedCertificates));
    router.push("/dashboard/CertificatePage");
  };

  const handleConfirm = () => {
    saveCertificate();
    setShowModal(false);
  };

  return (
    <div className="flex-1 p-5 pt-2 relative">
      <h2 className="text-3xl font-bold text-black">Edit Dive Certification</h2>

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={() => router.back()}
          className="w-[230px] h-[60px] px-9 py-2 font-semibold text-xl bg-gray-300 text-black rounded-full"
        >
          Cancel
        </button>
        <button 
          onClick={() => setShowModal(true)} 
          className="w-[230px] h-[60px] px-9 py-2 text-xl font-semibold bg-[#2E6782] text-white rounded-full">
          Save
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#D9E7EC] p-6 rounded-3xl shadow-lg w-[680px] h-[600px] text-center">
            <div className="flex justify-center mb-4">
              <img src="/exclamation.svg" alt="Warning" className="w-50 h-50 mt-40" />
            </div>

            <h2 className="text-5xl font-bold text-black mt-10">Confirm Changes</h2>
            <p className="text-xl font-semibold text-gray-600 mt-4">You're about to update your details.</p>
            <p className="text-xl font-semibold text-gray-600 mt-1">Want to proceed? </p>

            <div className="mt-20 flex justify-center space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="w-48 h-14 border border-black border-2 rounded-full font-semibold text-black hover:bg-black hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="w-48 h-14 border border-black border-2 rounded-full font-semibold text-black hover:bg-black hover:text-white"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Section */}
      <div className="mt-6 bg-[#2E6782] p-6 rounded-t-3xl">
        <div className="flex flex-col items-center">
          <div className="w-[200px] h-[310px] flex items-center justify-center bg-transparent">
            <img src={certification.image || "/image-upload.svg"} 
                 alt="Upload Preview" 
                 className="w-[270px] h-[270px] -mt-6" />
          </div>
          <p className="text-white text-sm -mt-5 mb-5">Maximum of 5MB</p>
          <p className="text-white text-sm -mt-4">JPEG, PNG, PDF</p>
          <label className="mt-5 px-20 py-2 bg-black text-white text-xl rounded-lg cursor-pointer">
            Upload Image
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      </div>

      {/* Certification Details Section */}
      <div className="bg-[#D9E7EC] p-10 rounded-b-3xl h-[400px]">
        <h3 className="text-2xl font-bold text-black mb-4">Certification Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Certification Name */}
          <div className="flex flex-col">
            <label className="text-black font-semibold text-xl mb-1">Certification Name</label>
            <input
              type="text"
              name="name"
              value={certification.name}
              onChange={handleChange}
              className="bg-transparent border-black border p-3 rounded-lg w-full"
            />
          </div>

          {/* Certifying Agency */}
          <div className="flex flex-col">
            <label className="text-black font-semibold text-xl mb-1">Certifying Agency</label>
            <input
              type="text"
              name="agency"
              value={certification.agency}
              onChange={handleChange}
              className="bg-transparent border-black border p-3 rounded-lg w-full"
            />
          </div>

          {/* Certification Level */}
          <div className="flex flex-col">
            <label className="text-black font-semibold text-xl mb-1">Certification Level</label>
            <input
              type="text"
              name="level"
              value={certification.level}
              onChange={handleChange}
              className="bg-transparent border-black border p-3 rounded-lg w-full"
            />
          </div>

          {/* Training Location */}
          <div className="flex flex-col">
            <label className="text-black font-semibold text-xl mb-1">Training Location</label>
            <input
              type="text"
              name="location"
              value={certification.location}
              onChange={handleChange}
              className="bg-transparent border-black border p-3 rounded-lg w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

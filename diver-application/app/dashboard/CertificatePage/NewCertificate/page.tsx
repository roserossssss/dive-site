"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewCertificate() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [certification, setCertification] = useState({
    name: "",
    level: "",
    agency: "",
    location: "",
  });
  const [showModal, setShowModal] = useState<"save" | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.size <= 5 * 1024 * 1024) {
      setFile(selectedFile);
    } else {
      alert("File size must be 5MB or less.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertification({ ...certification, [e.target.name]: e.target.value });
  };

  const saveCertificate = () => {
    if (!certification.name || !certification.level || !certification.agency || !certification.location || !file) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    const newCertificate = {
      id: Date.now(),
      name: certification.name,
      level: certification.level,
      agency: certification.agency,
      location: certification.location,
      image: URL.createObjectURL(file),
    };

    const existingCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
    const updatedCertificates = [...existingCertificates, newCertificate];
    localStorage.setItem("certificates", JSON.stringify(updatedCertificates));

    router.push("/dashboard/CertificatePage");
  };

  const handleConfirm = () => {
    if (showModal === "save") {
      saveCertificate();
    }
    setShowModal(null);
  };
  

  return (
    <div className="flex-1 p-5 pt-2 relative">
  {/* Page Title */}
  <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-[#001526] text-center md:text-left mt-2">New Dive Certification</h2>

  {/* Buttons Section */}
  <div className="flex justify-end gap-4 mt-6">
    <button
      onClick={() => router.push("/dashboard/CertificatePage")}
      className="max-w-sm w-full h-14 px-6 py-2 font-semibold text-lg bg-gray-300 text-[#001526] rounded-full"
    >
      Cancel
    </button>
    <button
      onClick={() => setShowModal("save")}
      className="max-w-sm w-full h-14 px-6 py-2 text-lg font-semibold bg-[#2E6782] text-white rounded-full"
    >
      Save
    </button>
  </div>

  {/* Upload Section */}
  <div className="mt-6 bg-[#2E6782] p-6 rounded-t-3xl">
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xs h-auto flex items-center justify-center">
        <img
          src={file ? URL.createObjectURL(file) : "/image-upload.svg"}
          alt="Upload Preview"
          className="w-40 h-40"
        />
      </div>
      <p className="text-white text-sm mt-2">Maximum of 5MB</p>
      <p className="text-white text-xs">JPEG, PNG, PDF</p>
      <label className="mt-4 px-10 py-2 bg-[#001526] text-white text-lg rounded-lg cursor-pointer">
        Upload Image
        <input type="file" className="hidden" onChange={handleFileChange} />
      </label>
    </div>
  </div>

  {/* Certification Details Section */}
  <div className="bg-[#D9E7EC] p-6 rounded-b-3xl">
    <h3 className="text-2xl font-bold text-[#001526] mb-4">Certification Details</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Certification Name */}
      <div className="flex flex-col">
        <label htmlFor="name" className="text-[#001526] font-semibold text-lg mb-2">Certification Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={certification.name}
          onChange={handleChange}
          className="bg-transparent border border-[#001526] text-[#001526] p-3 rounded-lg w-full"
        />
      </div>

      {/* Certifying Agency */}
      <div className="flex flex-col">
        <label htmlFor="agency" className="text-[#001526] font-semibold text-lg mb-2">Certifying Agency</label>
        <input
          id="agency"
          type="text"
          name="agency"
          value={certification.agency}
          onChange={handleChange}
          className="bg-transparent border border-[#001526] text-[#001526] p-3 rounded-lg w-full"
        />
      </div>

      {/* Certification Level */}
      <div className="flex flex-col">
        <label htmlFor="level" className="text-[#001526] font-semibold text-lg mb-2">Certification Level</label>
        <input
          id="level"
          type="text"
          name="level"
          value={certification.level}
          onChange={handleChange}
          className="bg-transparent border border-[#001526] text-[#001526] p-3 rounded-lg w-full"
        />
      </div>

      {/* Training Location */}
      <div className="flex flex-col">
        <label htmlFor="location" className="text-[#001526] font-semibold text-lg mb-2">Training Location</label>
        <input
          id="location"
          type="text"
          name="location"
          value={certification.location}
          onChange={handleChange}
          className="bg-transparent border border-[#001526] text-[#001526] p-3 rounded-lg w-full"
        />
      </div>
    </div>
  </div>

  {/* Confirmation Modal */}
  {showModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#D9E7EC] p-6 rounded-3xl shadow-lg w-full max-w-lg text-center">
        <div className="flex justify-center mb-4">
          <img src="/exclamation.svg" alt="Delete" className="w-24 h-24" />
        </div>

        <h2 className="text-2xl font-bold text-black mt-4">Save New Certificate?</h2>
        <p className="text-lg font-semibold text-gray-600 mt-2">You can edit this certificate later if necessary.</p>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => setShowModal(null)}
            className="w-32 h-12 border border-[#001526] rounded-full font-semibold text-[#001526] hover:bg-[#001526] hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="w-32 h-12 border border-[#001526] rounded-full font-semibold text-[#001526] hover:bg-[#001526] hover:text-white"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  );
}

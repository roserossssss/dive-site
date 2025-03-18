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

  // Save Certificate Function
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
      image: URL.createObjectURL(file), // Convert file to a URL for display
    };

    // Get existing certificates from localStorage
    const existingCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");

    // Add new certificate
    const updatedCertificates = [...existingCertificates, newCertificate];

    // Save back to localStorage
    localStorage.setItem("certificates", JSON.stringify(updatedCertificates));

    // Redirect back to Diving Certification Page
    router.push("/dashboard/CertificatePage");
  };

  return (
    <div className="flex-1 p-10 pt-0 relative">
      {/* Page Title */}
      <h2 className="text-4xl font-bold text-black">My Dive Certification</h2>

      {/* Buttons Section */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={() => router.back()}
          className="w-[230px] h-[60px] px-9 py-2 font-semibold text-xl bg-gray-300 text-black rounded-full"
        >
          Cancel
        </button>
        <button 
          onClick={saveCertificate} 
          className="w-[230px] h-[60px] px-9 py-2 text-xl font-semibold bg-[#2E6782] text-white rounded-full">
          Save
        </button>
      </div>

      {/* Upload Section */}
      <div className="mt-6 bg-[#2E6782] p-6 rounded-t-3xl">
        <div className="flex flex-col items-center">
          <div className="w-[200px] h-[310px] flex items-center justify-center bg-transparent">
            <img src={file ? URL.createObjectURL(file) : "/image-upload.svg"} 
                 alt="Upload Preview" 
                 className="w-[270px] h-[270px] -mt-6" />
          </div>
          <p className="text-white text-sm -mt-15">Maximum of 5MB</p>
          <p className="text-white text-sm">JPEG, PNG, PDF</p>
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

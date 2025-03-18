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

  return (
    <div className="flex-1 p-10 pt-0 relative">
      <h2 className="text-4xl font-bold text-black">Edit Dive Certification</h2>

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
            <img src={certification.image || "/image-upload.svg"} 
                 alt="Upload Preview" 
                 className="w-[270px] h-[270px] -mt-6" />
          </div>
          <label className="mt-1 px-20 py-2 bg-black text-white text-xl rounded-lg cursor-pointer">
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

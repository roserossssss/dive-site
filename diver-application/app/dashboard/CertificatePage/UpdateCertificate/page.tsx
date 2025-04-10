"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

type Certificate = {
  id: string;
  name: string;
  level: string;
  agency: string;
  location: string;
  image: string;
};



export default function EditCertificate() {
  const router = useRouter();

  // Wrap useSearchParams()
  const [certId, setCertId] = useState<string | null>(null);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setCertId(searchParams.get("id"));
  }, []);

  const [file, setFile] = useState<File | null>(null);
  const [certification, setCertification] = useState<Certificate>({
    id: "",
    name: "",
    level: "",
    agency: "",
    location: "",
    image: "",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (certId) {
      const existingCertificates: Certificate[] = JSON.parse(localStorage.getItem("certificates") || "[]");
      const certificateToEdit = existingCertificates.find((cert) => cert.id === certId);
      if (certificateToEdit) {
        setCertification(certificateToEdit);
      }
    }
  }, [certId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.size <= 5 * 1024 * 1024) {
      setFile(selectedFile);
      setCertification({ ...certification, image: URL.createObjectURL(selectedFile) });
    } else {
      alert("File size must be 5MB or less.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertification({ ...certification, [e.target.name]: e.target.value });
  };

  const saveCertificate = () => {
    if (!certification.name || !certification.level || !certification.agency || !certification.location) {
      alert("Please fill in all fields.");
      return;
    }

    const existingCertificates: Certificate[] = JSON.parse(localStorage.getItem("certificates") || "[]");

    const updatedCertificates: Certificate[] = existingCertificates.map((cert) =>
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
      <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-[#001526] text-center md:text-left mt-2">
        Edit Dive Certification
      </h2>

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={() => router.back()}
          className="w-full max-w-xs h-14 px-6 py-2 font-semibold text-xl bg-gray-300 text-black rounded-full"
        >
          Cancel
        </button>
        <button 
          onClick={() => setShowModal(true)} 
          className="w-full max-w-xs h-14 px-6 py-2 text-xl font-semibold bg-[#2E6782] text-white rounded-full"
        >
          Save
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#D9E7EC] p-6 rounded-3xl shadow-lg w-full max-w-lg text-center">
            <div className="flex justify-center mb-4">
              <Image width={20} height={20} src="/exclamation.svg" alt="Warning" className="w-24 h-24" />
            </div>
            <h2 className="text-3xl font-bold text-black mt-4">Confirm Changes</h2>
            <p className="text-lg font-semibold text-gray-600 mt-4">You&apos;re about to update your details.</p>
            <p className="text-lg font-semibold text-gray-600 mt-1">Want to proceed?</p>
            <div className="mt-10 flex justify-center space-x-4">
              <button onClick={() => setShowModal(false)} className="w-full max-w-xs h-12 border-[#001526] border-2 rounded-full font-semibold text-[#001526] hover:bg-[#001526] hover:text-white">
                Cancel
              </button>
              <button onClick={handleConfirm} className="w-full max-w-xs h-12 border-[#001526] border-2 rounded-full font-semibold text-[#001526] hover:bg-[#001526] hover:text-white">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 bg-[#2E6782] p-6 rounded-t-3xl">
        <div className="flex flex-col items-center">
          <div className="max-w-xs w-full h-auto flex items-center justify-center bg-transparent">
            <Image width={20} height={20} src={certification.image || "/image-upload.svg"} alt="Upload Preview" className="w-60 h-auto" />
          </div>
          <p className="text-white text-medium mt-4 mb-2">Maximum of 5MB</p>
          <p className="text-white text-sm">JPEG, PNG, PDF</p>
          <label className="mt-5 px-8 py-2 bg-[#001526] text-white text-lg rounded-lg cursor-pointer">
            Upload Image
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      </div>

      <div className="bg-[#D9E7EC] p-6 rounded-b-3xl min-h-[400px]">
        <h3 className="text-2xl font-bold text-[#001526] mb-4">Certification Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Certification Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-[#001526] font-semibold text-lg mb-2">Certification Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={certification.name}
              onChange={handleChange}
              className="bg-transparent border-[#001526] text-[#001526] border p-3 rounded-lg w-full"
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
              className="bg-transparent border-[#001526] text-[#001526] border p-3 rounded-lg w-full"
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
              className="bg-transparent border-[#001526] text-[#001526] border p-3 rounded-lg w-full"
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
              className="bg-transparent border-[#001526] text-[#001526] border p-3 rounded-lg w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

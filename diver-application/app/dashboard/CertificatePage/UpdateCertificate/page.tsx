"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { BsExclamationCircle } from "react-icons/bs";

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
      {/* Page Title */}
      <div className="fixed top-0 left-0 w-full bg-white z-10 p-4 rounded-t-2xl md:pl-80">
        <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-[#001526] text-center md:text-left mt-2">
          Update Dive Certification
        </h2>
      </div>

      <div className="mb-1 text-right mt-7 pt-5">
        <button
          onClick={() => router.back()}
          className="w-full sm:w-36 px-5 py-3 bg-[#D9E7EC] text-[#001526] rounded-full mr-2 text-[16px] font-semibold"
        >
          Cancel
        </button>
        <button 
          onClick={() => setShowModal(true)} 
          className="w-full sm:w-36 px-5 py-3 bg-[#2C7DA0] text-white rounded-full text-[16px] font-semibold"
        >
          Save
        </button>
      </div>

      {/* Save Changes Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#D9E7EC] p-8 w-11/12 sm:w-[480px] h-auto sm:h-[450px] rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <div className="flex justify-center mb-4">
              <BsExclamationCircle className="w-24 h-24 text-[#001526]" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-center text-[#001526]">
              Confirm Changes?
            </h2>
            <p className="font-semibold text-center text-[#001526] mb-5 text-[15px]">
              You are about to update your details.
              <br />
              Want to proceed?
            </p>
            <div className="flex justify-center mt-5">
              <button
                className="mr-2 w-36 px-5 py-3 bg-[#D9E7EC] text-[#001526] border border-[#001526] rounded-full text-[16px] font-semibold"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="ml-2 w-36 px-5 py-3 bg-[#001526] text-white rounded-full text-[16px] font-semibold"
                onClick={handleConfirm}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Section */}
      <div className="mt-6 bg-[#2C7DA0] p-8 rounded-t-3xl">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-xs h-auto flex items-center justify-center">
            <Image
              width={20}
              height={20}
              src={file ? URL.createObjectURL(file) : certification.image || "/image-upload.svg"}
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
      <div className="bg-[#D9E7EC] p-9 rounded-b-3xl">
        <h3 className="text-2xl font-bold text-[#001526] mb-4">Certification Details</h3>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Certification Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-[#001526] font-semibold text-lg mb-2">
              Certification Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={certification.name}
              onChange={handleChange}
              className="bg-transparent border border-[#001526] text-[#001526] p-3 rounded-lg w-full"
              required
            />
          </div>

          {/* Certifying Agency */}
          <div className="flex flex-col">
            <label htmlFor="agency" className="text-[#001526] font-semibold text-lg mb-2">
              Certifying Agency <span className="text-red-500">*</span>
            </label>
            <input
              id="agency"
              type="text"
              name="agency"
              value={certification.agency}
              onChange={handleChange}
              className="bg-transparent border border-[#001526] text-[#001526] p-3 rounded-lg w-full"
              required
            />
          </div>

          {/* Certification Level */}
          <div className="flex flex-col">
            <label htmlFor="level" className="text-[#001526] font-semibold text-lg mb-2">
              Certification Level <span className="text-red-500">*</span>
            </label>
            <input
              id="level"
              type="text"
              name="level"
              value={certification.level}
              onChange={handleChange}
              className="bg-transparent border border-[#001526] text-[#001526] p-3 rounded-lg w-full"
              required
            />
          </div>

          {/* Training Location */}
          <div className="flex flex-col">
            <label htmlFor="location" className="text-[#001526] font-semibold text-lg mb-2">
              Training Location <span className="text-red-500">*</span>
            </label>
            <input
              id="location"
              type="text"
              name="location"
              value={certification.location}
              onChange={handleChange}
              className="bg-transparent border border-[#001526] text-[#001526] p-3 rounded-lg w-full"
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
}

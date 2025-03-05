"use client";

import { useState } from "react";
import Link from "next/link";

interface Certificate {
  id: number;
  name: string;
  Acquiredate: string;
  status: "Pending" | "Approved" | "Rejected";
  expiryDate: string;
}

export default function MedicalPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: 1,
      name: "Diver Medical Form",
      status: "Approved",
      Acquiredate: "2024-06-15",
      expiryDate: "2025-06-15",
    },
    {
      id: 2,
      name: "Health Clearance Form",
      status: "Pending",
      Acquiredate: "2024-06-15",
      expiryDate: "2026-01-10",
    },
    {
        id: 3,
        name: "Medical Form",
        status: "Pending",
        Acquiredate: "2024-06-15",
        expiryDate: "2026-01-10",
      },
  ]);


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
       Medical Certifications
      </h1>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
  <h2 className="text-lg font-semibold text-gray-700">Upload Certificate</h2>


  <label className="block text-gray-600 mt-2">Certificate Name:</label>
  <input
    type="text"
    placeholder="Enter certificate name"
    className="mt-1 block w-full border rounded p-2"
  />


  <label className="block text-gray-600 mt-2">Date Acquired:</label>
  <input
    type="date"
    className="mt-1 block w-full border rounded p-2"
  />


  <label className="block text-gray-600 mt-2">Expires:</label>
  <input
    type="date"
    className="mt-1 block w-full border rounded p-2"
  />

  <label className="block text-gray-600 mt-2">Upload Certificate:</label>
  <input type="file" className="mt-1 block w-full border rounded p-2" />


  <button
    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
  >
    Upload
  </button>
</div>


      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg text-gray-700 ">Your Certificates:</h2>

        {certificates.length === 0 ? (
          <p className="text-gray-500">No certificates uploaded.</p>
        ) : (
          <ul className="space-y-2">
            {certificates.map((cert) => (
              <li key={cert.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">{cert.name}</p>
                  <p className="text-sm text-gray-600">Date acquired: {cert.Acquiredate}</p>
                  <p className="text-sm text-gray-600">Expires on: {cert.expiryDate}</p>
                  <span
                  className={`px-3 py-1 text-sm rounded-lg ${
                    cert.status === "Approved"
                      ? "bg-green-500 text-white"
                      : cert.status === "Pending"
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {cert.status}
                </span>
                </div>
               <Link href="">
               <div className="">
                Edit
                </div>
               </Link>
                
              </li>
            ))}
          </ul>
        )}
      </div>

     
    </div>
  );
}

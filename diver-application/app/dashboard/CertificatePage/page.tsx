"use client";

import { useState } from "react";
import Link from "next/link";

interface Certificate {
  id: number;
  name: string;
  acquireDate: string;
  status: "Pending" | "Approved" | "Rejected";
  expiryDate: string;
}

export default function DivingPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: 1,
      name: "Open Water Diver Certification",
      status: "Approved",
      acquireDate: "2023-07-10",
      expiryDate: "2025-07-10",
    },
    {
      id: 2,
      name: "Advanced Diver Certification",
      status: "Pending",
      acquireDate: "2024-02-20",
      expiryDate: "2026-02-20",
    },
    {
      id: 3,
      name: "Rescue Diver Certification",
      status: "Pending",
      acquireDate: "2024-05-15",
      expiryDate: "2026-05-15",
    },
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Diving Certifications
      </h1>

      {/* Upload Certificate Form */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Upload Certificate</h2>

        {/* Certificate Name */}
        <label className="block text-gray-600 mt-2">Certificate Name:</label>
        <input
          type="text"
          placeholder="Enter certificate name"
          className="mt-1 block w-full border rounded p-2"
        />

        {/* Date Acquired */}
        <label className="block text-gray-600 mt-2">Date Acquired:</label>
        <input type="date" className="mt-1 block w-full border rounded p-2" />

        {/* Expiry Date */}
        <label className="block text-gray-600 mt-2">Expires:</label>
        <input type="date" className="mt-1 block w-full border rounded p-2" />

        {/* File Upload */}
        <label className="block text-gray-600 mt-2">Upload Certificate:</label>
        <input type="file" className="mt-1 block w-full border rounded p-2" />

        {/* Upload Button */}
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Upload
        </button>
      </div>

      {/* Certificates List */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Your Certificates:</h2>

        {certificates.length === 0 ? (
          <p className="text-gray-500">No certificates uploaded.</p>
        ) : (
          <ul className="space-y-2 mt-3">
            {certificates.map((cert) => (
              <li
                key={cert.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-semibold text-gray-800">{cert.name}</p>
                  <p className="text-sm text-gray-600">Date acquired: {cert.acquireDate}</p>
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
                  <div className="text-blue-600 hover:underline cursor-pointer">Edit</div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

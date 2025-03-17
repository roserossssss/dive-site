"use client";

import { useState, ChangeEvent } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function MedicalPage() {
  const [editMode, setEditMode] = useState(false);
  const [hasAllergies, setHasAllergies] = useState(false);
  const [hasChronicCondition, setHasChronicCondition] = useState(false);
  const [hasDisability, setHasDisability] = useState(false);
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
  const [medicalCertificate, setMedicalCertificate] = useState("");

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validExtensions = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
      const maxSize = 5 * 1024 * 1024; // 5MB
  
      if (!validExtensions.includes(file.type)) {
        alert('Invalid file type. Only PNG, JPG, JPEG, and PDF files are allowed.');
        return;
      }
  
      if (file.size > maxSize) {
        alert('File size exceeds the maximum limit of 5MB.');
        return;
      }
  
      setMedicalCertificate(file.name);
    }
  };

  return (
    <div className="p-5 relative">
      <div className="fixed top-0 left-[calc(1.5rem+16rem)] w-[calc(100%-16rem-1.5rem)] bg-white z-10 p-4 rounded-t-2xl">
        <h2 className="text-2xl font-bold text-[#001526] ml-7 mt-2">Medical Profile</h2>
      </div>
      <div className="mb-1 text-right mt-4 pt-5">
        {editMode ? (
          <>
            <button
              className="w-36 px-5 py-3 bg-[#D9E7EC] text-[#001526] rounded-full mr-2 text-[16px] font-semibold"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
            <button
              className="w-36 px-5 py-3 bg-[#2C7DA0] text-white rounded-full text-[16px] font-semibold"
              onClick={() => setEditMode(false)}
            >
              Save
            </button>
          </>
        ) : (
          <button
            className="w-36 px-5 py-3 bg-[#2C7DA0] text-white rounded-full text-[16px] font-semibold"
            onClick={() => setEditMode(true)}
          >
            Edit Details
          </button>
        )}
      </div>
      <div className="pt-5">
        {/* Header Container for User's Profile Photo, Name, and Email Address */}
        <div className="bg-[#2C7DA0] p-8 rounded-t-2xl flex justify-between items-center">
          <div className="flex items-center w-full ml-16">
            <img src="/images/sample_profile_pic.jpg" alt="User Photo" className="w-32 h-32 rounded-full mr-4" />
            <div className="ml-4">
              <h2 className="text-5xl font-bold text-gray-100">JOHN DOE</h2>
              <p className="text-1xl font-medium text-gray-200">johndoe@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-[#D9E7EC] p-6 rounded-b-2xl">
          <div className="mt-5 px-4">
            <form className="space-y-5">
              {/* Personal Information Section */}
              <section>
                <h3 className="text-xl font-bold text-[#001526]">Personal Information</h3>
                <div className="flex gap-3 mb-3">
                  <div className="w-1/3">
                    <label className="block text-[#001526] font-semibold">First Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="First Name" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled />
                  </div>
                  <div className="w-1/3">
                    <label className="block text-[#001526] font-semibold">Middle Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Middle Name" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled />
                  </div>
                  <div className="w-1/3">
                    <label className="block text-[#001526] font-semibold">Last Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Last Name" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled />
                  </div>
                  <div className="w-1/12">
                    <label className="block text-[#001526] font-semibold">Suffix <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Suffix" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled />
                  </div>
                </div>
                <div className="flex gap-3 mb-3">
                  <div className="w-1/3">
                    <label className="block text-[#001526] font-semibold">Birthdate <span className="text-red-500">*</span></label>
                    <input type="date" placeholder="Birthdate" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled={!editMode} />
                  </div>
                  <div className="w-1/3">
                    <label className="block text-[#001526] font-semibold">Age <span className="text-red-500">*</span></label>
                    <input type="number" placeholder="Age" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled />
                  </div>
                  <div className="w-1/3">
                    <label className="block text-[#001526] font-semibold">Sex <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center font-semibold text-[#001526]">
                        <input type="radio" name="sex" value="male" className="mr-1 w-6 h-6" style={{ accentColor: '#001526' }} disabled /> Male
                      </label>
                      <label className="flex items-center font-semibold text-[#001526]">
                        <input type="radio" name="sex" value="female" className="mr-1 w-6 h-6" style={{ accentColor: '#001526' }} disabled /> Female
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              {/* Medical Information Section */}
              <section>
                <h3 className="text-xl font-bold text-[#001526]">Medical Information</h3>
                <div className="flex gap-3 mb-3">
                  <div className="w-1/3">
                    <label className="block text-[#001526] font-semibold">Blood Type <span className="text-red-500">*</span></label>
                    <select className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled={!editMode}>
                      <option value="">Select Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div className="w-1/4 ml-4">
                    <label className="block text-[#001526] font-semibold">Allergies <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center font-semibold text-[#001526]">
                        <input type="radio" name="allergies" value="yes" className="mr-1 w-6 h-6" style={{ accentColor: '#001526' }} disabled={!editMode} onChange={() => setHasAllergies(true)} /> Yes
                      </label>
                      <label className="flex items-center font-semibold text-[#001526]">
                        <input type="radio" name="allergies" value="no" className="mr-1 w-6 h-6" style={{ accentColor: '#001526' }} disabled={!editMode} onChange={() => setHasAllergies(false)} /> No
                      </label>
                    </div>
                    {hasAllergies && (
                      <input type="text" placeholder="Please specify" className="mt-2 p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled={!editMode} />
                    )}
                  </div>
                  <div className="w-1/4 ml-4">
                    <label className="block text-[#001526] font-semibold">Chronic Condition <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center font-semibold text-[#001526]">
                        <input type="radio" name="chronicCondition" value="yes" className="mr-1 w-6 h-6" style={{ accentColor: '#001526' }} disabled={!editMode} onChange={() => setHasChronicCondition(true)} /> Yes
                      </label>
                      <label className="flex items-center font-semibold text-[#001526]">
                        <input type="radio" name="chronicCondition" value="no" className="mr-1 w-6 h-6" style={{ accentColor: '#001526' }} disabled={!editMode} onChange={() => setHasChronicCondition(false)} /> No
                      </label>
                    </div>
                    {hasChronicCondition && (
                      <input type="text" placeholder="Please specify" className="mt-2 p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled={!editMode} />
                    )}
                  </div>
                  <div className="w-1/4 ml-4">
                    <label className="block text-[#001526] font-semibold">Disability <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center font-semibold text-[#001526]">
                        <input type="radio" name="disability" value="yes" className="mr-1 w-6 h-6" style={{ accentColor: '#001526' }} disabled={!editMode} onChange={() => setHasDisability(true)} /> Yes
                      </label>
                      <label className="flex items-center font-semibold text-[#001526]">
                        <input type="radio" name="disability" value="no" className="mr-1 w-6 h-6" style={{ accentColor: '#001526' }} disabled={!editMode} onChange={() => setHasDisability(false)} /> No
                      </label>
                    </div>
                    {hasDisability && (
                      <input type="text" placeholder="Please specify" className="mt-2 p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled={!editMode} />
                    )}
                  </div>
                </div>
                <div className="flex gap-3 mb-3">
                  <div className="w-1/2">
                    <label className="block text-[#001526] font-semibold">Emergency Contact <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Emergency Contact" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled={!editMode} />
                  </div>
                  <div className="w-1/4">
                    <label className="block text-[#001526] font-semibold">Emergency Contact Number <span className="text-red-500">*</span></label>
                    <div className="flex items-center w-full">
                      <PhoneInput
                        country={'ph'}
                        value={emergencyContactNumber}
                        onChange={setEmergencyContactNumber}
                        inputProps={{
                          name: 'emergencyContactNumber',
                          required: true,
                          autoFocus: true,
                          disabled: !editMode,
                          className: 'p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] pl-12'
                        }}
                        containerStyle={{ width: '100%' }}
                        inputStyle={{ width: '100%' }}
                        disabled={!editMode}
                      />
                    </div>
                  </div>
                  <div className="w-1/4">
                    <label className="block text-[#001526] font-semibold">Relationship <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Relationship" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled={!editMode} />
                  </div>
                </div>
                <div className="flex gap-3 mb-3 items-center">
                  <div className="w-1/3">
                    <label className="block text-[#001526] font-semibold">Medical Certificate <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Medical Certificate" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" value={medicalCertificate} disabled={!editMode} />
                  </div>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={!editMode}
                  />
                  <button
                    type="button"
                    className="w-32 px-4 py-2 bg-[#001526] text-white rounded-lg text-[16px] font-semibold mt-6"
                    onClick={() => {
                      const fileUpload = document.getElementById('file-upload') as HTMLInputElement;
                      if (fileUpload) {
                        fileUpload.click();
                      }
                    }}
                    disabled={!editMode}
                  >
                    Upload
                  </button>
                  <div className="w-2/5">
                    <label className="block text-[#001526] font-semibold">Issued By <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Issued By" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled={!editMode} />
                  </div>
                  <div className="w-1/5">
                    <label className="block text-[#001526] font-semibold">Date Issued <span className="text-red-500">*</span></label>
                    <input type="date" placeholder="Date Issued" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled={!editMode} />
                  </div>
                </div>
                <div className="text-[#001526] text-sm mt-1">
                  <p>PNG, JPG, PDF, JPEG only</p>
                  <p>Maximum file size of 5MB</p>
                </div>
              </section>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
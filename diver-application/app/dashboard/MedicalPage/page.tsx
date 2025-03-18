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
    <div>
      <h2 className="text-3xl text-black p-2 font-extrabold">Medical Profile</h2>
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
      <div className="p-4">
        {/* Header Container for User's Profile Photo, Name, and Email Address */}
        <div className="bg-[#2C7DA0] p-8 rounded-t-2xl flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
            <img src="/images/sample_profile_pic.jpg" alt="User Photo" 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full mr-0 md:mr-4" />
            <div className="mt-4 md:mt-0">
              <h2 className="text-2xl md:text-5xl font-bold text-gray-100">JOHN DOE</h2>
              <p className="text-lg md:text-xl font-medium text-gray-200">johndoe@gmail.com</p>
            </div>
          </div>
        </div>


        {/* Form Container */}
        <div className="bg-[#D9E7EC] p-6 rounded-b-2xl">
          <div className="mt-5 px-4">
            <form className="space-y-4 sm:space-y-5">
              {/* Personal Information Section */}
              <section className="">
                <h3 className="text-xl font-bold text-[#001526]">Personal Information</h3>

                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:mb-3">
                  <div className="w-full">
                    <label className="block text-[#001526] font-semibold">First Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="First Name" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled />
                  </div>
                  <div className="w-full">
                    <label className="block text-[#001526] font-semibold">Middle Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Middle Name" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled />
                  </div>
                  <div className="w-full">
                    <label className="block text-[#001526] font-semibold">Last Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Last Name" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled />
                  </div>
                  <div className="w-full">
                    <label className="block text-[#001526] font-semibold">Suffix</label>
                    <input type="text" placeholder="Suffix" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled />
                  </div>
                </div>

                {/* Birthdate, Age, and Sex */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                  <div className="w-full">
                    <label className="block text-[#001526] font-semibold">Birthdate <span className="text-red-500">*</span></label>
                    <input type="date" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled />
                  </div>
                  <div className="w-full">
                    <label className="block text-[#001526] font-semibold">Age <span className="text-red-500">*</span></label>
                    <input type="number" placeholder="Age" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled />
                  </div>
                  <div className="w-full">
                    <label className="block text-[#001526] font-semibold">Sex <span className="text-red-500">*</span></label>
                    <div className="flex gap-3">
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
                  <div className="lg:flex gap-3 mb-3 justify-center grid grid-cols-2">
                    <div className="lg:w-1/3 ">
                      <label className="block text-[#001526] font-semibold">
                        Blood Type <span className="text-red-500">*</span>
                      </label>
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
                      <label className="block text-[#001526] font-semibold">
                        Allergies <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center font-semibold text-[#001526]">
                          <input
                            type="radio"
                            name="allergies"
                            value="yes"
                            className="mr-1 w-6 h-6"
                            style={{ accentColor: "#001526" }}
                            disabled={!editMode}
                            onChange={() => setHasAllergies(true)}
                          />{" "}
                          Yes
                        </label>
                        <label className="flex items-center font-semibold text-[#001526]">
                          <input
                            type="radio"
                            name="allergies"
                            value="no"
                            className="mr-1 w-6 h-6"
                            style={{ accentColor: "#001526" }}
                            disabled={!editMode}
                            onChange={() => setHasAllergies(false)}
                          />{" "}
                          No
                        </label>
                      </div>
                      {hasAllergies && (
                        <input
                          type="text"
                          placeholder="Please specify"
                          className="mt-2 p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]"
                          disabled={!editMode}
                        />
                      )}
                    </div>
                    <div className="w-1/4 ">
                      <label className="block text-[#001526] font-semibold">
                        Chronic Condition <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center font-semibold text-[#001526]">
                          <input
                            type="radio"
                            name="chronicCondition"
                            value="yes"
                            className="mr-1 w-6 h-6"
                            style={{ accentColor: "#001526" }}
                            disabled={!editMode}
                            onChange={() => setHasChronicCondition(true)}
                          />{" "}
                          Yes
                        </label>
                        <label className="flex items-center font-semibold text-[#001526]">
                          <input
                            type="radio"
                            name="chronicCondition"
                            value="no"
                            className="mr-1 w-6 h-6"
                            style={{ accentColor: "#001526" }}
                            disabled={!editMode}
                            onChange={() => setHasChronicCondition(false)}
                          />{" "}
                          No
                        </label>
                      </div>
                      {hasChronicCondition && (
                        <input
                          type="text"
                          placeholder="Please specify"
                          className="mt-2 p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]"
                          disabled={!editMode}
                        />
                      )}
                    </div>
                    <div className="w-1/4 ml-4">
                      <label className="block text-[#001526] font-semibold">
                        Disability <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center font-semibold text-[#001526]">
                          <input
                            type="radio"
                            name="disability"
                            value="yes"
                            className="mr-1 w-6 h-6"
                            style={{ accentColor: "#001526" }}
                            disabled={!editMode}
                            onChange={() => setHasDisability(true)}
                          />{" "}
                          Yes
                        </label>
                        <label className="flex items-center font-semibold text-[#001526]">
                          <input
                            type="radio"
                            name="disability"
                            value="no"
                            className="mr-1 w-6 h-6"
                            style={{ accentColor: "#001526" }}
                            disabled={!editMode}
                            onChange={() => setHasDisability(false)}
                          />{" "}
                          No
                        </label>
                      </div>
                      {hasDisability && (
                        <input
                          type="text"
                          placeholder="Please specify"
                          className="mt-2 p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]"
                          disabled={!editMode}
                        />
                      )}
                    </div>
                  </div>
                  <div className="lg:flex gap-3 lg:mb-3 grid grid-cols-1 justify-center">
                    <div className="lg:w-1/2">
                      <label className="block text-[#001526] font-semibold">
                        Emergency Contact <span className="text-red-500">*</span>
                      </label>
                      <input type="text" placeholder="Emergency Contact" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled={!editMode} />
                    </div>
                    <div className="lg:w-1/4">
                      <label className="block text-[#001526] font-semibold">
                        Emergency Contact Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center w-full">
                        <PhoneInput
                          country={"ph"}
                          value={emergencyContactNumber}
                          onChange={setEmergencyContactNumber}
                          inputProps={{
                            name: "emergencyContactNumber",
                            required: true,
                            autoFocus: true,
                            disabled: !editMode,
                            className: "p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] pl-12",
                          }}
                          containerStyle={{ width: "100%" }}
                          inputStyle={{ width: "100%" }}
                          disabled={!editMode}
                        />
                      </div>
                    </div>
                    <div className="lg:w-1/4">
                      <label className="block text-[#001526] font-semibold">
                        Relationship <span className="text-red-500">*</span>
                      </label>
                      <input type="text" placeholder="Relationship" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled={!editMode} />
                    </div>
                  </div>
                  <div className="lg:flex lg:gap-3 lg:mb-3 items-center grid grid-cols-1">
                    <div className="2w-1/3">
                      <label className="block text-[#001526] font-semibold">
                        Medical Certificate <span className="text-red-500">*</span>
                      </label>
                      <input type="text" placeholder="Medical Certificate" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" value={medicalCertificate} disabled={!editMode} />
                    </div>
                    <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} disabled={!editMode} />
                    <button type="button" className="w-32 px-4 py-2 bg-[#001526] text-white rounded-lg text-[16px] font-semibold lg:mt-6 mt-3"
                      onClick={() => {
                        const fileUpload = document.getElementById("file-upload") as HTMLInputElement;
                        if (fileUpload) {
                          fileUpload.click();
                        }
                      }}
                      disabled={!editMode}
                    >
                      Upload
                    </button>
                    <div className="lg:w-2/5 mt-2">
                      <label className="block text-[#001526] font-semibold">
                        Issued By <span className="text-red-500">*</span>
                      </label>
                      <input type="text" placeholder="Issued By" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled={!editMode} />
                    </div>
                    <div className="lg:w-1/5">
                      <label className="block text-[#001526] font-semibold">
                        Date Issued <span className="text-red-500">*</span>
                      </label>
                      <input type="date" placeholder="Date Issued" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled={!editMode} />
                    </div>
                  </div>
                </section>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
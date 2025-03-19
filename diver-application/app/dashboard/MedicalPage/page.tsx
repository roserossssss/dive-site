"use client";

import { useState, ChangeEvent } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { BsExclamationCircle } from "react-icons/bs";

export default function MedicalPage() {
  const [editMode, setEditMode] = useState(false);
  const [hasAllergies, setHasAllergies] = useState(false);
  const [hasChronicCondition, setHasChronicCondition] = useState(false);
  const [hasDisability, setHasDisability] = useState(false);
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
  const [medicalCertificate, setMedicalCertificate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

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

  const handleSave = () => {
    setEditMode(false);
    setIsModalOpen(true);
  };

  return (
    <div className="p-5 relative">
      <div className="fixed top-0 left-0 w-full bg-white z-10 p-4 rounded-t-2xl md:pl-80">
        <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-[#001526] text-center md:text-left mt-2">Medical Profile</h2>
      </div>
      <div className="mb-1 text-right mt-4 pt-5">
        {editMode ? (
          <>
            <button
              className="w-36 px-5 py-3 bg-[#D9E7EC] text-[#001526] rounded-full mr-2 text-[16px] font-semibold"
              onClick={() => setIsCancelModalOpen(true)}
            >
              Cancel
            </button>
            <button
              className="w-36 px-5 py-3 bg-[#2C7DA0] text-white rounded-full text-[16px] font-semibold"
              onClick={handleSave}
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
      <div className="pt-3">
        {/* Header Container for User's Profile Photo, Name, and Email Address */}
        <div className="bg-[#2C7DA0] p-8 rounded-t-2xl flex flex-col md:flex-row justify-between items-center md:pl-12">
          <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
            <img src="/images/sample_profile_pic.jpg" alt="User Photo" className="w-24 h-24 md:w-32 md:h-32 rounded-full mr-4" />
            <div className="mt-4 md:mt-0 md:ml-4 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-100">JOHN DOE</h2>
              <p className="text-lg md:text-xl font-medium text-gray-200">johndoe@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-[#D9E7EC] p-6 rounded-b-2xl">
          <div className="mt-5 px-4">
            <form className="space-y-8">
              {/* Personal Information Section */}
              <section>
                <h3 className="text-xl font-bold text-[#001526] mb-1">Personal Information</h3>
                <div className="flex flex-col md:flex-row gap-3 mb-3">
                  <div className="w-full md:w-1/3">
                    <label className="block text-[#001526] font-semibold mb-1">First Name</label>
                    <input type="text" placeholder="First Name" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled />
                  </div>
                  <div className="w-full md:w-1/3">
                    <label className="block text-[#001526] font-semibold mb-1">Middle Name</label>
                    <input type="text" placeholder="Middle Name" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled />
                  </div>
                  <div className="w-full md:w-1/3">
                    <label className="block text-[#001526] font-semibold mb-1">Last Name</label>
                    <input type="text" placeholder="Last Name" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled />
                  </div>
                  <div className="w-full md:w-1/12">
                    <label className="block text-[#001526] font-semibold mb-1">Suffix</label>
                    <input type="text" placeholder="Suffix" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3 mb-3">
                  <div className="w-full md:w-1/4">
                    <label className="block text-[#001526] font-semibold mb-1">Birthdate</label>
                    <input type="date" placeholder="Birthdate" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled={!editMode} />
                  </div>
                  <div className="w-full md:w-1/12">
                    <label className="block text-[#001526] font-semibold mb-1">Age</label>
                    <input type="number" placeholder="Age" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled />
                  </div>
                  <div className="w-full md:w-1/3">
                    <label className="block text-[#001526] font-semibold mb-3">Sex</label>
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
                <h3 className="text-xl font-bold text-[#001526] mb-1">Medical Information</h3>
                <div className="flex flex-col md:flex-row gap-3 mb-3">
                  <div className="w-full md:w-1/3">
                    <label className="block text-[#001526] font-semibold mb-1">Blood Type <span className="text-red-500">*</span></label>
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
                  <div className="w-full md:w-1/4 md:ml-4">
                    <label className="block text-[#001526] font-semibold mb-3">Allergies <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center font-semibold text-[#001526]">
                        <input type="radio" name="allergies" value="yes" className="mr-1 w-6 h-6" style={{ accentColor: '#001526' }} disabled={!editMode} onChange={() => setHasAllergies(true)} /> Yes
                      </label>
                      <label className="flex items-center font-semibold text-[#001526]">
                        <input type="radio" name="allergies" value="no" className="mr-1 w-6 h-6" style={{ accentColor: '#001526' }} disabled={!editMode} onChange={() => setHasAllergies(false)} /> No
                      </label>
                    </div>
                    {hasAllergies && (
                      <input type="text" placeholder="Please specify" className="mt-3 p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled={!editMode} />
                    )}
                  </div>
                  <div className="w-full md:w-1/4 md:ml-4">
                    <label className="block text-[#001526] font-semibold mb-3">Chronic Condition <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center font-semibold text-[#001526]">
                        <input type="radio" name="chronicCondition" value="yes" className="mr-1 w-6 h-6" style={{ accentColor: '#001526' }} disabled={!editMode} onChange={() => setHasChronicCondition(true)} /> Yes
                      </label>
                      <label className="flex items-center font-semibold text-[#001526]">
                        <input type="radio" name="chronicCondition" value="no" className="mr-1 w-6 h-6" style={{ accentColor: '#001526' }} disabled={!editMode} onChange={() => setHasChronicCondition(false)} /> No
                      </label>
                    </div>
                    {hasChronicCondition && (
                      <input type="text" placeholder="Please specify" className="mt-3 p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled={!editMode} />
                    )}
                  </div>
                  <div className="w-full md:w-1/4 md:ml-4">
                    <label className="block text-[#001526] font-semibold mb-3">Disability <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center font-semibold text-[#001526]">
                        <input type="radio" name="disability" value="yes" className="mr-1 w-6 h-6" style={{ accentColor: '#001526' }} disabled={!editMode} onChange={() => setHasDisability(true)} /> Yes
                      </label>
                      <label className="flex items-center font-semibold text-[#001526]">
                        <input type="radio" name="disability" value="no" className="mr-1 w-6 h-6" style={{ accentColor: '#001526' }} disabled={!editMode} onChange={() => setHasDisability(false)} /> No
                      </label>
                    </div>
                    {hasDisability && (
                      <input type="text" placeholder="Please specify" className="mt-3 p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled={!editMode} />
                    )}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3 mb-3">
                  <div className="w-full md:w-1/2">
                    <label className="block text-[#001526] font-semibold mb-1">Emergency Contact Person <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Emergency Contact" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled={!editMode} />
                  </div>
                  <div className="w-full md:w-1/4">
                    <label className="block text-[#001526] font-semibold mb-1">Emergency Contact Number <span className="text-red-500">*</span></label>
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
                  <div className="w-full md:w-1/4">
                    <label className="block text-[#001526] font-semibold mb-1">Relationship <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Relationship" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled={!editMode} />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3 mb-3 items-start">
                  <div className="w-full md:w-1/3">
                    <label className="block text-[#001526] font-semibold mb-1">Medical Certificate <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-3">
                      <input type="text" placeholder="Medical Certificate" className="p-2 border border-[#001526] rounded-lg w-3/4 bg-[#D9E7EC]" value={medicalCertificate} disabled={!editMode} />
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={!editMode}
                      />
                      <button
                        type="button"
                        className="w-32 px-4 py-2 bg-[#001526] text-white rounded-lg text-[16px] font-semibold"
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
                    </div>
                    <div className="text-[#001526] text-sm mt-1">
                      <p>PNG, JPG, PDF, JPEG only</p>
                      <p>Maximum file size of 5MB</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-3 items-start w-full md:w-2/3">
                    <div className="w-full md:w-3/5">
                      <label className="block text-[#001526] font-semibold mb-1">Issued By <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="Issued By" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled={!editMode} />
                    </div>
                    <div className="w-full md:w-2/5">
                      <label className="block text-[#001526] font-semibold mb-1">Date Issued <span className="text-red-500">*</span></label>
                      <input type="date" placeholder="Date Issued" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC]" disabled={!editMode} />
                    </div>
                  </div>
                </div>
              </section>
            </form>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#D9E7EC] p-8 w-11/12 sm:w-[480px] h-auto sm:h-[450px] rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <div className="flex justify-center mb-4">
              <BsExclamationCircle className="w-24 h-24 text-[#001526]" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-center text-[#001526]">Confirm Changes</h2>
            <p className="font-semibold text-center text-[#001526] mb-5 text-[15px]">You're about to update your details. 
            <br />Want to proceed?</p>
            <div className="flex justify-center mt-5">
              <button
                className="mr-2 w-36 px-5 py-3 bg-[#D9E7EC] text-[#001526] border border-[#001526] rounded-full text-[16px] font-semibold"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="ml-2 w-36 px-5 py-3 bg-[#001526] text-white rounded-full text-[16px] font-semibold"
                onClick={() => {
                  // Logic for save changes
                  setIsModalOpen(false);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {isCancelModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#D9E7EC] p-8 w-11/12 sm:w-[480px] h-auto sm:h-[450px] rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <div className="flex justify-center mb-4">
              <BsExclamationCircle className="w-24 h-24 text-[#001526]" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-center text-[#001526]">Discard Changes</h2>
            <p className="font-semibold text-center text-[#001526] mb-5 text-[15px]">Are you sure you want to cancel?
            <br />Your changes won't be saved.</p>
            <div className="flex justify-center mt-5">
              <button
                className="mr-2 w-36 px-5 py-3 bg-[#D9E7EC] text-[#001526] border border-[#001526] rounded-full text-[16px] font-semibold"
                onClick={() => setIsCancelModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="ml-2 w-36 px-5 py-3 bg-[#001526] text-white rounded-full text-[16px] font-semibold"
                onClick={() => {
                  // Logic for cancel changes
                  setEditMode(false);
                  setIsCancelModalOpen(false);
                }}
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
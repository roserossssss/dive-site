"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { BsExclamationCircle } from "react-icons/bs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Image from "next/image";

export default function MedicalManagementView() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
	const [selectedAction, setSelectedAction] = useState("Actions");
	const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

	const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const router = useRouter();

  // Sample data 
  const mockData = {
    firstName: "First Name",
    middleName: "Middle Name",
    lastName: "Last Name",
    suffix: "",
    birthdate: "1990-01-01",
    age: 35,
    sex: "male",
    bloodType: "O+",
    hasAllergies: true,
    allergiesDetails: "Allergies",
    hasChronicCondition: false,
    chronicConditionDetails: "",
    hasDisability: false,
    disabilityDetails: "",
    emergencyContactPerson: "Contact Person",
    emergencyContactNumber: "+639123456789",
    relationship: "Relationship",
    medicalCertificate: "Certificate123.pdf",
    issuedBy: "Dr. Anne Curtis",
    dateIssued: "2025-05-01",
  };

	// Retrieve selected record's name from local storage
  useEffect(() => {
    const selectedRecord = localStorage.getItem("selectedMedicalRecord");
    if (selectedRecord) {
      const parsedRecord = JSON.parse(selectedRecord);
      const name = parsedRecord.name || "John Doe";
      const email = `${name.toLowerCase().replace(" ", ".")}@gmail.com`; // sample email only, no database
      setUserData({ name, email });
    }
  }, []);

	const handleApprove = () => {
    setShowApproveModal(false);
    console.log("Record Approved");
    // approve logic
  };

  const handleDecline = () => {
    setShowDeclineModal(false);
    console.log("Record Declined");
    // decline logic
  };

	const ActionModal = ({ title, message, onCancel, onConfirm }: { title: string; message: string; onCancel: () => void; onConfirm: () => void }) => (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-[#D9E7EC] p-8 w-11/12 sm:w-[480px] h-auto sm:h-[450px] rounded-2xl shadow-lg flex flex-col justify-center items-center">
				<div className="flex justify-center mb-4">
					<BsExclamationCircle className="w-24 h-24 text-[#001526]" />
				</div>
				<h2 className="text-3xl font-bold mb-6 text-center text-[#001526]">{title}</h2>
				<p
					className="font-semibold text-center text-[#001526] mb-5 text-[15px]"
					dangerouslySetInnerHTML={{ __html: message }}
				/>
				<div className="flex justify-center mt-5">
					<button
						className="mr-2 w-36 px-5 py-3 bg-[#D9E7EC] text-[#001526] border border-[#001526] rounded-full text-[16px] font-semibold"
						onClick={onCancel}
					>
						Cancel
					</button>
					<button
						className="ml-2 w-36 px-5 py-3 bg-[#001526] text-white rounded-full text-[16px] font-semibold"
						onClick={onConfirm}
					>
						Yes
					</button>
				</div>
			</div>
		</div>
	);

  return (
    <div className="p-5 relative">
      <div className="fixed top-0 left-0 w-full bg-[#001526] z-10 p-4 rounded-t-2xl md:pl-80">
			<div className="fixed top-0 left-0 w-full bg-[#001526] z-10 p-4 rounded-t-2xl md:pl-80">
        <div className="flex items-center justify-between md:justify-start">
          <IoIosArrowBack
            size={30}
            className="cursor-pointer mr-3 mt-2 text-white"
            onClick={() => router.push("/Admin-Dashboard/MedicalManagement")}
            title="Go back to Medical Management"
            aria-label="Go back to Medical Management"	
          />
          <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-white text-center flex-1 md:flex-none mt-2 mr-10">
            Medical Profile
          </h2>
        </div>
      </div>
      </div>
      <div className="mb-1 flex justify-end mt-4 pt-5 relative">
        <button
          className="sm:w-44 px-5 py-3 bg-[#2C7DA0] text-white rounded-full text-[16px] font-semibold flex items-center justify-between"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {selectedAction} <FaChevronDown />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-[3.02rem] w-44 py-4 px-2 bg-[#2C7DA0] text-white border-gray-300 rounded-lg shadow-lg">
            <button
              className="block w-full text-xs sm:text-[16px] font-semibold text-center px-2 sm:px-4 py-[0.55rem] -mt-1 rounded-lg hover:bg-[#D9E7EC] hover:text-[#001526] transition mb-1"
              onClick={() => {
                setSelectedAction("Approve");
                setDropdownOpen(false);
                setShowApproveModal(true);
              }}
            >
              Approve
            </button>
            <button
              className="block w-full text-xs sm:text-[16px] font-semibold text-center px-2 sm:px-4 py-[0.55rem] -mt-1 rounded-lg hover:bg-[#D9E7EC] hover:text-[#001526] transition"
              onClick={() => {
                setSelectedAction("Decline");
                setDropdownOpen(false);
                setShowDeclineModal(true);
              }}
            >
              Decline
            </button>
          </div>
        )}
      </div>

			{/* Approve Modal */}
			{showApproveModal && (
				<ActionModal
					title="Approve Record?"
					message="Are you sure you want to<br />approve this record?"
					onCancel={() => {
						setShowApproveModal(false);
						setSelectedAction("Actions");
					}}
					onConfirm={handleApprove}
				/>
			)}

			{/* Decline Modal */}
			{showDeclineModal && (
				<ActionModal
					title="Decline Record?"
					message="Are you sure you want to<br />decline this record?"
					onCancel={() => {
						setShowDeclineModal(false);
						setSelectedAction("Actions");
					}}
					onConfirm={handleDecline}
				/>
			)}

      <div className="pt-3">
        {/* Header Container for User's Profile Photo, Name, and Email Address */}
        <div className="bg-[#2C7DA0] p-8 rounded-t-2xl flex flex-col md:flex-row justify-between items-center md:pl-12">
          <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
            <Image
              width={24}
              height={24}
              src="/images/sample_profile_pic.jpg"
              alt="User Photo"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full mr-4"
            />
            <div className="mt-4 md:mt-0 md:ml-4 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white">
                {userData.name.toUpperCase()}
              </h2>
              <p className="text-lg md:text-xl font-medium text-white">
                {userData.email}
              </p>
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
                    <label htmlFor="firstName" className="block text-[#001526] font-semibold mb-1">First Name</label>
                    <input id="firstName" type="text" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={mockData.firstName} disabled />
                  </div>
                  <div className="w-full md:w-1/3">
                    <label htmlFor="middleName" className="block text-[#001526] font-semibold mb-1">Middle Name</label>
                    <input id="middleName" type="text" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={mockData.middleName} disabled />
                  </div>
                  <div className="w-full md:w-1/3">
                    <label htmlFor="lastName" className="block text-[#001526] font-semibold mb-1">Last Name</label>
                    <input id="lastName" type="text" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={mockData.lastName} disabled />
                  </div>
                  <div className="w-full md:w-1/12">
                    <label htmlFor="suffix" className="block text-[#001526] font-semibold mb-1">Suffix</label>
                    <input id="suffix" type="text" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={mockData.suffix} disabled />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3 mb-3">
                  <div className="w-full md:w-1/4">
                    <label htmlFor="birthdate" className="block text-[#001526] font-semibold mb-1">Birthdate</label>
                    <input id="birthdate" type="date" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={mockData.birthdate} disabled />
                  </div>
                  <div className="w-full md:w-1/12">
                    <label htmlFor="age" className="block text-[#001526] font-semibold mb-1">Age</label>
                    <input id="age" type="number" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={mockData.age} disabled />
                  </div>
                  <div className="w-full md:w-1/3">
                    <label className="block text-[#001526] font-semibold mb-3">Sex</label>
                    <div className="flex items-center gap-3">
                      <label htmlFor="male" className="flex items-center font-semibold text-[#001526]">
                        <input id="male" type="radio" name="sex" value="male" className="mr-1 w-6 h-6" style={{ accentColor: "#001526" }} checked={mockData.sex === "male"} disabled /> Male
                      </label>
                      <label htmlFor="female" className="flex items-center font-semibold text-[#001526]">
                        <input id="female" type="radio" name="sex" value="female" className="mr-1 w-6 h-6" style={{ accentColor: "#001526" }} checked={mockData.sex === "female"} disabled /> Female
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              {/* Medical Information Section */}
              <section>
                <h3 className="text-xl font-bold text-[#001526] mb-1">Medical Information</h3>
                <div className="flex flex-col md:flex-row gap-3 mb-3">
									<div className="w-full md:w-1/4">
										<label htmlFor="bloodType" className="block text-[#001526] font-semibold mb-1">Blood Type</label>
										<input id="bloodType" type="text" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={mockData.bloodType} disabled />
									</div>
									<div className="w-full md:w-1/4">
										<label className="block text-[#001526] font-semibold mb-1">Allergies</label>
										<input type="text" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={mockData.allergiesDetails} disabled />
									</div>
									<div className="w-full md:w-1/4">
										<label className="block text-[#001526] font-semibold mb-1">Chronic Condition</label>
										<input type="text" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={mockData.chronicConditionDetails} disabled />
									</div>
									<div className="w-full md:w-1/4">
										<label className="block text-[#001526] font-semibold mb-1">Disability</label>
										<input type="text" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={mockData.disabilityDetails} disabled />
									</div>
								</div>
                <div className="flex flex-col md:flex-row gap-3 mb-3">
                  <div className="w-full md:w-1/2">
                    <label htmlFor="emergencyContactPerson" className="block text-[#001526] font-semibold mb-1">Emergency Contact Person</label>
                    <input id="emergencyContactPerson" type="text" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={mockData.emergencyContactPerson} disabled />
                  </div>
                  <div className="w-full md:w-1/4">
                    <label htmlFor="emergencyContactNumber" className="block text-[#001526] font-semibold mb-1">Emergency Contact Number</label>
                    <PhoneInput country={"ph"} value={mockData.emergencyContactNumber} inputProps={{ name: "emergencyContactNumber", disabled: true }} containerStyle={{ width: "100%" }} inputStyle={{ width: "100%", backgroundColor: "#D9E7EC", borderColor: "#001526", color: "#001526", height: "40px",}} disableDropdown={true} />
                  </div>
                  <div className="w-full md:w-1/4">
                    <label htmlFor="relationship" className="block text-[#001526] font-semibold mb-1">Relationship</label>
                    <input id="relationship" type="text" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={mockData.relationship} disabled />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3 mb-3 items-start">
                  <div className="w-full md:w-1/3">
                    <label htmlFor="medicalCertificate" className="block text-[#001526] font-semibold mb-1">Medical Certificate</label>
                    <input id="medicalCertificate" type="text" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={mockData.medicalCertificate} disabled />
                  </div>
                  <div className="flex flex-row gap-3 items-start w-full md:w-2/3">
                    <div className="w-full md:w-3/5">
                      <label htmlFor="issuedBy" className="block text-[#001526] font-semibold mb-1">Issued By</label>
                      <input id="issuedBy" type="text" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={mockData.issuedBy} disabled />
                    </div>
                    <div className="w-full md:w-2/5">
                      <label htmlFor="dateIssued" className="block text-[#001526] font-semibold mb-1">Date Issued</label>
                      <input id="dateIssued" type="date" className="p-2 border border-[#001526] rounded-lg w-full bg-[#D9E7EC] text-[#001526]" value={mockData.dateIssued} disabled />
                    </div>
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
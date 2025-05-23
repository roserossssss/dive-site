import { useState } from "react";
import { FaUserShield } from "react-icons/fa";

const positions = ["Admin 1", "Admin 2", "Admin 3", "Admin 4"];
const suffixes = ["", "Jr.", "Sr.", "II", "III", "IV", "V"];

export default function InviteAdminModal({
  isVisible,
  onCancel,
  onSend,
}: {
  isVisible: boolean;
  onCancel: () => void;
  onSend: (data: {
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    position: string;
    email: string;
  }) => void;
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    position: "",
    email: "",
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    position: false,
    email: false,
  });

  if (!isVisible) return null;

  const isFirstNameInvalid = !formData.firstName.trim() && touched.firstName;
  const isLastNameInvalid = !formData.lastName.trim() && touched.lastName;
  const isPositionInvalid = !formData.position.trim() && touched.position;
  const isEmailInvalid = !formData.email.trim() && touched.email;

  const isFormValid =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.position.trim() &&
    formData.email.trim();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSend = () => {
    setTouched({
      firstName: true,
      lastName: true,
      position: true,
      email: true,
    });
    if (isFormValid) {
      onSend(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-[#D9E7EC] p-10 px-14 w-11/12 sm:w-[700px] min-h-[520px] rounded-2xl shadow-lg flex flex-col gap-6 items-center">
        <div className="w-full text-left">
          <h2 className="text-[#001526] text-3xl mt-2 font-bold flex items-center gap-2 mb-2">
            New Admin Account
          </h2>
        </div>
        <div className="w-full">
          <h3 className="text-[#001526] text-xl font-bold mb-2">Basic Information</h3>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex flex-col w-full">
              <label className="text-[#001526] font-semibold mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={`px-4 py-1 rounded-xl border-2 ${
                  isFirstNameInvalid ? "border-red-500" : "border-[#001526]"
                } text-[#001526] bg-transparent`}
                required
                aria-invalid={isFirstNameInvalid}
              />
              {isFirstNameInvalid && (
                <span className="text-red-500 text-xs mt-1 ml-1">First name is required.</span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label className="text-[#001526] font-semibold mb-1">Middle Name</label>
              <input
                type="text"
                value={formData.middleName}
                onChange={(e) => handleInputChange("middleName", e.target.value)}
                className="px-4 py-1 rounded-xl border-2 border-[#001526] text-[#001526] bg-transparent"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full">
            <div className="flex flex-col w-full">
              <label className="text-[#001526] font-semibold mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={`px-4 py-1 rounded-xl border-2 ${
                  isLastNameInvalid ? "border-red-500" : "border-[#001526]"
                } text-[#001526] bg-transparent`}
                required
                aria-invalid={isLastNameInvalid}
              />
              {isLastNameInvalid && (
                <span className="text-red-500 text-xs mt-1 ml-1">Last name is required.</span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label className="text-[#001526] font-semibold mb-1">Suffix</label>
              <select
                value={formData.suffix}
                onChange={(e) => handleInputChange("suffix", e.target.value)}
                className="px-4 py-1 rounded-xl border-2 border-[#001526] text-[#001526] bg-transparent"
              >
                <option value="">Select Suffix (optional)</option>
                {suffixes.map((suf) => (
                  <option key={suf} value={suf}>
                    {suf}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full">
            <div className="flex flex-col w-full">
              <label className="text-[#001526] font-semibold mb-1">
                Position <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                className={`px-4 py-1 rounded-xl border-2 ${
                  isPositionInvalid ? "border-red-500" : "border-[#001526]"
                } text-[#001526] bg-transparent`}
                required
                aria-invalid={isPositionInvalid}
              >
                <option value="">Select Position</option>
                {positions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
              {isPositionInvalid && (
                <span className="text-red-500 text-xs mt-1 ml-1">Position is required.</span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label className="text-[#001526] font-semibold mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`px-4 py-1 rounded-xl border-2 ${
                  isEmailInvalid ? "border-red-500" : "border-[#001526]"
                } text-[#001526] bg-transparent`}
                required
                aria-invalid={isEmailInvalid}
              />
              {isEmailInvalid && (
                <span className="text-red-500 text-xs mt-1 ml-1">Email is required.</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-12 w-full">
          <button
            onClick={onCancel}
            className="w-full sm:w-44 py-2 border-2 border-[#001526] rounded-full text-[#001526] font-semibold hover:bg-[#001526] hover:text-white transition duration-200"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="w-full sm:w-44 py-2 border-2 border-[#001526] rounded-full text-[#001526] font-semibold hover:bg-[#001526] hover:text-white transition duration-200 disabled:opacity-50"
            type="button"
            disabled={!isFormValid}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
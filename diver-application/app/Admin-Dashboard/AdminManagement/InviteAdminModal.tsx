import { FaUserShield } from "react-icons/fa";

export default function InviteAdminModal({
  isVisible,
  name,
  email,
  onNameChange,
  onEmailChange,
  onCancel,
  onSend,
}: {
  isVisible: boolean;
  name: string;
  email: string;
  onNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onCancel: () => void;
  onSend: () => void;
}) {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-[#D9E7EC] p-8 w-11/12 sm:w-[700px] min-h-[420px] rounded-2xl shadow-lg flex flex-col gap-6 items-center">
        <div className="w-full text-left">
          <h2 className="text-[#001526] text-3xl mt-2 ml-2 font-bold flex items-center gap-2 mb-2">
            <FaUserShield className="text-[#001526] w-20 h-20" /> Invite Admin
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full">
          <div className="flex flex-col w-full">
            <label className="text-[#001526] font-semibold mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Full Name"
              className="px-4 py-1 rounded-xl border-2 border-[#001526] placeholder-gray-500 placeholder:text-sm text-[#001526] bg-transparent"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-[#001526] font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="Email Address"
              className="px-4 py-1 rounded-xl border-2 border-[#001526] placeholder-gray-500 placeholder:text-sm text-[#001526] bg-transparent"
            />
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-16 w-full">
          <button
            onClick={onCancel}
            className="w-full sm:w-44 py-2 border-2 border-[#001526] rounded-full text-[#001526] font-semibold hover:bg-[#001526] hover:text-white transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onSend}
            className="w-full sm:w-44 py-2 border-2 border-[#001526] rounded-full text-[#001526] font-semibold hover:bg-[#001526] hover:text-white transition duration-200"
          >
            Send Invite
          </button>
        </div>
      </div>
    </div>
  );
}
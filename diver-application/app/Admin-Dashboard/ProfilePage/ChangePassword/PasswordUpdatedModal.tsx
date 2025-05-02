import { LuShieldCheck } from "react-icons/lu";

interface PasswordUpdatedModalProps {
  onClose: () => void;
}

export default function PasswordUpdatedModal({ onClose }: PasswordUpdatedModalProps) {
  return (
    <div
      role="dialog"
      aria-labelledby="modalTitle"
      aria-describedby="modalDescription"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-[#D9E7EC] p-8 w-11/12 sm:w-[480px] h-auto sm:h-[450px] rounded-2xl shadow-lg flex flex-col justify-center items-center">
        <div className="flex justify-center mb-4">
          <LuShieldCheck className="w-24 h-24 text-[#001526]" />
        </div>
        <h2 id="modalTitle" className="text-3xl font-bold mb-6 text-center text-[#001526]">
          Password Updated!
        </h2>
        <p
          id="modalDescription"
          className="font-semibold text-center text-[#001526] mb-5 text-[15px]"
        >
          Password update complete. <br />
          Please use your new password to log in next time.
        </p>
        <div className="flex justify-center mt-5">
          <button
            className="w-36 px-5 py-3 bg-[#001526] text-white rounded-full text-[16px] font-semibold"
            onClick={onClose}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}
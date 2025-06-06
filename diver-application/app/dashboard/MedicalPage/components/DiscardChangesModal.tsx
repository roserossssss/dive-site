import { BsExclamationCircle } from "react-icons/bs";

interface DiscardChangesModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DiscardChangesModal({ onCancel, onConfirm }: DiscardChangesModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#D9E7EC] p-8 w-11/12 sm:w-[480px] h-auto sm:h-[450px] rounded-2xl shadow-lg flex flex-col justify-center items-center">
        <div className="flex justify-center mb-4">
          <BsExclamationCircle className="w-24 h-24 text-[#001526]" />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center text-[#001526]">Discard Changes?</h2>
        <p className="font-semibold text-center text-[#001526] mb-5 text-[15px]">
          Are you sure you want to cancel?
          <br />
          Your changes won&apos;t be saved.
        </p>
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
}
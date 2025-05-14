import { GoTrash } from "react-icons/go";

interface DeleteConfirmationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  recordCount: number;
}

export default function DeleteConfirmationModal({
  isVisible,
  onClose,
  onConfirm,
  recordCount,
}: DeleteConfirmationModalProps) {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]" // Ensure it covers the entire viewport
    >
      <div className="bg-[#D9E7EC] p-8 w-11/12 sm:w-[480px] h-auto sm:h-[450px] rounded-2xl shadow-lg flex flex-col justify-center items-center">
        <div className="flex justify-center mb-4">
          <GoTrash className="text-[#001526] w-24 h-24 mt-3" />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center text-[#001526]">
          Delete {recordCount === 1 ? "this record" : `${recordCount} records`}?
        </h2>
        <p className="font-semibold text-center text-[#001526] mb-5 text-[15px]">
          Are you sure you want to delete? <br />
          This action cannot be undone.
        </p>
        <div className="flex justify-center mt-5">
          <button
            className="mr-2 w-36 px-5 py-3 bg-[#D9E7EC] text-[#001526] border border-[#001526] rounded-full text-[16px] font-semibold"
            onClick={onClose}
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
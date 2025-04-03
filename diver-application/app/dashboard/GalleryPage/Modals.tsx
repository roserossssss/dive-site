import React from "react";
import { GoTrash } from "react-icons/go";
import { BsExclamationCircle } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";

interface ModalsProps {
  showDeleteModal: boolean;
  setShowDeleteModal: (value: boolean) => void;
  deleteSelectedImages: () => void;
  selectedImages: string[];
  showErrorModal: boolean;
  setShowErrorModal: (value: boolean) => void;
  errorTitle: string;
  errorMessage: string;
  selectedPhotoIndex: number | null;
  setSelectedPhotoIndex: (value: number | null) => void;
  gallery: any[];
  handlePreviousPhoto: () => void;
  handleNextPhoto: () => void;
}

const Modals: React.FC<ModalsProps> = ({
  showDeleteModal,
  setShowDeleteModal,
  deleteSelectedImages,
  selectedImages,
  showErrorModal,
  setShowErrorModal,
  errorTitle,
  errorMessage,
  selectedPhotoIndex,
  setSelectedPhotoIndex,
  gallery,
  handlePreviousPhoto,
  handleNextPhoto,
}) => {
  return (
    <>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#D9E7EC] p-8 w-11/12 sm:w-[480px] h-auto sm:h-[450px] rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <div className="flex justify-center mb-4">
              <GoTrash className="text-[#001526] w-24 h-24 mt-3" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-center text-[#001526]">
              Delete {selectedImages.length} Photos?
            </h2>
            <p className="font-semibold text-center text-[#001526] mb-5 text-[15px]">
              This action cannot be undone.
            </p>
            <div className="flex justify-center mt-5">
              <button
                className="mr-2 w-36 px-5 py-3 bg-[#D9E7EC] text-[#001526] border border-[#001526] rounded-full text-[16px] font-semibold"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="ml-2 w-36 px-5 py-3 bg-[#001526] text-white rounded-full text-[16px] font-semibold"
                onClick={deleteSelectedImages}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal for File Size and Type */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#D9E7EC] p-8 w-11/12 sm:w-[480px] h-auto sm:h-[450px] rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <div className="flex justify-center mb-4">
              <BsExclamationCircle className="text-[#001526] w-24 h-24 mt-3" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-center text-[#001526]">
              {errorTitle}
            </h2>
            <p
              className="font-semibold text-center text-[#001526] mb-5 text-[15px]"
              style={{ whiteSpace: "pre-line" }}
            >
              {errorMessage}
            </p>
            <div className="flex justify-center mt-5">
              <button
                className="w-36 px-5 py-3 bg-[#001526] text-white rounded-full text-[16px] font-semibold"
                onClick={() => setShowErrorModal(false)}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Photo Modal */}
      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-[#D9E7EC] rounded-lg shadow-lg max-w-full sm:max-w-4xl w-full p-4">
            <div className="relative flex justify-center items-center">
              <img
                src={gallery[selectedPhotoIndex].src}
                alt={gallery[selectedPhotoIndex].alt}
                className="max-h-[80vh] max-w-full object-contain rounded-lg"
              />
              <button
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
                onClick={() => setSelectedPhotoIndex(null)}
              >
                <IoIosClose className="w-8 h-8" />
              </button>
            </div>
            {selectedPhotoIndex > 0 && (
              <button
                onClick={handlePreviousPhoto}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-75"
              >
                <IoIosArrowBack className="w-6 h-6" />
              </button>
            )}
            {selectedPhotoIndex < gallery.length - 1 && (
              <button
                onClick={handleNextPhoto}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-75"
              >
                <IoIosArrowForward className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modals;
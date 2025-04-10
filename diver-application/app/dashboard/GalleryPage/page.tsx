"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Modals from "./Modals";
import Image from "next/image";

interface GalleryItem {
  src: string;
  alt: string;
  Name: string;
  Date: string;
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([
    {
      src: "https://media.istockphoto.com/id/1990410887/photo/scuba-diver-makes-ok-sign-underwater-scene-with-exotic-fishes-and-coral-reef.jpg?s=1024x1024&w=is&k=20&c=KKEOBFFWwFnJCVxH1poexlnC_AcFa5ap6wtXSt3OOy4=",
      alt: "Authorings",
      Name: "Selfie",
      Date: "2024-06-06",
    },

  ]);

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);

  const photosPerPage = 6;

  const toggleSelectMode = () => {
    setIsSelecting(!isSelecting);
    setSelectedImages([]);
  };

  const toggleImageSelection = (src: string) => {
    setSelectedImages((prev) =>
      prev.includes(src) ? prev.filter((item) => item !== src) : [...prev, src]
    );
  };

  const deleteSelectedImages = () => {
    const updatedGallery = gallery.filter(
      (item) => !selectedImages.includes(item.src)
    );
    setGallery(updatedGallery);
    setSelectedImages([]);
    setShowDeleteModal(false);
  };

  const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      const maxImageSize = 5 * 1024 * 1024; // 5MB max file size for uploading photos

      const newPhotos = Array.from(files)
        .filter((file) => {
          if (!validTypes.includes(file.type)) {
            setErrorTitle("Invalid File Type");
            setErrorMessage("Please upload a JPG, JPEG, or PNG file.");
            setShowErrorModal(true);
            return false;
          }
          if (file.size > maxImageSize) {
            setErrorTitle("File Size Too Large");
            setErrorMessage(
              "Your image file is too large.\nPlease upload an image under 5MB."
            );
            setShowErrorModal(true);
            return false;
          }
          return true;
        })
        .map((file) => ({
          src: URL.createObjectURL(file),
          alt: file.name,
          Name: file.name,
          Date: new Date().toISOString().split("T")[0],
        }));

      setGallery((prevGallery) => [...prevGallery, ...newPhotos]);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(gallery.length / photosPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePreviousPhoto = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  const handleNextPhoto = () => {
    if (
      selectedPhotoIndex !== null &&
      selectedPhotoIndex < gallery.length - 1
    ) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };

  const paginatedGallery = gallery.slice(
    (currentPage - 1) * photosPerPage,
    currentPage * photosPerPage
  );

  return (
    <div className="flex-1 p-5 pt-1 relative">
      <div className="fixed top-0 left-0 w-full bg-white z-10 p-4 rounded-t-2xl md:pl-80">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#001526] text-center md:text-left mt-2">
          My Gallery
        </h2>
      </div>
      <div className="mx-auto mt-16">
        <div className="mt-7 mb-4 flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-[#001526] text-lg md:text-2xl lg:text-2xl font-bold mt-3">
            {gallery.length} Items
          </h1>

          <div className="flex items-center flex-wrap gap-2">
            <label
              htmlFor="upload-photo"
              className="bg-[#001526] text-white p-2 text-sm md:text-base w-24 md:w-28 lg:w-36 h-8 md:h-10 lg:h-11 border-[#001526] rounded-full shadow-md hover:bg-white hover:text-[#001526] hover:border-2 cursor-pointer flex items-center justify-center"
            >
              Add Photo
            </label>
            <input
              id="upload-photo"
              type="file"
              accept="image/*"
              multiple
              onChange={handleAddPhoto}
              className="hidden"
            />

            <button
              onClick={toggleSelectMode}
              className={`p-2 text-sm md:text-base w-24 md:w-28 lg:w-36 h-8 md:h-10 lg:h-11 border-[#001526] rounded-full shadow-md transition ${
                isSelecting
                  ? "bg-white border-2 border-[#001526] text-[#001526]"
                  : "bg-[#001526] text-white hover:bg-white hover:text-[#001526] hover:border-2"
              }`}
            >
              {isSelecting ? "Cancel" : "Select"}
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className={`p-2 text-sm md:text-base w-28 md:w-28 lg:w-36 h-8 md:h-10 lg:h-11 border-[#001526] rounded-full shadow-md transition ${
                selectedImages.length > 0
                  ? "bg-[#CF0C0F] text-white hover:bg-red-700"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
              disabled={selectedImages.length === 0}
            >
              Delete ({selectedImages.length})
            </button>

            <IoIosArrowBack
              onClick={handlePreviousPage}
              className={`text-[#001526] w-8 h-8 cursor-pointer ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Previous"
            />
            <IoIosArrowForward
              onClick={handleNextPage}
              className={`text-[#001526] w-8 h-8 cursor-pointer ${
                currentPage === Math.ceil(gallery.length / photosPerPage)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              aria-label="Next"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 auto-rows-[150px] sm:auto-rows-[200px]">
          {paginatedGallery.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`group relative flex items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg cursor-pointer transition-all duration-200 ${
                index === 0 ? "col-span-2 sm:col-span-2 row-span-2" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                if (isSelecting) {
                  // Toggle selection if in select mode
                  toggleImageSelection(item.src);
                } else {
                  // Open view photo modal if not in select mode
                  setSelectedPhotoIndex((currentPage - 1) * photosPerPage + index);
                }
              }}
            >
              <Image width={1000} height={1000}
                src={item.src}
                loading="lazy"
                alt={item.alt}
                className={`absolute inset-0 h-full w-full object-cover object-center transition duration-200 ${
                  isSelecting ? "group-hover:opacity-70" : "group-hover:scale-110"
                }`}
              />
              {selectedImages.includes(item.src) && (
                <div className="absolute top-2 right-2 rounded-full p-2 shadow-md text-white border-white border-2">
                  <FaCheck />
                </div>
              )}
              <span className="relative p-2 text-sm text-white bg-black bg-opacity-50 rounded-md">
                {item.Name}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Modals */}
      <Modals
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteSelectedImages={deleteSelectedImages}
        selectedImages={selectedImages}
        showErrorModal={showErrorModal}
        setShowErrorModal={setShowErrorModal}
        errorTitle={errorTitle}
        errorMessage={errorMessage}
        selectedPhotoIndex={selectedPhotoIndex}
        setSelectedPhotoIndex={setSelectedPhotoIndex}
        handlePreviousPhoto={handlePreviousPhoto}
        handleNextPhoto={handleNextPhoto} 
        gallery={[]}      />
    </div>
  );
}
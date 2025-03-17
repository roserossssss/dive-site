"use client";

import { useState } from "react";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";

export default function DiveManagement() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

    const gallery = [
        {
          src: "https://media.istockphoto.com/id/1990410887/photo/scuba-diver-makes-ok-sign-underwater-scene-with-exotic-fishes-and-coral-reef.jpg?s=1024x1024&w=is&k=20&c=KKEOBFFWwFnJCVxH1poexlnC_AcFa5ap6wtXSt3OOy4=",
          alt: "Authorings",
          Name: "Selfie",
          colSpan: "md:row-span-1",
          Date: "2024-06-06",
        },
        {
          src: "https://media.istockphoto.com/id/498283106/photo/underwater-scuba-diver-explore-and-enjoy-coral-reef-sea-life.jpg?s=1024x1024&w=is&k=20&c=-y2BATetieJjRS6EwA8VQ_ojDUK-P19rqPdP4WWlHvY=",
          alt: "Authorings",
          Name: "Selfie",
          colSpan: "md:col-span-1",
          Date: "2024-06-01",
        },
        {
          src: "https://media.istockphoto.com/id/1490908827/photo/female-scuba-diver-taking-a-photo-of-hawksbill-turtle-swimming-over-coral-reef-in-the-blue.jpg?s=1024x1024&w=is&k=20&c=tenyIxQhvxei5KP4-kHascn-Z2xiiacKAkcqVFetzIY=",
          alt: "Authorings",
          Name: "Selfie",
          colSpan: "md:col-span-1",
          Date: "2024-06-07",
        },
        {
            src: "https://media.istockphoto.com/id/173942847/photo/diving-with-turtle-in-great-barrier-reef-australia.jpg?s=1024x1024&w=is&k=20&c=yFBL__JNhuFTDh7VSB5wiDD_5U5tbnK7cCkuWSb2f_w=",
            alt: "Authorings",
            Name: "Selfie",
            colSpan: "md:col-span-1",
            Date: "2024-06-08",
          },
      ];

      const toggleSelectMode = () => {
        setIsSelecting(!isSelecting);
        setSelectedImages([]); // Clear selections when toggling
    };

    const toggleImageSelection = (src: string) => {
      if (selectedImages.includes(src)) {
          setSelectedImages(selectedImages.filter((item) => item !== src));
      } else {
          setSelectedImages([...selectedImages, src]);
      }
  };
    return (

        <div className="p-2">
        <h1 className="text-black text-3xl font-extrabold">My Gallery</h1>
        <div className="mx-auto md:px-8">

          <div className="mt-7 mb-4 flex items-center justify-between">
            
              <div>
                <h1 className="text-black text-xl font-semibold">Items count {gallery.length}</h1>
              </div>

              <div className=" ">
              <Link href="#">
            <button className="bg-[#001526] m-1 text-white p-1 text-sm w-32 border-black rounded-2xl shadow-md hover:bg-blue-600 transition">
                Add photo
            </button>
              </Link>

              <button onClick={toggleSelectMode}
                            className={`m-1 p-1 text-sm w-32 border-black rounded-2xl shadow-md transition ${
                                isSelecting
                                    ? "bg-gray-600 text-white"
                                    : "bg-[#001526] text-white hover:bg-blue-600"
                            }`}
                        >
                            {isSelecting ? "Cancel" : "Select"}
                        </button>

              <button className={`m-1 p-1 text-sm w-32 border-black rounded-2xl shadow-md transition ${
                                selectedImages.length > 0
                                    ? "bg-[#CF0C0F] text-white hover:bg-red-700"
                                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                            }`}
                            disabled={selectedImages.length === 0}
                        >
                            Delete ({selectedImages.length})
                        </button>
              </div>
          </div>
  

          <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 md:gap-6 ">
            {gallery.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80 cursor-pointer ${
                  isSelecting && "border-2 border-gray-400"
              }`}
              onClick={() => isSelecting && toggleImageSelection(item.src)}
          >
                <img
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


                <span className="relative lg:p-1 w-24 p-4 inline-block text-sm text-white md:ml-5 md:text-lg">
                  {item.Name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

    )}
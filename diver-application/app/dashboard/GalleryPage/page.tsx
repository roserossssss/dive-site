export default function DiveManagement() {


    const gallery = [
        {
          src: "https://media.istockphoto.com/id/1990410887/photo/scuba-diver-makes-ok-sign-underwater-scene-with-exotic-fishes-and-coral-reef.jpg?s=1024x1024&w=is&k=20&c=KKEOBFFWwFnJCVxH1poexlnC_AcFa5ap6wtXSt3OOy4=",
          alt: "Authorings",
          Name: "Selfie",
          colSpan: "md:col-span-1",
        },
        {
          src: "https://media.istockphoto.com/id/1990410887/photo/scuba-diver-makes-ok-sign-underwater-scene-with-exotic-fishes-and-coral-reef.jpg?s=1024x1024&w=is&k=20&c=KKEOBFFWwFnJCVxH1poexlnC_AcFa5ap6wtXSt3OOy4=",
          alt: "Authorings",
          Name: "Selfie",
          colSpan: "md:col-span-1",
        },
        {
          src: "https://media.istockphoto.com/id/1990410887/photo/scuba-diver-makes-ok-sign-underwater-scene-with-exotic-fishes-and-coral-reef.jpg?s=1024x1024&w=is&k=20&c=KKEOBFFWwFnJCVxH1poexlnC_AcFa5ap6wtXSt3OOy4=",
          alt: "Authorings",
          Name: "Selfie",
          colSpan: "md:col-span-1",
        },
        {
            src: "https://media.istockphoto.com/id/1990410887/photo/scuba-diver-makes-ok-sign-underwater-scene-with-exotic-fishes-and-coral-reef.jpg?s=1024x1024&w=is&k=20&c=KKEOBFFWwFnJCVxH1poexlnC_AcFa5ap6wtXSt3OOy4=",
            alt: "Authorings",
            Name: "Selfie",
            colSpan: "md:col-span-1",
          },
          {
            src: "https://media.istockphoto.com/id/1990410887/photo/scuba-diver-makes-ok-sign-underwater-scene-with-exotic-fishes-and-coral-reef.jpg?s=1024x1024&w=is&k=20&c=KKEOBFFWwFnJCVxH1poexlnC_AcFa5ap6wtXSt3OOy4=",
            alt: "Authorings",
            Name: "Selfie",
            colSpan: "md:col-span-1",
          },
        {
          src: "https://media.istockphoto.com/id/1990410887/photo/scuba-diver-makes-ok-sign-underwater-scene-with-exotic-fishes-and-coral-reef.jpg?s=1024x1024&w=is&k=20&c=KKEOBFFWwFnJCVxH1poexlnC_AcFa5ap6wtXSt3OOy4=",
          alt: "Authorings",
          Name: "Selfie",
          colSpan: "md:col-span-1",
        },
      ];
    return (


        <div className="bg-white h-450 p-30 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
   
            <a
              href="#"
              className="inline-block rounded-lg border bg-white dark:border-none px-4 py-2 text-center text-2xl font-semibold text-black outline-none transition duration-100 focus-visible:ring active:bg-gray-200 hover:bg-cyan-300"
            >
              +
            </a>
          </div>
  
          {/* Gallery Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
            {gallery.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80 ${item.colSpan}`}
              >
                <img
                  src={item.src}
                  loading="lazy"
                  alt={item.alt}
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-50"></div>
                <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                  {item.Name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

    )}
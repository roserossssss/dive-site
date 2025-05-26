import Image from "next/image";

export default function WelcomeCard() {
  return (
    <div className="bg-[#2C7DA0] text-white py-7 px-8 rounded-2xl shadow-md flex flex-col md:flex-row items-center md:items-start justify-between h-auto md:h-[13rem]">
      {/* Left Section - Welcome Text */}
      <div className="flex-1 text-center md:text-left mb-4 md:ml-10 md:mt-6">
        <h1 className="md:-mt-5 lg:mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Welcome, Admin!</h1>
        <p className="mt-2 lg:mt-2 text-sm md:text-xs lg:text-sm leading-snug">
          Your commitment to managing dive records ensures safe adventures. <br />
          Stay on top of every detail to keep divers safe.
        </p>
      </div>

      {/* Right Section - SVG */}
      <div className="flex-shrink-0 w-32 h-32 md:w-48 md:h-full md:mr-5">
        <Image
          src="/images/welcome_admin_v1.svg"
          alt="Welcome Admin Illustration"
          width={200}
          height={200}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
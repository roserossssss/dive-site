"use client";

export default function Card() {
  return (
    <div className="bg-[#2C7DA0] text-white p-8 rounded-lg shadow-md w-full h-auto mb-2 grid grid-cols-2">
        <div>
            <h1 className="text-3xl font-bold mb-2 text-bold">Hi, User</h1>
      <p className="text-xs text-white text-opacity-50 mb-2">Stay updated with your dive history and make every dive count!</p>
      <button>
        <p className="text-sm text-white bg-[#001526] rounded-lg p-1 text-center px-3 w-full ">Check dive logs --{">"}</p>
      </button>
      
        </div>
      
      <div>
      <div className="text-4xl mb-2 text-center">Logo</div>
      </div>
    </div>
  );
}

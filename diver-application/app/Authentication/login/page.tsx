import Link from 'next/link';

export default function login() {
    return (
<div className="relative min-h-screen bg-gray-200 flex items-center justify-center">
  <div 
    className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/8a/Discover_Scuba_Diving_--_St._Croix%2C_US_Virgin_Islands.jpg')] 
    bg-center bg-no-repeat bg-cover"
  >
  </div>

  {/* Container */}
  <div className="relative z-10 flex w-full lg:w-3/5 justify-center items-center ml-auto p-16">
    
    {/* Wrapper for controlling size */}
    <div className="w-full max-w-7xl p-12 ">
      <form className="bg-[#D9E7EC] p-10 rounded-3xl shadow-lg w-full py-24">
        <div className="flex flex-col items-center px-14">
          
          <img className="w-24 h-24 mb-4" />

          <h1 className="text-3xl font-bold text-center mb-6 text-[#001526]">Log-in</h1>

          <input    
            type="text" 
            placeholder="Email Address" 
            className="w-full p-4 mb-4 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9E7EC] border-black border-t-1"
            required 
          />

          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-4 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9E7EC] border-black border-t-1"
            required 
          />

          <div className="flex justify-end w-full mb-4 text-sm">
            <Link href="/forgot-password" className="text-[#001526] hover:underline font-bold">
              Forgot Password?
            </Link>
          </div>

          <button className="w-full bg-[#001526] text-white py-3 rounded-2xl hover:bg-blue-700 transition mt-16">
            Login
          </button>

          <div className="flex justify-center mt-4">
            <span className="text-[#001526] font-bold">Don't have an account?</span>
            <Link href="/Authentication/signup" className="text-[#001526] hover:underline font-bold ml-2">
              Sign-up
            </Link>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>



    )};
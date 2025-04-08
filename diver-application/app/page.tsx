import Image from "next/image";
import Link from 'next/link';


export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-200 flex justify-center">
            <Image 
          src="/images/page_bg_v1.jpg"  
          alt="Landing Page"
          objectFit="cover"
          priority 
          className="absolute inset-0 w-full h-full"
          width={1500}
          height={0}
                        />


            <div className="relative lg:flex w-full">
            <div className="w-full lg:m-20 p-4">
            <div className="lg:ml-6 ">
          <Image className="lg:flex justify-center" src="/images/Welcomepage.png" alt={"logo"} width={300} height={300}/>
          
          
          </div>
          {/* Body */}
          <div className="mt-4 ml-8">
          <h1 className="text-3xl font-bold mt-8 mr-96 pr-32 text-white">Truly Inspirational </h1>
          <h1 className="text-3xl font-bold mt-2 mr-96 pr-32 text-white">Diving Experinces </h1>
          <h2 className="text-1xl mt-8 lg:mr-96 text-white">Dive smarter with an all-in-one platform to track your dives, stay organized, 
          analyze your progress, and make every dive count!</h2>
           {/* Sign-up button */}
           <Link href="/Authentication/signup">
            <button className="w-40 bg-[#D9E7EC] text-[#001526] py-2 rounded-3xl hover:bg-blue-700 transition mt-40 font-semibold">
             Get Started
            </button>
           </Link>
           
          </div>
          
          

               
                </div>
                </div>
            </div>
  );
}

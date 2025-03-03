import Link from 'next/link';

export default function login() {
    return (

        <div className="flex min-h-screen">

            <div className="hidden md:flex md:w-1/2 bg-blue-600 justify-center items-center">
                <img 
                    src="#" 
                    alt="Login Illustration" 
                    className="w-3/4 max-w-md"
                />
            </div>


            <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-100">
                <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">ML Dive Log-in</h1>


                    <input 
                        type="text" 
                        placeholder="Username" 
                        className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required 
                    />


                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required 
                    />


                    <div className="flex justify-between mb-4 text-sm">
                        <Link href="/sign-up" className="text-blue-500 hover:underline">
                            Sign up
                        </Link>
                        <Link href="/forgot-password" className="text-blue-500 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>


                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )};
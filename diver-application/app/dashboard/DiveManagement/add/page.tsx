"use client";
import { useState } from "react";


export default function AddDive() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);


    //for the up and down buttons
    const [depth, setDepth] = useState(0);
    const [time, setTime] = useState(0);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
        <h1 className="text-black text-4xl ">My Dive</h1>

            <div className="flex justify-end space-x-4 mb-4">
                <button className="bg-gray-300 text-black font-bold py-2 px-6 rounded-3xl hover:bg-gray-400 transition">Cancel</button>
                <button className="bg-[#2C7DA0] text-white font-bold py-2 px-6 rounded-3xl hover:bg-opacity-80 transition">Save</button>
            </div>


            <div className="max-w-4xl mx-auto -p-4 bg-[#D9E7EC] shadow-md rounded-xl">
                <h1 className="text-2xl font-bold text-center rounded-t-2xl bg-[#2C7DA0] text-[#2C7DA0] p-12 mb-6"></h1>
                <form action="/api/add-dive" method="POST" encType="multipart/form-data" className="space-y-4 p-5 -mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        

                        <div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Dive Details</h2>
                            <div className="flex flex-col">
                                <label className="text-gray-700  font-semibold">Title</label>
                                <input type="text" name="title" required className="border p-2 rounded-md w-72 " />
                            </div>
                            
                            <div className="flex flex-col">
                                <label className="text-gray-700 font-semibold">Location</label>
                                <input type="text" name="location" required className="border p-2 rounded-md w-72" />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-gray-700 font-semibold">Date</label>
                                <input type="date" name="date" required className="border text-sm p-2 w-36 rounded-md" />
                            </div>

                            
                        </div>

                        {/*Le Image Upload */}
                        <div>
    <h2 className="text-lg font-semibold text-gray-700 mb-2">Image Upload</h2>
    <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Upload Image</label>

        <input 
            type="file" 
            name="image" 
            accept="image/*" 
            className="hidden" 
            id="fileUpload"
            onChange={handleImageChange} 
        />

        <label htmlFor="fileUpload" className="cursor-pointer mt-4 border-2 border-black rounded-md shadow-md max-h-40 object-cover overflow-hidden">
            {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-md" />
            ) : (
                <div className="flex items-center justify-center w-full h-40 text-gray-500">
                    Click to upload image
                </div>
            )}
        </label>


        <label htmlFor="fileUpload" className="mt-4 flex justify-center">
            <button type="button" className="bg-[#001526] text-white font-bold p-1 w-full px-6 rounded-md hover:bg-opacity-80 transition">
                Upload Image
            </button>
        </label>
    </div>
</div>

                    </div>

                    <h1 className="text-black text-lg">Dive Details</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           
                            <div className="flex flex-col">
                                <label className="text-gray-700 font-semibold">Notes</label>
                                <textarea name="notes" className="border p-2 rounded-md h-24"></textarea>
                            </div>


                          <div className="grid grid-cols-2 mt-4">

                          <div className="flex flex-col">
                <label className="text-gray-700 font-semibold">Dive Depth(m)</label>
                <div className="flex items-center space-x-2">
                    
                    <input 
                        type="text"
                        value={depth} 
                        readOnly 
                        className="w-16 text-center border p-2 rounded-md"
                    />
                    <button 
                        type="button" 
                        className="bg-gray-300 text-black font-bold px-3 py-2 rounded-md hover:bg-gray-400 transition"
                        onClick={() => setDepth((prev) => prev + 1)}
                    >
                        +
                    </button>
                    <button 
                        type="button" 
                        className="bg-gray-300 text-black font-bold px-3 py-2 rounded-md hover:bg-gray-400 transition"
                        onClick={() => setDepth((prev) => Math.max(0, prev - 1))}
                    >
                        −
                    </button>
                </div>
            </div>

            <div className="flex flex-col">
                <label className="text-gray-700 font-semibold">Dive Time(min)</label>
                <div className="flex items-center space-x-2">
                   
                    <input 
                        type="text"
                        value={time} 
                        readOnly 
                        className="w-16 text-center border p-2 rounded-md"
                    />
                    <button 
                        type="button" 
                        className="bg-gray-300 text-black font-bold px-3 py-2 rounded-md hover:bg-gray-400 transition"
                        onClick={() => setTime((prev) => prev + 1)}
                    >
                        +
                    </button>
                    <button 
                        type="button" 
                        className="bg-gray-300 text-black font-bold px-3 py-2 rounded-md hover:bg-gray-400 transition"
                        onClick={() => setTime((prev) => Math.max(0, prev - 1))}
                    >
                        −
                    </button>
                </div>
            </div>
                          </div>

                        </div>

                        

                        <div className="flex flex-col">
                            <label className="text-gray-700 font-semibold">Description</label>
                            <textarea name="description" required className="border p-2 rounded-md h-24"></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

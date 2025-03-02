import styles from "@/app/ui/dashboard/divemanagementpage/divemanagement.module.css";
import Link from "next/link";

export default async function DiveManagement() {

    const diveData = [
        {
            title: "Coral Reef Exploration",
            description: "Exploring the vibrant coral reefs",
            notes: "Great visibility, lots of marine life",
            date: "2024-02-25",
            location: "Great Barrier Reef",
            depth: 30,
            time: "45 min",
            image: "/sample-dive1.jpg",
        },
        {
            title: "Sunken Ship Dive",
            description: "Investigating a WWII shipwreck",
            notes: "Low visibility but exciting",
            date: "2024-02-20",
            location: "Truk Lagoon",
            depth: 40,
            time: "50 min",
            image: "/sample-dive2.jpg",
        },
    ];
    
    return (
        <div className="bg-white p-4">
        <h1 className="text-black text-center text-2xl md:text-3xl font-semibold mb-4">Dive Management</h1>
    
        <div className="flex justify-center">
            <Link href="/dashboard/DiveManagement/add">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                    + New Dive
                </button>
            </Link>
        </div>
    
        <div className="overflow-x-auto mt-4">
            <table className="w-full border border-gray-200 shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-100 text-gray-700 text-xs md:text-sm">
                        <th className="p-2 border">Title</th>
                        <th className="p-2 border hidden md:table-cell">Description</th>
                        <th className="p-2 border hidden md:table-cell">Notes</th>
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border hidden md:table-cell">Location</th>
                        <th className="p-2 border">Depth (m)</th>
                        <th className="p-2 border">Time</th>
                        <th className="p-2 border">Image</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {diveData.map((dive, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50 transition text-xs md:text-sm">
                            <td className="p-2 border">{dive.title}</td>
                            <td className="p-2 border hidden md:table-cell">{dive.description}</td>
                            <td className="p-2 border hidden md:table-cell">{dive.notes}</td>
                            <td className="p-2 border">{dive.date}</td>
                            <td className="p-2 border hidden md:table-cell">{dive.location}</td>
                            <td className="p-2 border">{dive.depth}</td>
                            <td className="p-2 border">{dive.time}</td>
                            <td className="p-2 border">
                                <img src={dive.image} alt="Dive" className="w-12 h-12 md:w-16 md:h-16 rounded-md object-cover mx-auto" />
                            </td>
                            <td className="p-2 border">
                                <Link href="/dashboard/DiveManagement/test">
                                    <button className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 transition text-xs md:text-sm">
                                        Update
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
    
}

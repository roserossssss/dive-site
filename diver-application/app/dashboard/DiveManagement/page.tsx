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
        {
            title: "Cave diving",
            description: "Investigating a cave under WATER?",
            notes: "Exciting",
            date: "2024-03-02",
            location: "Pacific ocean",
            depth: 4,
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {diveData.map((dive, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <img src={dive.image} alt="Dive" className="w-full h-40 object-cover rounded-md mb-3" />
                        <h2 className="text-lg font-semibold">{dive.title}</h2>
                        <p className="text-sm text-gray-700">{dive.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{dive.notes}</p>

                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                            <span>{dive.date}</span>
                            <span>{dive.location}</span>
                        </div>

                        <div className="flex justify-between items-center text-sm text-gray-700 mt-2">
                            <span>{dive.depth}m</span>
                            <span>{dive.time}</span>
                        </div>

                        <Link href="/dashboard/DiveManagement/test">
                            <button className="mt-3 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition text-sm w-full">
                                Update
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

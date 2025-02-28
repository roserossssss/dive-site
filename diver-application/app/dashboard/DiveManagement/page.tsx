import styles from "@/app/ui/dashboard/divemanagementpage/divemanagement.module.css";
import Link from "next/link";

export default async function DiveManagement() {

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Dive Management</h1>

            <Link href="/dashboard/DiveManagement/add">
                <button className={styles.newDiveBtn}>+ New Dive</button>
            </Link>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Notes</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Depth (m)</th>
                        <th>Time</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Coral Reef Exploration</td>
                        <td>Exploring the vibrant coral reefs</td>
                        <td>Great visibility, lots of marine life</td>
                        <td>2024-02-25</td>
                        <td>Great Barrier Reef</td>
                        <td>30</td>
                        <td>45 min</td>
                        <td>
                            <img src="/sample-dive1.jpg" alt="Dive" className={styles.diveImage} />
                        </td>
                        <td>
                            <Link href="/dashboard/DiveManagement/test">
                                <button className={styles.updateBtn}>Update</button>
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td>Sunken Ship Dive</td>
                        <td>Investigating a WWII shipwreck</td>
                        <td>Low visibility but exciting</td>
                        <td>2024-02-20</td>
                        <td>Truk Lagoon</td>
                        <td>40</td>
                        <td>50 min</td>
                        <td>
                            <img src="/sample-dive2.jpg" alt="Dive" className={styles.diveImage} />
                        </td>
                        <td>
                            <Link href="/dashboard/DiveManagement/test">
                                <button className={styles.updateBtn}>Update</button>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

import styles from "@/app/ui/dashboard/user/user.module.css";
import { fetchUsers } from "@/app/lib/data";

export default async function ProfilePage() {

    const User = await fetchUsers();

    console.log(User)

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Profile</h1>

            <div className={styles.profileGrid}>
                {/* Profile Picture */}
                <div className={styles.profileSection}>
                    <h2>Profile Picture</h2>
                    <img src="/default-avatar.png" alt="Profile" className={styles.profilePic} />
                    <input type="file" accept="image/*" />
                </div>

                {/* Personal Information */}
                <div className={styles.profileSection}>
                    <h2>Personal Information</h2>
                    <label>Full Name:</label>
                    <input type="text" defaultValue="John Doe" className={styles.input} />
                    <label>Birthdate:</label>
                    <input type="date" defaultValue="1990-01-01" className={styles.input} />
                    <button className={styles.btn}>Confirm Changes</button>
                </div>

                {/* Contact Information */}
                <div className={styles.profileSection}>
                    <h2>Contact Information</h2>
                    <label>Email:</label>
                    <input type="email" defaultValue="johndoe@example.com" className={styles.input} />
                    <label>Phone:</label>
                    <input type="tel" defaultValue="+1234567890" className={styles.input} />

                    {/* Address */}
                    <h2>Address</h2>
                    <textarea defaultValue="123 Street, City, Country" className={styles.input} />
                    <button className={styles.btn}>Confirm Changes</button>
                </div>

                {/* Update Password */}
                <div className={styles.profileSection}>
                    <h2>Update Password</h2>
                    <input type="password" placeholder="Enter new password" className={styles.input} />
                    <button className={styles.btn}>Update Password</button>
                </div>

                {/* Delete Account */}
                <div className={styles.profileSection}>
                    <h2>Danger Zone</h2>
                    <button className={`${styles.btn} ${styles.danger}`}>Delete Account</button>
                </div>
            </div>
        </div>
    );
}

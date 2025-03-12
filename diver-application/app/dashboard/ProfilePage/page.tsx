import { fetchUsers } from "@/app/lib/data";

export default async function ProfilePage() {

    const User = await fetchUsers();

    console.log(User)

    return (
        <div className="">
            <h1 className="">Profile</h1>

            <div className="">
                {/* Profile Picture */}
                <div className="">
                    <h2>Profile Picture</h2>
                    <img src="/default-avatar.png" alt="Profile" className="" />
                    <input type="file" accept="image/*" />
                </div>

                {/* Personal Information */}
                <div className="">
                    <h2>Personal Information</h2>
                    <label>Full Name:</label>
                    <input type="text" defaultValue="John Doe" className="" />
                    <label>Birthdate:</label>
                    <input type="date" defaultValue="1990-01-01" className="" />
                    <button className="">Confirm Changes</button>
                </div>

                {/* Contact Information */}
                <div className="">
                    <h2>Contact Information</h2>
                    <label>Email:</label>
                    <input type="email" defaultValue="johndoe@example.com" className="" />
                    <label>Phone:</label>
                    <input type="tel" defaultValue="+1234567890" className="" />

                    {/* Address */}
                    <h2>Address</h2>
                    <textarea defaultValue="123 Street, City, Country" className="" />
                    <button className="">Confirm Changes</button>
                </div>

                {/* Update Password */}
                <div className="">
                    <h2>Update Password</h2>
                    <input type="password" placeholder="Enter new password" className="" />
                    <button className="">Update Password</button>
                </div>

                {/* Delete Account */}
                <div className="">
                    <h2>Danger Zone</h2>
                    <button className="">Delete Account</button>
                </div>
            </div>
        </div>
    );
}

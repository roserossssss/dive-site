"use client";
import { useState } from "react";

export default function UsersManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      profile: "#",
      name: "Diver 1",
      birthday: "1990-05-15",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY",
      password: "password123",
    },
    {
      id: 2,
      profile: "#",
      name: "Diver 2",
      birthday: "1985-09-22",
      email: "jane@example.com",
      phone: "+1 (555) 987-6543",
      address: "456 Elm St, Los Angeles, CA",
      password: "password123",
    },
    {
      id: 3,
      profile: "#",
      name: "Diver 3",
      birthday: "1992-07-10",
      email: "diver3@example.com",
      phone: "+1 (555) 321-6789",
      address: "789 Ocean St, Miami, FL",
      password: "password123",
    },
  ]);

  const [search, setSearch] = useState("");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
        User Management
      </h1>


      <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="px-4 py-2 border rounded-lg w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full md:w-auto">
          + Add User
        </button>
      </div>


      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse ">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Profile</th>
                <th className="p-3 text-left">Full Name</th>
                <th className="p-3 text-left">Birthday</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">Password</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-100">
                    <td className="p-3">
                      <img
                        src={user.profile}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.birthday}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.phone}</td>
                    <td className="p-3">{user.address}</td>
                    <td className="p-3">{user.password}</td>
                    <td className="p-3 text-center">
                      <button className="text-blue-500 hover:underline mx-2">
                        Edit
                      </button>
                      <button className="text-red-500 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-3 text-center text-gray-500">
                    No users
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/kyc/all");

        // sirf clients aur workers hi rakho
        const filteredUsers = response.data.data.filter(
          (u) => u.role === "Client" || u.role === "Worker"
        );

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getStatus();
  }, []);

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Role</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((u) => (
            <tr key={u._id} className="text-center">
              <td className="border p-2">{u.fullName}</td>
              <td className="border p-2">{u.userId?.email || "N/A"}</td>
              <td className="border p-2 capitalize">{u.role}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="text-center p-2">
              No clients or workers found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

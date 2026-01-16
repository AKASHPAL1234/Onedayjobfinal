import React from "react";
import { useAuth } from "../../authcontext/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BACKENDURL } from "../../../utiles";

export default function Profile() {
  const { profile, setIsAuthenication } = useAuth();
  const navigateTo = useNavigate();
  console.log(profile)

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${BACKENDURL}/api/auth/logout`,
        { withCredentials: true }
      );

      toast.success(data.message);
      setIsAuthenication(false);
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error(error.data?.message || "Failed to logout");
    }
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src={profile.photo?.url || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md"
          />
          <h2 className="text-2xl font-semibold mt-4">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>

        {/* Info Section */}
        <div className="mt-6 space-y-3 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Role</span>
            <span>{profile.role || "User"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Joined</span>
            <span>{new Date(profile.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">KYC status</span>
            <span>{profile.kycStatus}</span>
          </div>

          {/* Worker Code only if KYC approved */}
          {profile.kycStatus === "Approved" && profile.workerCode && (
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Worker Code</span>
              <span className="font-mono text-blue-600">{profile.workerCode}</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Edit Profile
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}




// import React from "react";
// import { useAuth } from "../authcontext/AuthProvider.jsx";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function Profile() {
  
//   const { profile,setIsAuthenication } = useAuth();
//   const navigateTo = useNavigate();
//   const handleLogout = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.get(
//         "http://localhost:5000/api/auth/logout",
//         { withCredentials: true }
//       );
//       toast.success(data.message);
//       setIsAuthenication(false);
//       navigateTo("/");
//     } catch (error) {
//       console.log(error);
//       toast.error(error.data.message || "Failed to logout");
//     }
//   };

//   if (!profile) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-600 text-lg">Loading profile...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
//       <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
//         {/* Profile Image */}
//         <div className="flex flex-col items-center">
//           <img
//             src={profile.photo?.url || "https://via.placeholder.com/150"}
//             alt="Profile"
//             className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md"
//           />
//           <h2 className="text-2xl font-semibold mt-4">{profile.name}</h2>
//           <p className="text-gray-600">{profile.email}</p>
//         </div>

//         {/* Info Section */}
//         <div className="mt-6 space-y-3 text-gray-700">
//           <div className="flex justify-between border-b pb-2">
//             <span className="font-medium">Role</span>
//             <span>{profile.role || "User"}</span>
//           </div>
//           <div className="flex justify-between border-b pb-2">
//             <span className="font-medium">Joined</span>
//             <span>{new Date(profile.createdAt).toLocaleDateString()}</span>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="mt-6 flex justify-center gap-4">
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
//             Edit Profile
//           </button>
//           <button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }





import React from "react";
import { useAuth } from "../authcontext/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next"; // ✅ i18n import

export default function Profile() {
  const { t } = useTranslation(); // ✅ hook for translation
  const { profile, setIsAuthenication } = useAuth();
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/auth/logout",
        { withCredentials: true }
      );
      toast.success(data.message || t("profile.logoutSuccess"));
      setIsAuthenication(false);
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || t("profile.logoutFail"));
    }
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">{t("profile.loading")}</p>
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
            <span className="font-medium">{t("profile.role")}</span>
            <span>{profile.role || t("profile.defaultRole")}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">{t("profile.joined")}</span>
            <span>{new Date(profile.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            {t("profile.edit")}
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            {t("profile.logout")}
          </button>
        </div>
      </div>
    </div>
  );
}

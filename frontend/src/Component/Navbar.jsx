
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../authcontext/AuthProvider";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { BACKENDURL } from "../../utiles";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [workerCode, setWorkerCode] = useState(null);

  const { profile, isAuthenication, loading } = useAuth();
  const { t, i18n } = useTranslation();

  // ✅ Available languages
  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
  ];

  useEffect(() => {
    if (
      isAuthenication &&
      profile?.role === "Worker" &&
      profile?.kycStatus === "Approved"
    ) {
      axios
        .get(`${BACKENDURL}/api/auth/kyc/worker-code/${profile._id}`)
        .then((res) => setWorkerCode(res.data.workerCode))
        .catch((err) => console.error(err));
    }
  }, [isAuthenication, profile]);

  const renderKycOrCode = () => {
    if (!isAuthenication || !profile) return null;

    if (profile?.role === "Worker") {
      if (profile?.kycStatus === "Approved" && workerCode) {
        return (
          <span className="px-4 py-2 bg-green-600 text-white rounded-lg">
            {t("navbar.workerCode")}: {workerCode}
          </span>
        );
      } else if (profile?.kycStatus !== "Approved") {
        return (
          <Link to="/kyc">
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
              {t("navbar.kycNow")}
            </button>
          </Link>
        );
      }
    }

    if (profile?.role === "Client" && profile?.kycStatus !== "Approved") {
      return (
        <Link to="/kyc">
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
            {t("navbar.kycNow")}
          </button>
        </Link>
      );
    }

    return null;
  };

  if (loading) return null;

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50 mb-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
       <Link to="/">
        <div className="text-center font-bold text-4xl mb-4">
          OneDay<span className="text-blue-700">Job</span>
        </div>
</Link>
        {/* ✅ Language Dropdown */}
        <select
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          className="px-3 py-1 border rounded-lg text-sm text-gray-700 hover:bg-gray-100 mr-4"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 items-center">
          {["home", "about", "services", "contact"].map((key) => (
            <li key={key}>
              <Link
                to={t(`navbar.${key}Link`)}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                {t(`navbar.${key}`)}
              </Link>
            </li>
          ))}
          {/* 🔥 MY PROFILE FOR WORKER */}
          {isAuthenication && profile?.role === "Worker" && (
            <li>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                {t("navbar.myProfile")}
              </Link>
            </li>
          )}


          <li>{renderKycOrCode()}</li>
        </ul>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex space-x-4 items-center">
          {!isAuthenication && (
            <Link to="/login">
              <button className="px-4 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50">
                {t("navbar.login")}
              </button>
            </Link>
          )}

          {isAuthenication && profile?.role === "Client" && (
            <Link to="/dashboard">
              <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
                {t("navbar.dashboard")}
              </button>
            </Link>
          )}

          {isAuthenication && profile?.role === "Admin" && (
            <>
              <Link to="/dashboard">
                <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
                  {t("navbar.dashboard")}
                </button>
              </Link>
              <Link to="/admindash">
                <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
                  {t("navbar.admin")}
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-md">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {["home", "about", "services", "contact"].map((key) => (
              <li key={key}>
                <Link
                  to={t(`navbar.${key}Link`)}
                  className="text-gray-700 hover:text-blue-600 transition"
                  onClick={() => setOpen(false)}
                >
                  {t(`navbar.${key}`)}
                </Link>
              </li>
            ))}

            <li>{renderKycOrCode()}</li>

            {!isAuthenication && (
              <Link to="/login">
                <button className="px-4 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50">
                  {t("navbar.login")}
                </button>
              </Link>
            )}

            {/* ✅ Language dropdown inside mobile menu too */}
            <li>
              <select
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="px-3 py-1 border rounded-lg text-sm text-gray-700 hover:bg-gray-100"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}



// import React, { useState, useEffect } from "react";
// import { Menu, X } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../authcontext/AuthProvider";
// import axios from "axios";
// import { useTranslation } from "react-i18next";
// import { BACKENDURL } from "../../utiles";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [workerCode, setWorkerCode] = useState(null);

//   const { profile, isAuthenication, loading } = useAuth();
//   const { t, i18n } = useTranslation();

//   const languages = [
//     { code: "en", label: "English" },
//     { code: "hi", label: "हिन्दी" },
//   ];

//   useEffect(() => {
//     if (
//       isAuthenication &&
//       profile?.role === "Worker" &&
//       profile?.kycStatus === "Approved"
//     ) {
//       axios
//         .get(`${BACKENDURL}/api/auth/kyc/worker-code/${profile._id}`)
//         .then((res) => setWorkerCode(res.data.workerCode))
//         .catch((err) => console.error(err));
//     }
//   }, [isAuthenication, profile]);

//   const renderKycOrCode = () => {
//     if (!isAuthenication || !profile) return null;

//     if (profile.role === "Worker") {
//       if (profile.kycStatus === "Approved" && workerCode) {
//         return (
//           <span className="px-4 py-2 bg-green-600 text-white rounded-lg">
//             {t("navbar.workerCode")}: {workerCode}
//           </span>
//         );
//       } else {
//         return (
//           <Link to="/kyc">
//             <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
//               {t("navbar.kycNow")}
//             </button>
//           </Link>
//         );
//       }
//     }

//     if (profile.role === "Client" && profile.kycStatus !== "Approved") {
//       return (
//         <Link to="/kyc">
//           <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
//             {t("navbar.kycNow")}
//           </button>
//         </Link>
//       );
//     }

//     return null;
//   };

//   if (loading) return null;

//   return (
//     <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/">
//           <div className="font-bold text-3xl">
//             OneDay<span className="text-blue-700">Job</span>
//           </div>
//         </Link>

//         {/* Language */}
//         <select
//           value={i18n.language}
//           onChange={(e) => i18n.changeLanguage(e.target.value)}
//           className="px-3 py-1 border rounded-lg text-sm mr-4"
//         >
//           {languages.map((lang) => (
//             <option key={lang.code} value={lang.code}>
//               {lang.label}
//             </option>
//           ))}
//         </select>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex space-x-8 items-center">
//           {["home", "about", "services", "contact"].map((key) => (
//             <li key={key}>
//               <Link
//                 to={t(`navbar.${key}Link`)}
//                 className="text-gray-700 hover:text-blue-600"
//               >
//                 {t(`navbar.${key}`)}
//               </Link>
//             </li>
//           ))}

//           {/* 🔥 MY PROFILE FOR WORKER */}
//           {isAuthenication && profile?.role === "Worker" && (
//             <li>
//               <Link
//                 to="/profile"
//                 className="text-gray-700 hover:text-blue-600 font-medium"
//               >
//                 {t("navbar.myProfile")}
//               </Link>
//             </li>
//           )}

//           <li>{renderKycOrCode()}</li>
//         </ul>

//         {/* Desktop Auth Buttons */}
//         <div className="hidden md:flex space-x-4 items-center">
//           {!isAuthenication && (
//             <Link to="/login">
//               <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-xl">
//                 {t("navbar.login")}
//               </button>
//             </Link>
//           )}

//           {isAuthenication && profile?.role === "Client" && (
//             <Link to="/dashboard">
//               <button className="px-4 py-2 bg-blue-600 text-white rounded-xl">
//                 {t("navbar.dashboard")}
//               </button>
//             </Link>
//           )}
//         </div>

//         {/* Mobile Button */}
//         <button
//           className="md:hidden"
//           onClick={() => setOpen(!open)}
//         >
//           {open ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="md:hidden bg-white border-t">
//           <ul className="flex flex-col items-center gap-4 py-4">
//             {["home", "about", "services", "contact"].map((key) => (
//               <li key={key}>
//                 <Link
//                   to={t(`navbar.${key}Link`)}
//                   onClick={() => setOpen(false)}
//                 >
//                   {t(`navbar.${key}`)}
//                 </Link>
//               </li>
//             ))}

//             {/* 🔥 MY PROFILE MOBILE */}
//             {isAuthenication && profile?.role === "Worker" && (
//               <li>
//                 <Link to="/profile" onClick={() => setOpen(false)}>
//                   {t("navbar.myProfile")}
//                 </Link>
//               </li>
//             )}

//             <li>{renderKycOrCode()}</li>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// }

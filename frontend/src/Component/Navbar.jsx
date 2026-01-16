// import React, { useState, useEffect } from "react";
// import { Menu, X } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../authcontext/AuthProvider";
// import axios from "axios";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [dropdown, setDropdown] = useState(false);
//   const [mobileDropdown, setMobileDropdown] = useState(false);
//   const [workerCode, setWorkerCode] = useState(null);
//   const { profile, isAuthenication, loading } = useAuth(); // add loading

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "About", href: "/about" },
//     { name: "Services", href: "/services" },
//     { name: "Contact", href: "/help" },
//   ];

//   // Fetch worker code if logged in as Worker & KYC approved
//   useEffect(() => {
//     if (
//       isAuthenication &&
//       profile?.role === "Worker" &&
//       profile?.kycStatus === "Approved"
//     ) {
//       axios
//         .get(`http://localhost:5000/api/auth/kyc/worker-code/${profile._id}`)
//         .then((res) => setWorkerCode(res.data.workerCode))
//         .catch((err) => console.error(err));
//     }
//   }, [isAuthenication, profile]);

//   const renderKycOrCode = () => {
//     if (!isAuthenication || !profile) return null;

//     // Worker
//     if (profile?.role === "Worker") {
//       if (profile?.kycStatus === "Approved" && workerCode) {
//         return (
//           <span className="px-4 py-2 bg-green-600 text-white rounded-lg">
//             Worker Code: {workerCode}
//           </span>
//         );
//       } else if (profile?.kycStatus !== "Approved") {
//         return (
//           <Link to="/kyc">
//             <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
//               KYC Now
//             </button>
//           </Link>
//         );
//       }
//     }

//     // Client
//     if (profile?.role === "Client") {
//       if (profile?.kycStatus !== "Approved") {
//         return (
//           <Link to="/kyc">
//             <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
//               KYC Now
//             </button>
//           </Link>
//         );
//       }
//     }

//     return null;
//   };

//   // If loading auth state, don't render navbar yet
//   if (loading) return null;

//   return (
//     <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50 mb-10">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         {/* Logo */}
// <div className="text-center font-bold text-4xl mb-4">
//             OneDay<span className="text-blue-700">Job</span>
//           </div>
//         {/* Desktop Links */}
//         <ul className="hidden md:flex space-x-8 items-center">
//           {navLinks.map((link) => (
//             <li key={link.name}>
//               <a
//                 href={link.href}
//                 className="text-gray-700 hover:text-blue-600 transition"
//               >
//                 {link.name}
//               </a>
//             </li>
//           ))}

//           {/* KYC/Worker Code Button */}
//           <li>{renderKycOrCode()}</li>
//         </ul>

//         {/* Desktop Auth Section */}
//         <div className="hidden md:flex space-x-4 items-center">
//           {!isAuthenication && (
//             <Link to="/login">
//               <button className="px-4 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50">
//                 Login
//               </button>
//             </Link>
//           )}

//           {isAuthenication && profile?.role === "Client" && (
//             <Link to="/dashboard">
//               <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
//                 Dashboard
//               </button>
//             </Link>
//           )}

//           {isAuthenication && profile?.role === "Admin" && (
//             <>
//               <Link to="/dashboard">
//                 <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
//                   Dashboard
//                 </button>
//               </Link>
//               <Link to="/admindash">
//                 <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
//                   Admin
//                 </button>
//               </Link>
//             </>
//           )}

//           {isAuthenication && profile && (
//             <div className="relative">
//               <button
//                 onClick={() => setDropdown(!dropdown)}
//                 className="flex items-center space-x-2 focus:outline-none"
//               >
//                 <img
//                   src={profile?.photo?.url || "https://via.placeholder.com/40"}
//                   alt="profile"
//                   className="w-10 h-10 rounded-full border"
//                 />
//                 <span className="text-gray-700 font-medium">
//                   {profile?.name?.split(" ")[0]}
//                 </span>
//               </button>

//               {dropdown && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
//                   <Link
//                     to="/profile"
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
//                     onClick={() => setDropdown(false)}
//                   >
//                     Profile
//                   </Link>
//                   {/* <Link
//                     to="/kyc"
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
//                     onClick={() => setDropdown(false)}
//                   >
//                     KYC
//                   </Link> */}
//                   <Link
//                     to="/logout"
//                     className="block px-4 py-2 text-red-600 hover:bg-red-100 rounded"
//                     onClick={() => setDropdown(false)}
//                   >
//                     Logout
//                   </Link>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-gray-700"
//           onClick={() => setOpen(!open)}
//         >
//           {open ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="md:hidden bg-white border-t shadow-md">
//           <ul className="flex flex-col items-center space-y-4 py-4">
//             {navLinks.map((link) => (
//               <li key={link.name}>
//                 <a
//                   href={link.href}
//                   className="text-gray-700 hover:text-blue-600 transition"
//                   onClick={() => setOpen(false)}
//                 >
//                   {link.name}
//                 </a>
//               </li>
//             ))}

//             {/* KYC/Worker Code */}
//             <li>{renderKycOrCode()}</li>

//             {/* Mobile Auth Section */}
//             {!isAuthenication && (
//               <Link to="/login">
//                 <button className="px-4 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50">
//                   Login
//                 </button>
//               </Link>
//             )}

//             {isAuthenication && profile && (
//               <div className="flex flex-col items-center space-y-2">
//                 <button
//                   onClick={() => setMobileDropdown(!mobileDropdown)}
//                   className="flex items-center space-x-2 focus:outline-none"
//                 >
//                   <img
//                     src={profile?.photo?.url || "https://via.placeholder.com/40"}
//                     alt="profile"
//                     className="w-12 h-12 rounded-full border"
//                   />
//                   <span className="font-medium">{profile?.name?.split(" ")[0]}</span>
//                 </button>

//                 {mobileDropdown && (
//                   <div className="flex flex-col items-center space-y-2 mt-2">
//                     <Link
//                       to="/profile"
//                       className="px-4 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50"
//                       onClick={() => setMobileDropdown(false)}
//                     >
//                       Profile
//                     </Link>
//                     {/* <Link
//                       to="/kyc"
//                       className="px-4 py-2 rounded-xl border border-yellow-500 text-yellow-600 hover:bg-yellow-50"
//                       onClick={() => setMobileDropdown(false)}
//                     >
//                       KYC
//                     </Link> */}
//                     <Link
//                       to="/logout"
//                       className="px-4 py-2 rounded-xl border border-red-600 text-red-600 hover:bg-red-50"
//                       onClick={() => setMobileDropdown(false)}
//                     >
//                       Logout
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             )}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// }



// import React, { useState, useEffect } from "react";
// import { Menu, X } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../authcontext/AuthProvider";
// import axios from "axios";
// import { useTranslation } from "react-i18next"; // ✅ import useTranslation

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [dropdown, setDropdown] = useState(false);
//   const [mobileDropdown, setMobileDropdown] = useState(false);
//   const [workerCode, setWorkerCode] = useState(null);

//   const { profile, isAuthenication, loading } = useAuth();
//   const { t, i18n } = useTranslation(); // ✅ get translation function

//   // Fetch worker code if logged in
//   useEffect(() => {
//     if (
//       isAuthenication &&
//       profile?.role === "Worker" &&
//       profile?.kycStatus === "Approved"
//     ) {
//       axios
//         .get(`http://localhost:5000/api/auth/kyc/worker-code/${profile._id}`)
//         .then((res) => setWorkerCode(res.data.workerCode))
//         .catch((err) => console.error(err));
//     }
//   }, [isAuthenication, profile]);

//   const renderKycOrCode = () => {
//     if (!isAuthenication || !profile) return null;

//     if (profile?.role === "Worker") {
//       if (profile?.kycStatus === "Approved" && workerCode) {
//         return (
//           <span className="px-4 py-2 bg-green-600 text-white rounded-lg">
//             {t("navbar.workerCode")}: {workerCode}
//           </span>
//         );
//       } else if (profile?.kycStatus !== "Approved") {
//         return (
//           <Link to="/kyc">
//             <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
//               {t("navbar.kycNow")}
//             </button>
//           </Link>
//         );
//       }
//     }

//     if (profile?.role === "Client" && profile?.kycStatus !== "Approved") {
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
//     <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50 mb-10">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <div className="text-center font-bold text-4xl mb-4">
//           OneDay<span className="text-blue-700">Job</span>
//         </div>

//         {/* Language Switch Button */}
//         <button
//           onClick={() =>
//             i18n.changeLanguage(i18n.language === "en" ? "hi" : "en")
//           }
//           className="px-3 py-1 border rounded-lg text-sm text-gray-700 hover:bg-gray-100 mr-4"
//         >
//           {i18n.language === "en" ? "हिन्दी" : "English"}
//         </button>

//         {/* Desktop Links */}
//         <ul className="hidden md:flex space-x-8 items-center">
//           {["home", "about", "services", "contact"].map((key) => (
//             <li key={key}>
//               <Link
//                 to={t(`navbar.${key}Link`)}
//                 className="text-gray-700 hover:text-blue-600 transition"
//               >
//                 {t(`navbar.${key}`)}
//               </Link>
//             </li>
//           ))}

//           {/* KYC/Worker Code */}
//           <li>{renderKycOrCode()}</li>
//         </ul>

//         {/* Desktop Auth Section */}
//         <div className="hidden md:flex space-x-4 items-center">
//           {!isAuthenication && (
//             <Link to="/login">
//               <button className="px-4 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50">
//                 {t("navbar.login")}
//               </button>
//             </Link>
//           )}

//           {isAuthenication && profile?.role === "Client" && (
//             <Link to="/dashboard">
//               <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
//                 {t("navbar.dashboard")}
//               </button>
//             </Link>
//           )}

//           {isAuthenication && profile?.role === "Admin" && (
//             <>
//               <Link to="/dashboard">
//                 <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
//                   {t("navbar.dashboard")}
//                 </button>
//               </Link>
//               <Link to="/admindash">
//                 <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
//                   {t("navbar.admin")}
//                 </button>
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-gray-700"
//           onClick={() => setOpen(!open)}
//         >
//           {open ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="md:hidden bg-white border-t shadow-md">
//           <ul className="flex flex-col items-center space-y-4 py-4">
//             {["home", "about", "services", "contact"].map((key) => (
//               <li key={key}>
//                 <Link
//                   to={t(`navbar.${key}Link`)}
//                   className="text-gray-700 hover:text-blue-600 transition"
//                   onClick={() => setOpen(false)}
//                 >
//                   {t(`navbar.${key}`)}
//                 </Link>
//               </li>
//             ))}

//             <li>{renderKycOrCode()}</li>

//             {!isAuthenication && (
//               <Link to="/login">
//                 <button className="px-4 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50">
//                   {t("navbar.login")}
//                 </button>
//               </Link>
//             )}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// }









import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../authcontext/AuthProvider";
import axios from "axios";
import { useTranslation } from "react-i18next";

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
        .get(`http://localhost:5000/api/auth/kyc/worker-code/${profile._id}`)
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
        <div className="text-center font-bold text-4xl mb-4">
          OneDay<span className="text-blue-700">Job</span>
        </div>

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

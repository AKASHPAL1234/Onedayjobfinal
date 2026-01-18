


// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useTranslation } from "react-i18next";
// import { BACKENDURL } from "../../../utiles";

// function Register() {
//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     role: "",
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     extra: "",
//     photo: null,
//   });

//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [isOtpVerified, setIsOtpVerified] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, photo: e.target.files[0] });
//   };

//   const handleSendOtp = async () => {
//     if (!formData.email) return toast.error(t("register.emailFirst"));
//     try {
//       const res = await axios.post(
//         `${BACKENDURL}/api/auth/send-otp`,
//         { email: formData.email }
//       );
//       toast.success(res.data.message || t("register.otpSent"));
//       setOtpSent(true);
//     } catch (err) {
//       toast.error(err.response?.data?.message || t("register.otpFailed"));
//     }
//   };

//   const handleVerifyOtp = async () => {
//     try {
//       const res = await axios.post(
//         `${BACKENDURL}/api/auth/verify-otp`,
//         { email: formData.email, otp }
//       );
//       toast.success(res.data.message || t("register.otpVerified"));
//       setIsOtpVerified(true);
//     } catch (err) {
//       toast.error(err.response?.data?.message || t("register.invalidOtp"));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isOtpVerified) return toast.error(t("register.verifyOtpFirst"));
//     if (formData.password.length < 6)
//       return toast.error(t("register.passwordLength"));

//     try {
//       setLoading(true);
//       const data = new FormData();
//       Object.keys(formData).forEach((key) => data.append(key, formData[key]));

//       const res = await axios.post(`${BACKENDURL}/api/auth/register`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });

//       toast.success(res.data.message || t("register.registerSuccess"));
//       navigate("/login", { replace: true });
//     } catch (err) {
//       toast.error(err.response?.data?.message || t("register.registerFailed"));
//     } finally {
//       setLoading(false);
//     }
//   };

  

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-200 text-xl">
//       <ToastContainer position="top-center" autoClose={2000} />
//       <div className="w-full max-w-md shadow-md rounded-lg bg-white p-4">


//         <form onSubmit={handleSubmit}>
//           <div className="text-center font-bold text-4xl mb-10">
//             OneDay<span className="text-blue-700">Job</span>
//           </div>

//           <h1 className="font-semibold text-xl">{t("register.title")}</h1>

//           {/* Role Select */}
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md mt-2"
//           >
//             <option value="">{t("register.rolePlaceholder")}</option>
//             <option value="Worker">{t("register.roles.worker")}</option>
//             <option value="Client">{t("register.roles.client")}</option>
//           </select>

//           {/* Name */}
//           <input
//             type="text"
//             name="name"
//             placeholder={t("register.namePlaceholder")}
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md mt-2"
//           />

//           {/* Email + OTP */}
//           <div className="flex gap-2 mt-2 items-center">
//             <input
//               type="email"
//               name="email"
//               placeholder={t("register.emailPlaceholder")}
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md"
//             />
//             <button
//               type="button"
//               disabled={otpSent}
//               onClick={handleSendOtp}
//               className={`px-3 py-2 rounded-md text-white ${
//                 otpSent ? "bg-gray-400" : "bg-blue-500"
//               }`}
//             >
//               {otpSent ? t("register.sent") : t("register.sendOtp")}
//             </button>
//           </div>

//           {otpSent && (
//             <div className="flex gap-2 mt-2 items-center">
//               <input
//                 type="text"
//                 placeholder={t("register.otpPlaceholder")}
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="w-full p-2 border rounded-md"
//               />
//               <button
//                 type="button"
//                 onClick={handleVerifyOtp}
//                 className="bg-green-500 text-white px-3 py-2 rounded-md"
//               >
//                 {t("register.verify")}
//               </button>
//               {isOtpVerified && <span className="text-green-600 text-2xl">✅</span>}
//             </div>
//           )}

//           {/* Phone */}
//           <input
//             type="tel"
//             name="phone"
//             placeholder={t("register.phonePlaceholder")}
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md mt-2"
//           />

//           {/* Password */}
//           <input
//             type="password"
//             name="password"
//             placeholder={t("register.passwordPlaceholder")}
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md mt-2"
//           />

//           {/* Client Only - Company Type */}
//           {formData.role === "Client" && (
//             <select
//               name="extra"
//               value={formData.extra}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md mt-2 mb-4"
//             >
//               <option value="">{t("register.companyPlaceholder")}</option>
//               <option value="construction">{t("register.companies.construction")}</option>
//               <option value="it">{t("register.companies.it")}</option>
//               <option value="catering">{t("register.companies.catering")}</option>
//               <option value="other">{t("register.companies.other")}</option>
//             </select>
//           )}

//           {/* Photo Upload */}
//           <div className="flex items-center">
//             <input
//               type="file"
//               name="photo"
//               onChange={handleFileChange}
//               className="w-full p-2 border rounded-md mt-2"
//               accept="image/*"
//             />
//           </div>

//           <p className="text-center mt-2">
//             {t("register.alreadyHave")}{" "}
//             <Link to="/login" className="text-blue-600">
//               {t("register.login")}
//             </Link>
//           </p>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full p-2 mt-4 rounded-md text-white ${
//               loading ? "bg-gray-400" : "bg-blue-600"
//             }`}
//           >
//             {loading ? (
//               <span className="flex justify-center items-center">
//                 <svg
//                   className="animate-spin h-5 w-5 mr-2 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                   ></path>
//                 </svg>
//                 {t("register.registering")}
//               </span>
//             ) : (
//               t("register.registerBtn")
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Register;





import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { BACKENDURL } from "../../../utiles";

function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    extra: "",
    photo: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role || !formData.name || !formData.email || !formData.phone || !formData.password) {
      return toast.error("All fields are required");
    }

    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (!formData.photo) {
      return toast.error("Profile photo is required");
    }

    try {
      setLoading(true);

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const res = await axios.post(
        `${BACKENDURL}/api/auth/register`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      toast.success(res.data.message || "Registered successfully");
      navigate("/login", { replace: true });

    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 text-xl">
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="w-full max-w-md shadow-md rounded-lg bg-white p-4">
        <form onSubmit={handleSubmit}>
          <div className="text-center font-bold text-4xl mb-10">
            OneDay<span className="text-blue-700">Job</span>
          </div>

          <h1 className="font-semibold text-xl mb-2">
            {t("register.title")}
          </h1>

          {/* Role */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mt-2"
          >
            <option value="">{t("register.rolePlaceholder")}</option>
            <option value="Worker">{t("register.roles.worker")}</option>
            <option value="Client">{t("register.roles.client")}</option>
          </select>

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder={t("register.namePlaceholder")}
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mt-2"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder={t("register.emailPlaceholder")}
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mt-2"
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder={t("register.phonePlaceholder")}
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mt-2"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder={t("register.passwordPlaceholder")}
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mt-2"
          />

          {/* Client Extra */}
          {formData.role === "Client" && (
            <select
              name="extra"
              value={formData.extra}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mt-2"
            >
              <option value="">{t("register.companyPlaceholder")}</option>
              <option value="construction">{t("register.companies.construction")}</option>
              <option value="it">{t("register.companies.it")}</option>
              <option value="catering">{t("register.companies.catering")}</option>
              <option value="other">{t("register.companies.other")}</option>
            </select>
          )}

          {/* Photo */}
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md mt-2"
            accept="image/*"
          />

          <p className="text-center mt-2">
            {t("register.alreadyHave")}{" "}
            <Link to="/login" className="text-blue-600">
              {t("register.login")}
            </Link>
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 mt-4 rounded-md text-white ${
              loading ? "bg-gray-400" : "bg-blue-600"
            }`}
          >
            {loading ? "Registering..." : t("register.registerBtn")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;







import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../authcontext/AuthProvider";
import { useTranslation } from "react-i18next";
import { BACKENDURL } from "../../../utiles";

function Login() {
  const { t, i18n } = useTranslation();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setIsAuthenication } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role || !email || !password) {
      toast.error(t("login.fillFields"));
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${BACKENDURL}/api/auth/login`,
        { role, email, password },
        { withCredentials: true }
      );

      setIsAuthenication(true);
      toast.success(t("login.loginSuccess"));

      // Redirect based on role
      if (res.data.user.role === "Worker") navigate("/");
      else navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || t("login.invalidCreds"));
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 text-xl">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="w-full max-w-md shadow-md rounded-lg bg-white p-6">

        {/* Language Switcher */}
       

        <form onSubmit={handleSubmit}>
          <div className="text-center font-bold text-4xl mb-4">
            OneDay<span className="text-blue-700">Job</span>
          </div>

          <h1 className="font-semibold text-xl mb-4">{t("login.title")}</h1>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded-md mt-2 mb-2"
            required
          >
            <option value="">{t("login.rolePlaceholder")}</option>
            <option value="Worker">{t("login.roles.worker")}</option>
            <option value="Client">{t("login.roles.client")}</option>
            <option value="Admin">{t("login.roles.admin")}</option>
          </select>

          <input
            type="email"
            placeholder={t("login.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md mt-2 mb-2"
            required
          />

          <input
            type="password"
            placeholder={t("login.passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md mt-2 mb-4"
            required
          />

          <Link to="/resetpassword">
            <p className="text-blue-800 underline text-sm mb-3">
              {t("login.forgotPassword")}
            </p>
          </Link>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } transition mb-4`}
          >
            {loading ? t("login.loggingIn") : t("login.loginBtn")}
          </button>

          <p className="text-center text-base">
            {t("login.noAccount")}{" "}
            <Link to="/register" className="text-blue-600">
              {t("login.register")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;


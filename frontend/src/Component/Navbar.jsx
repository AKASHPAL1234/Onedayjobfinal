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

    if (profile.role === "Worker") {
      if (profile.kycStatus === "Approved" && workerCode) {
        return (
          <span className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm">
            {t("navbar.workerCode")}: {workerCode}
          </span>
        );
      } else {
        return (
          <Link to="/kyc">
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm">
              {t("navbar.kycNow")}
            </button>
          </Link>
        );
      }
    }

    if (profile.role === "Client" && profile.kycStatus !== "Approved") {
      return (
        <Link to="/kyc">
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm">
            {t("navbar.kycNow")}
          </button>
        </Link>
      );
    }

    return null;
  };

  if (loading) return null;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <div className="font-bold text-2xl sm:text-3xl">
            OneDay<span className="text-blue-700">Job</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center space-x-6 xl:space-x-8">
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

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center space-x-3">

          <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="px-2 py-1 border rounded-md text-sm"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>

          {!isAuthenication && (
            <Link to="/login">
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                {t("navbar.login")}
              </button>
            </Link>
          )}

          {isAuthenication && profile?.role === "Client" && (
            <Link to="/dashboard">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {t("navbar.dashboard")}
              </button>
            </Link>
          )}

          {isAuthenication && profile?.role === "Admin" && (
            <>
              <Link to="/dashboard">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {t("navbar.dashboard")}
                </button>
              </Link>
              <Link to="/admindash">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {t("navbar.admin")}
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-t shadow-md">
          <ul className="flex flex-col px-6 py-6 space-y-4">

            {["home", "about", "services", "contact"].map((key) => (
              <li key={key}>
                <Link
                  to={t(`navbar.${key}Link`)}
                  className="block text-gray-700 hover:text-blue-600 text-lg"
                  onClick={() => setOpen(false)}
                >
                  {t(`navbar.${key}`)}
                </Link>
              </li>
            ))}

            {isAuthenication && profile?.role === "Worker" && (
              <li>
                <Link
                  to="/profile"
                  className="block text-gray-700 hover:text-blue-600 text-lg"
                  onClick={() => setOpen(false)}
                >
                  {t("navbar.myProfile")}
                </Link>
              </li>
            )}

            <li>{renderKycOrCode()}</li>

            {!isAuthenication && (
              <li>
                <Link to="/login" onClick={() => setOpen(false)}>
                  <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg">
                    {t("navbar.login")}
                  </button>
                </Link>
              </li>
            )}

            {/* Client Dashboard - Mobile */}
            {isAuthenication && profile?.role === "Client" && (
              <li>
                <Link to="/dashboard" onClick={() => setOpen(false)}>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg">
                    {t("navbar.dashboard")}
                  </button>
                </Link>
              </li>
            )}

            {/* Admin Dashboard - Mobile */}
            {isAuthenication && profile?.role === "Admin" && (
              <>
                <li>
                  <Link to="/dashboard" onClick={() => setOpen(false)}>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg">
                      {t("navbar.dashboard")}
                    </button>
                  </Link>
                </li>

                <li>
                  <Link to="/admindash" onClick={() => setOpen(false)}>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg">
                      {t("navbar.admin")}
                    </button>
                  </Link>
                </li>
              </>
            )}

            <li>
              <select
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
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

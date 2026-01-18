import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMenu, FiX } from "react-icons/fi";

function Sidebar({ component, setComponent }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const menuItem = (name, key) => (
    <li
      onClick={() => {
        setComponent(name);
        setOpen(false); // close on mobile click
      }}
      className={`cursor-pointer transition ${
        component === name
          ? "text-yellow-300 font-semibold"
          : "hover:text-gray-300"
      }`}
    >
      {t(key)}
    </li>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-indigo-700 text-white flex items-center justify-between p-4 z-50">
        <h2 className="text-xl font-bold">{t("sidebar.dashboard")}</h2>
        <button onClick={() => setOpen(true)}>
          <FiMenu size={26} />
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed md:static top-0 left-0 h-full w-64 bg-indigo-700 text-white p-6 z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        {/* Mobile Close Button */}
        <div className="flex items-center justify-between mb-8 md:hidden">
          <h2 className="text-2xl font-bold">{t("sidebar.dashboard")}</h2>
          <button onClick={() => setOpen(false)}>
            <FiX size={26} />
          </button>
        </div>

        {/* Desktop Title */}
        <h2 className="hidden md:block text-2xl font-bold mb-8">
          {t("sidebar.dashboard")}
        </h2>

        <ul className="space-y-8">
          {menuItem("AllJob", "sidebar.allJobs")}
          {menuItem("PostJob", "sidebar.postJob")}
          {menuItem("UpdateJob", "sidebar.updateJob")}
          {menuItem("MyProfile", "sidebar.myProfile")}

          <a
            href="/"
            className="cursor-pointer hover:text-gray-300 flex items-center"
          >
            {t("sidebar.home")}
          </a>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;

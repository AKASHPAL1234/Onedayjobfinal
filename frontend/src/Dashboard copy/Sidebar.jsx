

import { useTranslation } from "react-i18next";

function Sidebar({ component, setComponent }) {
  const { t } = useTranslation();

  return (
    <div className="w-64 bg-indigo-700 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">{t("sidebar.dashboard")}</h2>
      <ul className="space-y-10">
        <li
          onClick={() => setComponent("AllJob")}
          className={`cursor-pointer ${
            component === "AllJob" ? "text-yellow-300" : "hover:text-gray-300"
          }`}
        >
          {t("sidebar.allJobs")}
        </li>
        <li
          onClick={() => setComponent("PostJob")}
          className={`cursor-pointer ${
            component === "PostJob" ? "text-yellow-300" : "hover:text-gray-300"
          }`}
        >
          {t("sidebar.postJob")}
        </li>
        <li
          onClick={() => setComponent("UpdateJob")}
          className={`cursor-pointer ${
            component === "UpdateJob" ? "text-yellow-300" : "hover:text-gray-300"
          }`}
        >
          {t("sidebar.updateJob")}
        </li>
        <li
          onClick={() => setComponent("MyProfile")}
          className={`cursor-pointer ${
            component === "MyProfile"
              ? "text-yellow-300"
              : "hover:text-gray-300"
          }`}
        >
          {t("sidebar.myProfile")}
        </li>

        <a
          href="/"
          className="cursor-pointer hover:text-gray-300 flex items-center"
        >
          {t("sidebar.home")}
        </a>
      </ul>
    </div>
  );
}

export default Sidebar;

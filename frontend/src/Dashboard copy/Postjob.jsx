


import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ import
import { BACKENDURL } from "../../utiles";

const PostJob = () => {
  const { t } = useTranslation(); // ✅ hook
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    workersNeeded: "",
    category: "bouncer",
    city: "",
    state: "",
    address: "",
    pincode: "",
    jobDate: "",
    hours: "",
    budget: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      formData.hours <= 0 ||
      formData.budget <= 0 ||
      formData.workersNeeded <= 0
    ) {
      toast.error(t("postjob.errorNumbers"));
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        `${BACKENDURL}/api/job/create`,
        {
          title: formData.title,
          workersNeeded: formData.workersNeeded,
          category: formData.category.toLowerCase(),
          location: {
            city: formData.city,
            state: formData.state,
            address: formData.address,
            pincode: formData.pincode,
          },
          jobDate: new Date(formData.jobDate),
          hours: formData.hours,
          budget: formData.budget,
        },
        { withCredentials: true }
      );

      toast.success(t("postjob.success"));

      setFormData({
        title: "",
        workersNeeded: "",
        category: "bouncer",
        city: "",
        state: "",
        address: "",
        pincode: "",
        jobDate: "",
        hours: "",
        budget: "",
      });

      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      console.error("Error posting job:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || t("postjob.failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-50 to-cyan-200 flex items-center justify-center px-4 py-10">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-cyan-600 mb-6">
          {t("postjob.title")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Job Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              {t("postjob.jobTitle")}
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
              placeholder={t("postjob.enterJobTitle")}
              required
            />
          </div>

          {/* Workers Needed */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              {t("postjob.workersNeeded")}
            </label>
            <input
              type="number"
              name="workersNeeded"
              value={formData.workersNeeded}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
              placeholder={t("postjob.enterWorkers")}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              {t("postjob.category")}
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
              required
            >
              <option value="bouncer">{t("categories.bouncer")}</option>
              <option value="delivery">{t("categories.delivery")}</option>
              <option value="driver">{t("categories.driver")}</option>
              <option value="housekeeping">{t("categories.housekeeping")}</option>
              <option value="cook">{t("categories.cook")}</option>
              <option value="security">{t("categories.security")}</option>
              <option value="event-staff">{t("categories.eventStaff")}</option>
              <option value="other">{t("categories.other")}</option>
            </select>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder={t("postjob.city")}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
              required
            />
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
              required
            >
              <option value="">{t("postjob.state")}</option>
              <option value="UP">Uttar Pradesh</option>
              <option value="DL">Delhi</option>
              <option value="MH">Maharashtra</option>
              <option value="RJ">Rajasthan</option>
              <option value="HR">Haryana</option>
              <option value="WB">West Bengal</option>
              <option value="TN">Tamil Nadu</option>
              <option value="KA">Karnataka</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder={t("postjob.address")}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
              required
            />
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder={t("postjob.pincode")}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
              required
            />
          </div>

          {/* Date, Hours, Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="date"
              name="jobDate"
              min={new Date().toISOString().split("T")[0]}
              value={formData.jobDate}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
              required
            />
            <input
              type="number"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              placeholder={t("postjob.hours")}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
              required
            />
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder={t("postjob.budget")}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-cyan-700 transition duration-300 disabled:opacity-60"
          >
            {loading ? t("postjob.posting") : t("postjob.submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;


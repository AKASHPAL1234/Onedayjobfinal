"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const KycForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "Worker",
    fullName: "",
    dob: "",
    gender: "",
    contactNumber: "",
    address: "",
    govtIdType: "",
    govtIdNumber: "",
    profession: "",
    experience: "",
  });

  const [govtIdImage, setGovtIdImage] = useState(null);
  const [licenseImage, setLicenseImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (govtIdImage) data.append("govtIdImage", govtIdImage);
      if (licenseImage) data.append("licenseImage", licenseImage);

      const res = await fetch("http://localhost:5000/api/auth/kyc/submit", {
        method: "POST",
        body: data,
        credentials: "include", // ✅ token cookies ke sath jayega
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("✅ KYC submitted successfully!");
        navigate("/profile")

      } else {
        toast.error("❌ " + (result.error || "Something went wrong"));
      }
    } catch (err) {
      toast.error("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mt-20">
      <ToastContainer position="top-center" autoClose={2000} />
      <h2 className="text-2xl font-bold mb-4">KYC Verification</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="role" value={formData.role} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="Worker">Worker</option>
          <option value="Client">Client</option>
        </select>

        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full border p-2 rounded" required />

        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border p-2 rounded" required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} className="w-full border p-2 rounded" required />
        <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded" required />

        <input type="text" name="govtIdType" placeholder="Govt ID Type (Aadhar / PAN / Voter ID)" value={formData.govtIdType} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="text" name="govtIdNumber" placeholder="Govt ID Number" value={formData.govtIdNumber} onChange={handleChange} className="w-full border p-2 rounded" required />

        {formData.role === "Worker" && (
          <>
            <input type="text" name="profession" placeholder="Profession" value={formData.profession} onChange={handleChange} className="w-full border p-2 rounded" required />
            <input type="text" name="experience" placeholder="Experience (in years)" value={formData.experience} onChange={handleChange} className="w-full border p-2 rounded" required />

            <div>
              <label className="block mb-1">Upload License (optional)</label>
              <input type="file" onChange={(e) => handleFileChange(e, setLicenseImage)} className="w-full" />
            </div>
          </>
        )}

        <div>
          <label className="block mb-1">Upload Govt ID</label>
          <input type="file" onChange={(e) => handleFileChange(e, setGovtIdImage)} className="w-full" required />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {loading ? "Submitting..." : "Submit KYC"}
        </button>
      </form>
    </div>
  );
};

export default KycForm;

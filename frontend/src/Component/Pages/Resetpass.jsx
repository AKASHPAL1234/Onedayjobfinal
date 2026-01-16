import React, { useState } from "react";
import axios from "axios";
import { BACKENDURL } from "../../../utiles";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation (don't skip this)
    if (!email || !newPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post(
        `${BACKENDURL}/api/auth/reset-password`,
        {
          email,
          newPassword,
        }, { withCredentials: true }
      );

      setMessage(res.data.message || "Password reset successful");
      setEmail("");
      setNewpassword("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <div className="text-center font-bold text-4xl mb-10">
          OneDay<span className="text-blue-700">Job</span>
        </div>

        <h2 className="text-xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}

        {message && (
          <p className="text-green-600 text-sm mb-3 text-center">{message}</p>
        )}

        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter new password"
          className="border p-2 w-full mb-4"
          value={newPassword}
          onChange={(e) => setNewpassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;

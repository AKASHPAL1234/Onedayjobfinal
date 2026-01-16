import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKENDURL } from "../../utiles";

const WorkerCode = () => {
  const [workercode, setCode] = useState("");
  const [workerDetails, setWorkerDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleFetchWorker = async () => {
    if (!workercode.trim()) return toast.error("Please enter a worker code");

    try {
      setLoading(true);
      setNotFound(false);

      const { data } = await axios.get(
       `${BACKENDURL}/api/auth/worker/${workercode}`,
        { withCredentials: true }
      );

      if (!data?.data) {
        setWorkerDetails(null);
        setNotFound(true);
        toast.error("Worker not found");
      } else {
        setWorkerDetails(data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch worker details"
      );
      setWorkerDetails(null);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Enter Worker Code</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={workercode}
          onChange={(e) => {
            setCode(e.target.value);
            setWorkerDetails(null);
            setNotFound(false);
          }}
          placeholder="Worker Code"
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleFetchWorker}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Fetching..." : "Search"}
        </button>
      </div>

      {notFound && <p className="text-red-500 text-center">Worker not found</p>}

      {workerDetails && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-xl font-semibold mb-2">Worker Details</h3>
          <p>
            <strong>Full Name:</strong> {workerDetails.fullName}
          </p>
          <p>
            <strong>DOB:</strong>{" "}
            {workerDetails.dob &&
              new Date(workerDetails.dob).toLocaleDateString()}
          </p>
          <p>
            <strong>Gender:</strong> {workerDetails.gender}
          </p>
          <p>
            <strong>Contact:</strong> {workerDetails.contactNumber}
          </p>
          <p>
            <strong>Address:</strong> {workerDetails.address?.permanent},{" "}
            {workerDetails.address?.current}, {workerDetails.address?.city},{" "}
            {workerDetails.address?.state}, {workerDetails.address?.pincode}
          </p>
          <p>
            <strong>Govt ID Type:</strong> {workerDetails.govtIdType}
          </p>
          <p>
            <strong>Govt ID Number:</strong> {workerDetails.govtIdNumber}
          </p>
          <p>
            <strong>Profession:</strong> {workerDetails.profession}
          </p>
          <p>
            <strong>Experience:</strong> {workerDetails.experience} years
          </p>
          <p>
            <strong>Status:</strong> {workerDetails.status}
          </p>
          <p>
            <strong>Worker Code:</strong> {workerDetails.workerCode}
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkerCode;

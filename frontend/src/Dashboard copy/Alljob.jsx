

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../authcontext/AuthProvider";
import { BACKENDURL } from "../../utiles";

function Alljob() {
  const [jobs, setJobs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const { profile: user } = useAuth();

  useEffect(() => {
    if (!user?._id) return;

    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(`${BACKENDURL}/api/job/my`, {
          withCredentials: true,
        });
        setJobs(data.jobs);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch jobs ❌");
      }
    };

    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get(
          `${BACKENDURL}/api/job/notifications/${user._id}`,
          { withCredentials: true }
        );
        setNotifications(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch notifications ❌");
      }
    };

    fetchJobs();
    fetchNotifications();
  }, [user]);

  // ✅ Filter notifications by job
  const getJobNotifications = (jobId) => {
    return notifications.filter(
      (n) => n.jobId && n.jobId.toString() === jobId.toString()
    );
  };

  // ✅ Close Job (Backend + Frontend)
  const closeJob = async (jobId) => {
    try {
      await axios.post(
        `${BACKENDURL}/api/job/close`,
        { jobId },
        { withCredentials: true }
      );
      setJobs((prev) =>
        prev.map((job) =>
          job._id === jobId ? { ...job, status: "Closed" } : job
        )
      );
      toast.success("Job closed successfully ✅");
    } catch (error) {
      console.error(error);
      toast.error("Failed to close job ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-indigo-700 text-center mb-10">
        All My Jobs
      </h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {jobs.map((job) => (
            <div
              key={job._id}
              className={`shadow-lg rounded-xl border border-gray-200 p-6 transition duration-300 ${
                job.status === "Closed"
                  ? "bg-gray-200 opacity-80"
                  : "bg-white hover:shadow-2xl"
              }`}
            >
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                {job.title}
              </h3>
              <p className="text-gray-700 mb-2">{job.description}</p>

              <p className="text-gray-600 mb-1">
                <strong>Salary:</strong> ₹{job.budget}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Job Type:</strong> Full-time
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Category:</strong> {job.category}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    job.status === "Closed"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {job.status}
                </span>
              </p>

              {/* Accepted by */}
              {job.acceptedBy ? (
                <div className="mt-3 flex items-center gap-3 bg-green-50 border border-green-200 p-3 rounded-lg">
                  <div className="w-10 h-10 bg-green-400 text-white rounded-full flex items-center justify-center text-lg font-bold">
                    {job.acceptedBy.name
                      ? job.acceptedBy.name.charAt(0)
                      : "W"}
                  </div>
                  <div>
                    <p className="text-green-800 font-semibold">
                      {job.acceptedBy.name || "Worker Name"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {job.acceptedBy.email}
                    </p>
                    {job.acceptedBy.address && (
                      <p className="text-gray-500 text-sm">
                        {job.acceptedBy.address}
                      </p>
                    )}
                  </div>
                  <span className="ml-auto text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                    Accepted
                  </span>
                </div>
              ) : (
                <p className="text-gray-500 mt-2">Not yet accepted</p>
              )}

              {/* ✅ Close Job Button (Only if not already closed) */}
              {job.status !== "Closed" && (
                <button
                  onClick={() => closeJob(job._id)}
                  className="mt-4 w-full py-2 rounded-lg font-semibold bg-red-500 hover:bg-red-600 text-white transition duration-300"
                >
                  Close Job
                </button>
              )}

              {/* Job-specific notifications */}
              {getJobNotifications(job._id).length > 0 && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-semibold text-blue-700 mb-2">
                    Notifications:
                  </p>
                  {getJobNotifications(job._id).map((notif) => (
                    <div key={notif._id} className="text-sm text-blue-600 mb-1">
                      {notif.message}
                      <br />
                      <small className="text-gray-500">
                        {new Date(notif.createdAt).toLocaleString()}
                      </small>
                    </div>
                  ))}
                </div>
              )}

              {/* Job location */}
              <p className="text-gray-600 mt-3 text-sm">
                <strong>Location:</strong>{" "}
                {`${job.location.address}, ${job.location.city}, ${job.location.state} - ${job.location.pincode}`}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Alljob;


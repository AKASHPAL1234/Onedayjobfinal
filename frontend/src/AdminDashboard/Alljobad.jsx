import React, { useState, useEffect } from "react";

function Alljob() {
  const [jobs, setJobs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [newWorker, setNewWorker] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null);

  // Dummy initial jobs
  useEffect(() => {
    setJobs([
      {
        _id: "1",
        title: "Plumber Needed",
        description: "Fix bathroom pipe leakage",
        budget: 1000,
        category: "Repair",
        status: "Active",
        location: {
          address: "123 Street",
          city: "Lucknow",
          state: "UP",
          pincode: "226001",
        },
        acceptedBy: null,
      },
      {
        _id: "2",
        title: "Painter Required",
        description: "Paint two rooms with blue color",
        budget: 2000,
        category: "Painting",
        status: "Active",
        location: {
          address: "MG Road",
          city: "Kanpur",
          state: "UP",
          pincode: "208001",
        },
        acceptedBy: null,
      },
    ]);
  }, []);

  const getJobNotifications = (jobId) =>
    notifications.filter((n) => n.jobId === jobId);

  // Open worker input box
  const handleAddWorker = (jobId) => {
    setSelectedJobId(jobId);
    setNewWorker("");
  };

  // Assign worker locally
  const handleAssignWorker = () => {
    if (!newWorker.trim()) return alert("Enter worker name!");
    setJobs((prev) =>
      prev.map((job) =>
        job._id === selectedJobId
          ? {
              ...job,
              acceptedBy: {
                name: newWorker,
                email: `${newWorker.toLowerCase()}@example.com`,
              },
            }
          : job
      )
    );
    setSelectedJobId(null);
    setNewWorker("");
  };

  // Close job
  const handleCloseJob = (jobId) => {
    setJobs((prev) =>
      prev.map((job) =>
        job._id === jobId ? { ...job, status: "Closed" } : job
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-indigo-700 text-center mb-10">
        All My Jobs (Frontend Only)
      </h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 hover:shadow-2xl transition duration-300"
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
                  className={`${
                    job.status === "Closed"
                      ? "text-red-600 font-semibold"
                      : "text-green-600 font-semibold"
                  }`}
                >
                  {job.status}
                </span>
              </p>

              {/* Accepted by */}
              {job.acceptedBy ? (
                <div className="mt-3 flex items-center gap-3 bg-green-50 border border-green-200 p-3 rounded-lg">
                  <div className="w-10 h-10 bg-green-400 text-white rounded-full flex items-center justify-center text-lg font-bold">
                    {job.acceptedBy.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-green-800 font-semibold">
                      {job.acceptedBy.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {job.acceptedBy.email}
                    </p>
                  </div>
                  <span className="ml-auto text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                    Accepted
                  </span>
                </div>
              ) : (
                <p className="text-gray-500 mt-2 italic">
                  Not yet accepted
                </p>
              )}

              {/* Add Worker (frontend only) */}
              {!job.acceptedBy && job.status !== "Closed" && (
                <div className="mt-3">
                  {selectedJobId === job._id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newWorker}
                        onChange={(e) => setNewWorker(e.target.value)}
                        placeholder="Enter worker name"
                        className="flex-1 border rounded-lg px-3 py-2"
                      />
                      <button
                        onClick={handleAssignWorker}
                        className="bg-indigo-600 text-white px-3 py-2 rounded-lg"
                      >
                        Assign
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddWorker(job._id)}
                      className="text-indigo-600 underline text-sm mt-2"
                    >
                      + Add Worker
                    </button>
                  )}
                </div>
              )}

              {/* Job-specific notifications */}
              {getJobNotifications(job._id).length > 0 && (
                <div className="mt-2 space-y-1">
                  {getJobNotifications(job._id).map((notif) => (
                    <p
                      key={notif._id}
                      className="text-blue-600 font-medium text-sm"
                    >
                      {notif.message} <br />
                      <small className="text-gray-500">
                        {new Date(notif.createdAt).toLocaleString()}
                      </small>
                    </p>
                  ))}
                </div>
              )}

              {/* Job location */}
              <p className="text-gray-600 mt-2">
                <strong>Location:</strong>{" "}
                {`${job.location.address}, ${job.location.city}, ${job.location.state} - ${job.location.pincode}`}
              </p>

              {/* Close Job */}
              {job.status !== "Closed" && (
                <button
                  onClick={() => handleCloseJob(job._id)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full"
                >
                  Close Job
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Alljob;

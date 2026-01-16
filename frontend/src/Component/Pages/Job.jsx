import React, { useEffect, useState } from "react";
import { useAuth } from "../../authcontext/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Job = () => {
  const { profile: user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  const [workerFormVisible, setWorkerFormVisible] = useState({});
  const [workerCountInput, setWorkerCountInput] = useState({});
  const [workerCodeInput, setWorkerCodeInput] = useState({});
  const [verifyingCode, setVerifyingCode] = useState({});
  const [verifyResult, setVerifyResult] = useState({});
  const [addingWorker, setAddingWorker] = useState({});

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/job/all", {
        withCredentials: true,
      });
      setJobs(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptJob = async (jobId) => {
    if (!user?.kycStatus)
      return toast.error("KYC not approved. Cannot accept jobs.");

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/job/accept",
        { jobId, workerId: user._id },
        { withCredentials: true }
      );
      toast.success("Job accepted!");
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId
            ? { ...job, acceptedBy: [...(job.acceptedBy || []), user._id] }
            : job
        )
      );
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to accept job");
    }
  };

  const handleVerifyCode = async (jobId, index) => {
    const code = workerCodeInput[jobId]?.[index];
    if (!code) return toast.error("Enter worker code");

    setVerifyingCode((prev) => {
      const arr = [...(prev[jobId] || [])];
      arr[index] = true;
      return { ...prev, [jobId]: arr };
    });

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/validate-worker-code",
        { workerCode: code },
        { withCredentials: true }
      );

      setVerifyResult((prev) => {
        const arr =
          prev[jobId]?.length === workerCodeInput[jobId]?.length
            ? [...prev[jobId]]
            : Array(workerCodeInput[jobId]?.length || 0).fill("");
        arr[index] = data.valid ? "valid" : "Invalid";
        return { ...prev, [jobId]: arr };
      });

      if (data.valid=="valid") {
        toast.success(`Worker ${index + 1} code verified!`);
      } else {
        toast.error(`Worker ${index + 1} code invalid`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Verification failed");
    } finally {
      setVerifyingCode((prev) => {
        const arr = [...(prev[jobId] || [])];
        arr[index] = false;
        return { ...prev, [jobId]: arr };
      });
    }
  };

  const handleAddWorker = async (jobId) => {
    const codes = workerCodeInput[jobId] || [];
    if (codes.some((code) => !code))
      return toast.error("Enter all worker codes");

    try {
      setAddingWorker((prev) => ({ ...prev, [jobId]: true }));
      const { data } = await axios.post(
        "http://localhost:5000/api/job/add-worker",
        { jobId, workerCodes: codes },
        { withCredentials: true }
      );

      toast.success(`${data.addedWorkers.length} worker(s) added!`);
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId
            ? {
                ...job,
                acceptedBy: [
                  ...(job.acceptedBy || []),
                  ...data.addedWorkers.map((w) => w._id),
                ],
              }
            : job
        )
      );

      // reset
      setWorkerFormVisible((prev) => ({ ...prev, [jobId]: false }));
      setWorkerCodeInput((prev) => ({ ...prev, [jobId]: [] }));
      setWorkerCountInput((prev) => ({ ...prev, [jobId]: "" }));
      setVerifyResult((prev) => ({ ...prev, [jobId]: [] }));
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add worker");
    } finally {
      setAddingWorker((prev) => ({ ...prev, [jobId]: false }));
    }
  };

  const handleCloseJob = async (jobId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/job/close",
        { jobId },
        { withCredentials: true }
      );
      toast.success("Job closed!");
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, status: "Closed" } : job
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to close job");
    }
  };

  const filteredJobs =
    activeTab === "All"
      ? jobs
      : jobs.filter((job) => job.category === activeTab.toLowerCase());

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Tabs */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {["All", "Cleaning", "Cooking", "Tech"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === tab
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const isWorkerAccepted = job.acceptedBy?.includes(user?._id);
              const isFullfilled = job.acceptedBy?.length >= job.workersNeeded;

              return (
                <div
                  key={job._id}
                  className="bg-white shadow-lg rounded-xl p-5 border hover:shadow-2xl transition flex flex-col"
                >
                  <h3 className="text-xl font-bold text-gray-800">
                    {job.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Workers Needed: {job.acceptedBy?.length || 0} /{" "}
                    {job.workersNeeded}
                  </p>
                  <p className="text-indigo-600 font-semibold mt-2">
                    ₹{job.budget}
                  </p>
                  <p className="text-gray-500 text-sm">Type: {job.category}</p>
                  <p className="text-gray-500 text-sm">
                    Hours: {job.hours} | Date:{" "}
                    {new Date(job.jobDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Address: {job.location.address}, {job.location.city}
                  </p>
                  <p className="text-gray-500 text-sm">Status: {job.status}</p>

                  <div className="flex flex-col gap-3 mt-4">
                    {/* Worker Actions */}
                    {user?.role === "Worker" &&
                      user?.kycStatus === "Approved" && (
                        <>
                          {!isWorkerAccepted && !isFullfilled && (
                            <button
                              onClick={() => handleAcceptJob(job._id)}
                              className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition"
                            >
                              Accept Job
                            </button>
                          )}

                          {isWorkerAccepted && !isFullfilled && (
                            <>
                              <span className="text-yellow-600 font-medium">
                                You already accepted this job
                              </span>
                              <button
                                onClick={() =>
                                  setWorkerFormVisible((prev) => ({
                                    ...prev,
                                    [job._id]: !prev[job._id],
                                  }))
                                }
                                className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition"
                              >
                                {workerFormVisible[job._id]
                                  ? "Hide Add Worker"
                                  : "Add Worker"}
                              </button>

                              {workerFormVisible[job._id] && (
                                <div className="flex flex-col gap-2 mt-2 border p-3 rounded-lg">
                                  <input
                                    type="number"
                                    min="1"
                                    placeholder="Number of workers to add"
                                    value={workerCountInput[job._id] || ""}
                                    onChange={(e) => {
                                      let count = parseInt(e.target.value);
                                      if (isNaN(count) || count < 1) count = 0;

                                      setWorkerCountInput((prev) => ({
                                        ...prev,
                                        [job._id]: count,
                                      }));

                                      setWorkerCodeInput((prev) => ({
                                        ...prev,
                                        [job._id]: Array(count).fill(""),
                                      }));

                                      setVerifyingCode((prev) => ({
                                        ...prev,
                                        [job._id]: Array(count).fill(false),
                                      }));

                                      setVerifyResult((prev) => ({
                                        ...prev,
                                        [job._id]: Array(count).fill(""),
                                      }));
                                    }}
                                    className="border rounded-lg px-3 py-2"
                                  />

                                  {Array.from({
                                    length: workerCountInput[job._id] || 0,
                                  }).map((_, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center gap-2 flex-wrap"
                                    >
                                      <input
                                        type="text"
                                        placeholder={`Worker ${idx + 1} Code`}
                                        value={
                                          workerCodeInput[job._id]?.[idx] || ""
                                        }
                                        onChange={(e) => {
                                          const newCodes = [
                                            ...(workerCodeInput[job._id] || []),
                                          ];
                                          newCodes[idx] = e.target.value;
                                          setWorkerCodeInput((prev) => ({
                                            ...prev,
                                            [job._id]: newCodes,
                                          }));
                                        }}
                                        className="flex-1 min-w-[150px] border rounded-lg px-3 py-2"
                                      />
                                      <button
                                        onClick={() =>
                                          handleVerifyCode(job._id, idx)
                                        }
                                        disabled={verifyingCode[job._id]?.[idx]}
                                        className="shrink-0 bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition"
                                      >
                                        {verifyingCode[job._id]?.[idx]
                                          ? "Verifying..."
                                          : "Verify Now"}
                                      </button>
                                      {(verifyResult[job._id]?.[idx] || "") ===
                                        "valid" && (
                                        <FaCheckCircle className="text-green-600 text-xl shrink-0" />
                                      )}
                                      {(verifyResult[job._id]?.[idx] || "") ===
                                        "invalid" && (
                                        <FaTimesCircle className="text-red-600 text-xl shrink-0" />
                                      )}
                                    </div>
                                  ))}

                                  <button
                                    onClick={() => handleAddWorker(job._id)}
                                    disabled={addingWorker[job._id]}
                                    className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition mt-2"
                                  >
                                    {addingWorker[job._id]
                                      ? "Adding..."
                                      : "Add Worker(s)"}
                                  </button>
                                </div>
                              )}
                            </>
                          )}

                          {isFullfilled && (
                            <span className="text-center bg-gray-300 text-gray-700 px-3 py-2 rounded-lg">
                              Job Fullfilled
                            </span>
                          )}
                        </>
                      )}

                    {/* Client Close Job */}
                    {/* {user?.role === "Client" && (
                      <button
                        onClick={() => handleCloseJob(job._id)}
                        className="bg-blue-700 text-white px-3 py-2 rounded-lg hover:bg-blue-800 transition"
                      >
                        Close
                      </button>
                    )} */}

                    {/* Accepted worker count */}
                    {job.acceptedBy?.length > 0 && (
                      <p className="text-sm text-gray-500 mt-2">
                        Workers connected: {job.acceptedBy.length} /{" "}
                        {job.workersNeeded}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="col-span-4 text-center text-gray-500">
              No jobs available.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Job;





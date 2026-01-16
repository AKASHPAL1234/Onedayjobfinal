// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useAuth } from "../authcontext/AuthProvider";

// function Alljob() {
//   const [jobs, setJobs] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const { profile: user } = useAuth();

//   useEffect(() => {
//     if (!user?._id) return;

//     const fetchJobs = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:5000/api/job/my",
//           { withCredentials: true }
//         );
//         setJobs(data.jobs);
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to fetch jobs ❌");
//       }
//     };

//     const fetchNotifications = async () => {
//       try {
//         const { data } = await axios.get(
//           `http://localhost:5000/api/job/notifications/${user._id}`,
//           { withCredentials: true }
//         );
//         setNotifications(data);
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to fetch notifications ❌");
//       }
//     };

//     fetchJobs();
//     fetchNotifications();
//   }, [user]);

//   const getJobNotifications = (jobId) => {
//     return notifications.filter(
//       (n) => n.jobId && n.jobId.toString() === jobId.toString()
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">
//       <h2 className="text-3xl font-bold text-indigo-700 text-center mb-10">
//         All My Jobs
//       </h2>

//       {jobs.length === 0 ? (
//         <p className="text-center text-gray-600">No jobs posted yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {jobs.map((job) => (
//             <div
//               key={job._id}
//               className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 hover:shadow-2xl transition duration-300"
//             >
//               <h3 className="text-xl font-semibold text-indigo-600 mb-2">
//                 {job.title}
//               </h3>
//               <p className="text-gray-700 mb-2">{job.description}</p>
//               <p className="text-gray-600 mb-1">
//                 <strong>Salary:</strong> ₹{job.budget}
//               </p>
//               <p className="text-gray-600 mb-1">
//                 <strong>Job Type:</strong> full-time
//               </p>
//               <p className="text-gray-600 mb-1">
//                 <strong>Category:</strong> {job.category}
//               </p>
//               <p className="text-gray-600 mb-1">
//                 <strong>Status:</strong> {job.status}
//               </p>

//               {/* Accepted by */}
//               {job.acceptedBy ? (
//                 <div className="mt-3 flex items-center gap-3 bg-green-50 border border-green-200 p-3 rounded-lg">
//                   <div className="w-10 h-10 bg-green-400 text-white rounded-full flex items-center justify-center text-lg font-bold">
//                     {job.acceptedBy.name ? job.acceptedBy.name.charAt(0) : "W"}
//                   </div>
//                   <div>
//                     <p className="text-green-800 font-semibold">
//                       {job.acceptedBy.name || "Worker Name"}
//                     </p>
//                     <p className="text-gray-600 text-sm">{job.acceptedBy.email}</p>
//                     {job.acceptedBy.address && (
//                       <p className="text-gray-500 text-sm">
//                         {job.acceptedBy.address}
//                       </p>
//                     )}
//                   </div>
//                   <span className="ml-auto text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
//                     Accepted
//                   </span>
//                 </div>
//               ) : (
//                 <p className="text-gray-500 mt-2">Not yet accepted</p>
//               )}

//               {/* Job-specific notifications */}
//               {getJobNotifications(job._id).length > 0 && (
//                 <div className="mt-2 space-y-1">
//                   {getJobNotifications(job._id).map((notif) => (
//                     <p
//                       key={notif._id}
//                       className="text-blue-600 font-medium text-sm"
//                     >
//                       {notif.message} <br />
//                       <small className="text-gray-500">
//                         {new Date(notif.createdAt).toLocaleString()}
//                       </small>
//                     </p>
//                   ))}
//                 </div>
//               )}

//               {/* Job location */}
//               <p className="text-gray-600 mt-2">
//                 <strong>Location:</strong>{" "}
//                 {`${job.location.address}, ${job.location.city}, ${job.location.state} - ${job.location.pincode}`}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Alljob;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useAuth } from "../authcontext/AuthProvider";

// function Alljob() {
//   const [jobs, setJobs] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true); // ✅ loader state
//   const { profile: user } = useAuth();

//   useEffect(() => {
//     if (!user?._id) return;

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [jobsRes, notifRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/job/my", { withCredentials: true }),
//           axios.get(`http://localhost:5000/api/job/notifications/${user._id}`, { withCredentials: true }),
//         ]);
//         setJobs(jobsRes.data.jobs || []);
//         setNotifications(notifRes.data || []);
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to fetch jobs/notifications ❌");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user]);

//   const getJobNotifications = (jobId) => {
//     return notifications.filter(
//       (n) => n.jobId && n.jobId.toString() === jobId.toString()
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-indigo-600 text-lg font-semibold">Loading jobs...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">
//       <h2 className="text-3xl font-bold text-indigo-700 text-center mb-10">
//         All My Jobs
//       </h2>

//       {jobs.length === 0 ? (
//         <p className="text-center text-gray-600">No jobs posted yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {jobs.map((job) => (
//             <div
//               key={job._id}
//               className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 hover:shadow-2xl transition duration-300"
//             >
//               <h3 className="text-xl font-semibold text-indigo-600 mb-2">
//                 {job.title}
//               </h3>

//               {/* Budget & Category */}
//               <p className="text-gray-600 mb-1">
//                 <strong>Salary:</strong> ₹{job.budget}
//               </p>
//               <p className="text-gray-600 mb-1">
//                 <strong>Category:</strong> {job.category}
//               </p>
//               <p className="text-gray-600 mb-1">
//                 <strong>Status:</strong> {job.status}
//               </p>

//               {/* Accepted by */}
//               {job.acceptedBy ? (
//                 <div className="mt-3 flex items-center gap-3 bg-green-50 border border-green-200 p-3 rounded-lg">
//                   <div className="w-10 h-10 bg-green-400 text-white rounded-full flex items-center justify-center text-lg font-bold">
//                     {job.acceptedBy.name ? job.acceptedBy.name.charAt(0) : "W"}
//                   </div>
//                   <div>
//                     <p className="text-green-800 font-semibold">
//                       {job.acceptedBy.name || "Worker Name"}
//                     </p>
//                     <p className="text-gray-600 text-sm">{job.acceptedBy.email}</p>
//                     {job.acceptedBy.address && (
//                       <p className="text-gray-500 text-sm">
//                         {job.acceptedBy.address}
//                       </p>
//                     )}
//                   </div>
//                   <span className="ml-auto text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
//                     Accepted
//                   </span>
//                 </div>
//               ) : (
//                 <p className="text-gray-500 mt-2">Not yet accepted</p>
//               )}

//               {/* Job-specific notifications */}
//               {getJobNotifications(job._id).length > 0 && (
//                 <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//                   <p className="font-semibold text-blue-700 mb-2">
//                     Notifications:
//                   </p>
//                   {getJobNotifications(job._id).map((notif) => (
//                     <div key={notif._id} className="text-sm text-blue-600 mb-1">
//                       {notif.message}
//                       <br />
//                       <small className="text-gray-500">
//                         {new Date(notif.createdAt).toLocaleString()}
//                       </small>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Job location */}
//               <p className="text-gray-600 mt-3 text-sm">
//                 <strong>Location:</strong>{" "}
//                 {`${job.location.address}, ${job.location.city}, ${job.location.state} - ${job.location.pincode}`}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
       
//     </div>
//   );
// }

// export default Alljob;



import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../authcontext/AuthProvider";

function Alljob() {
  const [jobs, setJobs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const { profile: user } = useAuth();

  useEffect(() => {
    if (!user?._id) return;

    const fetchJobs = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/job/my", {
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
          `http://localhost:5000/api/job/notifications/${user._id}`,
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
        "http://localhost:5000/api/job/close",
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


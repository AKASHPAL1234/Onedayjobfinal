// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// function Updatejob() {
//   const [jobs, setJobs] = useState([]);
//   const [editingJobId, setEditingJobId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:5000/api/job/my",
//           { withCredentials: true }
//         );
//         console.log(data.jobs);
//         setJobs(data.jobs || []);
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to fetch your jobs ❌");
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleEditClick = (jobId) => {
//     setEditingJobId(jobId === editingJobId ? null : jobId);
//   };

//   const handleChange = (e, jobId) => {
//     setJobs((prev) =>
//       prev.map((job) =>
//         job._id === jobId ? { ...job, [e.target.name]: e.target.value } : job
//       )
//     );
//   };

//   const handleUpdate = async (jobId) => {
//     const jobToUpdate = jobs.find((job) => job._id === jobId);
//     setLoading(true);
//     try {
//       const { data } = await axios.put(
//         `http://localhost:5000/api/job/update/${jobId}`,
//         jobToUpdate,
//         { withCredentials: true }
//       );
//       toast.success(data.message || "Job updated successfully ✅");
//       setEditingJobId(null);
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Failed to update job ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8">
//       <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
//         My Jobs
//       </h1>

//       <div className="max-w-4xl mx-auto space-y-6">
//         {jobs.map((job) => (
//           <div
//             key={job._id}
//             className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">{job.title}</h2>
//               <button
//                 className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//                 onClick={() => handleEditClick(job._id)}
//               >
//                 {editingJobId === job._id ? "Close" : "Update"}
//               </button>
//             </div>

//             <p className="text-gray-700 mb-2">
//               <strong>Description:</strong> {job.description}
//             </p>
//             <p className="text-gray-700 mb-2">
//               <strong>Location:</strong> {job.location.city}
//             </p>
//             <p className="text-gray-700 mb-2">
//               <strong>Budget:</strong> {job.budget}
//             </p>
//             <p className="text-gray-700 mb-2">
//               <strong>Job Type:</strong> {job.title}
//             </p>
//             <p className="text-gray-700 mb-2">
//               <strong>Category:</strong> {job.category}
//             </p>

//             {/* Inline update panel */}
//             {editingJobId === job._id && (
//               <div className="mt-4 border-t pt-4 space-y-4">
//                 <input
//                   type="text"
//                   name="title"
//                   value={job.title}
//                   onChange={(e) => handleChange(e, job._id)}
//                   className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
//                   placeholder="Job Title"
//                 />
//                 <textarea
//                   name="description"
//                   value={job.description}
//                   onChange={(e) => handleChange(e, job._id)}
//                   className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
//                   rows={3}
//                   placeholder="Description"
//                 />
//                 <input
//                   type="text"
//                   name="location"
//                   value={job.location.city}
//                   onChange={(e) => handleChange(e, job._id)}
//                   className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
//                   placeholder="Location"
//                 />
//                 <input
//                   type="text"
//                   name="budget"
//                   value={job.budget}
//                   onChange={(e) => handleChange(e, job._id)}
//                   className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
//                   placeholder="Salary"
//                 />
//                 <select
//                   name="jobType"
//                   value={job.jobType}
//                   onChange={(e) => handleChange(e, job._id)}
//                   className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
//                 >
//                   <option value="">Select Type</option>
//                   <option>Full-Time</option>
//                   <option>Part-Time</option>
//                   <option>Internship</option>
//                   <option>Remote</option>
//                 </select>
//                 <select
//                   name="category"
//                   value={job.category}
//                   onChange={(e) => handleChange(e, job._id)}
//                   className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
//                 >
//                   <option value="">Select Category</option>
//                   <option>Tech</option>
//                   <option>Design</option>
//                   <option>Marketing</option>
//                   <option>Finance</option>
//                 </select>

//                 <button
//                   onClick={() => handleUpdate(job._id)}
//                   disabled={loading}
//                   className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                   {loading ? "Updating..." : "Save Changes"}
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Updatejob;



import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function Updatejob() {
  const [jobs, setJobs] = useState([]);
  const [editingJobId, setEditingJobId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/job/my", {
          withCredentials: true,
        });
        setJobs(data.jobs || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch your jobs ❌");
      }
    };
    fetchJobs();
  }, []);

  const handleEditClick = (jobId) => {
    setEditingJobId(jobId === editingJobId ? null : jobId);
  };

  const handleChange = (e, jobId) => {
    setJobs((prev) =>
      prev.map((job) =>
        job._id === jobId ? { ...job, [e.target.name]: e.target.value } : job
      )
    );
  };

  const handleUpdate = async (jobId) => {
    const jobToUpdate = jobs.find((job) => job._id === jobId);
    setLoading(true);
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/job/update/${jobId}`,
        jobToUpdate,
        { withCredentials: true }
      );
      toast.success(data.message || "Job updated successfully ✅");
      setEditingJobId(null);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update job ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        {t("updateJob.myJobs")}
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <button
                className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                onClick={() => handleEditClick(job._id)}
              >
                {editingJobId === job._id
                  ? t("updateJob.close")
                  : t("updateJob.update")}
              </button>
            </div>

            <p className="text-gray-700 mb-2">
              <strong>{t("updateJob.description")}:</strong> {job.description}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>{t("updateJob.location")}:</strong> {job.location.city}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>{t("updateJob.budget")}:</strong> {job.budget}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>{t("updateJob.jobType")}:</strong> {job.title}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>{t("updateJob.category")}:</strong> {job.category}
            </p>

            {/* Inline update panel */}
            {editingJobId === job._id && (
              <div className="mt-4 border-t pt-4 space-y-4">
                <input
                  type="text"
                  name="title"
                  value={job.title}
                  onChange={(e) => handleChange(e, job._id)}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
                  placeholder={t("updateJob.titlePlaceholder")}
                />
                <textarea
                  name="description"
                  value={job.description}
                  onChange={(e) => handleChange(e, job._id)}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  placeholder={t("updateJob.descPlaceholder")}
                />
                <input
                  type="text"
                  name="location"
                  value={job.location.city}
                  onChange={(e) => handleChange(e, job._id)}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
                  placeholder={t("updateJob.locationPlaceholder")}
                />
                <input
                  type="text"
                  name="budget"
                  value={job.budget}
                  onChange={(e) => handleChange(e, job._id)}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
                  placeholder={t("updateJob.salaryPlaceholder")}
                />
                <select
                  name="jobType"
                  value={job.jobType}
                  onChange={(e) => handleChange(e, job._id)}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">{t("updateJob.selectType")}</option>
                  <option>{t("updateJob.fullTime")}</option>
                  <option>{t("updateJob.partTime")}</option>
                  <option>{t("updateJob.internship")}</option>
                  <option>{t("updateJob.remote")}</option>
                </select>
                <select
                  name="category"
                  value={job.category}
                  onChange={(e) => handleChange(e, job._id)}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">{t("updateJob.selectCategory")}</option>
                  <option>{t("updateJob.tech")}</option>
                  <option>{t("updateJob.design")}</option>
                  <option>{t("updateJob.marketing")}</option>
                  <option>{t("updateJob.finance")}</option>
                </select>

                <button
                  onClick={() => handleUpdate(job._id)}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {loading ? t("updateJob.updating") : t("updateJob.saveChanges")}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Updatejob;

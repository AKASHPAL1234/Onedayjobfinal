import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKENDURL } from "../../utiles";

export default function KycTable() {
  const [kycs, setKycs] = useState([]);
  const [selectedKyc, setSelectedKyc] = useState(null);

  // Fetch KYC data
  useEffect(() => {
    const fetchKycs = async () => {
      try {
        const res = await axios.get(`${BACKENDURL}/api/auth/kyc/all`);
        setKycs(res.data.data);
      } catch (err) {
        console.error("Error fetching KYC:", err);
      }
    };

    fetchKycs();
  }, []);

  // Approve/Reject
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(
       `${BACKENDURL}/api/auth/kyc/status/${id}`,
        { status: newStatus }
      );

      console.log("Backend Response:", res.data);

      // Update UI
      setKycs((prev) =>
        prev.map((k) =>
          k._id === id ? { ...k, status: newStatus } : k
        )
      );
      setSelectedKyc(null);
    } catch (err) {
      console.error("Error updating status:", err.response?.data || err.message);
    }
  };

  // Sort kycs: Pending -> Rejected -> Approved
  const sortedKycs = [...kycs].sort((a, b) => {
    const order = { Pending: 1, Rejected: 2, Approved: 3 };
    return order[a.status] - order[b.status];
  });

  return (
    <div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Govt ID</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedKycs.length > 0 ? (
            sortedKycs.map((kyc) => (
              <tr key={kyc._id} className="text-center">
                <td className="border p-2">{kyc.fullName}</td>
                <td className="border p-2">{kyc.role}</td>
                <td className="border p-2">{kyc.govtIdType}</td>
                <td
                  className={`border p-2 font-semibold ${
                    kyc.status === "Pending"
                      ? "text-yellow-600"
                      : kyc.status === "Approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {kyc.status}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => setSelectedKyc(kyc)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    View More
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-2">
                No KYC records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {selectedKyc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-2xl p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setSelectedKyc(null)}
            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-4">KYC Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <p><span className="font-semibold">Full Name:</span> {selectedKyc.fullName}</p>
              <p><span className="font-semibold">Role:</span> {selectedKyc.role}</p>
              <p><span className="font-semibold">DOB:</span> {selectedKyc.dob}</p>
              <p><span className="font-semibold">Gender:</span> {selectedKyc.gender}</p>
              <p><span className="font-semibold">Contact:</span> {selectedKyc.contactNumber}</p>
              <p><span className="font-semibold">Address:</span> {selectedKyc.address}</p>
              <p><span className="font-semibold">Govt ID Type:</span> {selectedKyc.govtIdType}</p>
              <p><span className="font-semibold">Govt ID Number:</span> {selectedKyc.govtIdNumber}</p>
              <p><span className="font-semibold">Profession:</span> {selectedKyc.profession}</p>
              <p><span className="font-semibold">Experience:</span> {selectedKyc.experience} yrs</p>
            </div>

            {/* Govt ID & License images */}
            <div className="mt-4 flex space-x-4">
              {selectedKyc.govtIdImage?.url && (
                <div>
                  <p className="font-semibold">Govt ID Image:</p>
                  <img
                    src={selectedKyc.govtIdImage.url}
                    alt="Govt ID"
                    className="w-40 border rounded"
                  />
                </div>
              )}
              {selectedKyc.licenseImage?.url && (
                <div>
                  <p className="font-semibold">License Image:</p>
                  <img
                    src={selectedKyc.licenseImage.url}
                    alt="License"
                    className="w-40 border rounded"
                  />
                </div>
              )}
            </div>

            {/* Approve / Reject */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => handleStatusChange(selectedKyc._id, "Approved")}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusChange(selectedKyc._id, "Rejected")}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

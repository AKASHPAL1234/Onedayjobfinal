import { KYC } from "../models/kyc.model.js";
import { v2 as cloudinary } from "cloudinary";
import { User } from "../models/user.model.js";

// 🔹 Unique 4-digit worker code generator
async function generateUniqueWorkerCode() {
  let code;
  let exists = true;

  while (exists) {
    code = Math.floor(1000 + Math.random() * 9000).toString();
    const kyc = await KYC.findOne({ workerCode: code });
    if (!kyc) exists = false;
  }
  return code;
}

export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const workers = await User.countDocuments({ role: "Worker" });
    const clients = await User.countDocuments({ role: "Client" });
    const pendingKycs = await KYC.countDocuments({ status: "Pending" });
    res.json({ totalUsers, workers, clients, pendingKycs });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Submit KYC
export const submitKyc = async (req, res) => {
  try {
    const {
      userId, // fallback for Postman
      role,
      fullName,
      dob,
      gender,
      contactNumber,
      address,
      govtIdType,
      govtIdNumber,
      profession,
      experience,
    } = req.body;

    let govtIdImage = {};
    let licenseImage = {};

    // Upload Govt ID
    if (req.files?.govtIdImage) {
      const uploadRes = await cloudinary.uploader.upload(
        req.files.govtIdImage.tempFilePath,
        { folder: "kyc_docs" }
      );
      govtIdImage = {
        public_id: uploadRes.public_id,
        url: uploadRes.secure_url,
      };
    }

    // Upload License
    if (req.files?.licenseImage) {
      const uploadRes = await cloudinary.uploader.upload(
        req.files.licenseImage.tempFilePath,
        { folder: "kyc_docs" }
      );
      licenseImage = {
        public_id: uploadRes.public_id,
        url: uploadRes.secure_url,
      };
    }

    // ✅ Use req.user._id (auth) OR req.body.userId (testing)
    const kycData = {
      userId: req.user?._id || userId,
      role,
      fullName,
      dob,
      gender,
      contactNumber,
      address,
      govtIdType,
      govtIdNumber,
      govtIdImage,
      profession,
      experience,
      licenseImage,
    };

    // ✅ Worker ke liye code generate hoga
    if (role === "Worker") {
      kycData.workerCode = await generateUniqueWorkerCode();
    }

    const newKyc = await KYC.create(kycData);

    res.status(201).json({
      message: "KYC submitted successfully",
      data: newKyc,
    });
  } catch (error) {
    console.error("KYC ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Update KYC Status (Admin)
export const updateKycStatus = async (req, res) => {
  try {
    const { kycId } = req.params;
    const { status } = req.body;

    // ✅ KYC status update
    const kyc = await KYC.findByIdAndUpdate(kycId, { status }, { new: true });

    if (!kyc) {
      return res.status(404).json({ message: "KYC not found" });
    }

    // ✅ Update User model also
    const updateData = { kycStatus: status };

    // Sirf worker ke liye workerCode bhi bhejna
    // if (status === "Approved" && kyc.role === "Worker") {
    //   updateData.workerCode = kyc.workerCode; // workerCode fetch from KYC
    // }

    await User.findByIdAndUpdate(kyc.userId, updateData);

    res.json({
      message: `KYC ${status}`,
      data: kyc,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Get KYC Status for a user
export const getKycStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const kyc = await KYC.findOne({ userId });
    if (!kyc) {
      return res.status(404).json({ message: "KYC record not found" });
    }

    res.json({
      message: "KYC fetched successfully",
      data: kyc,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching KYC", error: error.message });
  }
};

// 🔹 Admin - Get all KYC records
export const getAllKycRecords = async (req, res) => {
  try {
    const kycs = await KYC.find().populate("userId", "name email role");

    const total = kycs.length;
    const approved = kycs.filter((k) => k.status === "Approved").length;
    const pending = kycs.filter((k) => k.status === "Pending").length;
    const rejected = kycs.filter((k) => k.status === "Rejected").length;

    res.json({
      message: "All KYC records fetched successfully",
      total,
      approved,
      pending,
      rejected,
      data: kycs,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching all KYC", error: error.message });
  }
};

// ✅ Get WorkerCode from KYC by UserId
export const getWorkerCodeByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // KYC record find karo
    const kyc = await KYC.findOne({ userId, role: "Worker" });

    if (!kyc) {
      return res
        .status(404)
        .json({ message: "KYC record not found for this user" });
    }

    if (!kyc.workerCode) {
      return res.status(400).json({ message: "Worker code not generated yet" });
    }

    res.json({
      message: "Worker code fetched successfully",
      workerCode: kyc.workerCode,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Validate Worker Code
export const validateWorkerCode = async (req, res) => {
  try {
    const { workerCode } = req.body;

    if (!workerCode) {
      return res.status(400).json({ message: "Worker code is required" });
    }

    // KYC record find karo
    const kyc = await KYC.findOne({ workerCode, role: "Worker" });

    if (!kyc) {
      return res.status(404).json({ message: "Invalid worker code" ,valid:"Invalid"});
    }

    if (kyc.status !== "Approved") {
      return res.status(400).json({ message: "Worker KYC not approved yet" });
    }

    // User fetch for extra info
    const worker = await User.findById(kyc.userId).select("name email role");

    res.json({
      message: "Worker code is valid",
      worker: {
        id: worker._id,
        name: worker.name,
        email: worker.email,
        role: worker.role,
        workerCode: kyc.workerCode,
      },
      valid:"valid"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getWorkerCode =  async (req, res) => {
  const { workercode } = req.params;

  if (!workercode)
    return res.status(400).json({ message: "Worker code is required" });

  try {
    const worker = await KYC.findOne({workerCode:workercode });

    if (!worker)
      return res.status(404).json({ message: "Worker not found" });

    return res.status(200).json({ data: worker });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
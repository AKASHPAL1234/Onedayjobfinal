import mongoose from "mongoose";

// Function to generate a 4-digit worker code
// function generateWorkerCode() {
//   return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit number
// }

const kycSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: {
    type: String,
    enum: ["Worker", "Client"],
    required: true,
  },
  fullName: { type: String, required: true },
  dob: Date,
  gender: String,
  contactNumber: { type: String, required: true },
  address: {
    permanent: String,
    current: String,
    city: String,
    state: String,
    pincode: String,
  },
  govtIdType: String,   
  govtIdNumber: String,
  govtIdImage: {
    public_id: String,
    url: String,
  },
  profession: String,   
  experience: Number,
  licenseImage: {
    public_id: String,
    url: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  workerCode: {
    type: String,
    unique: true
  }
}, { timestamps: true });

// Pre-save hook to generate 4-digit workerCode automatically
// kycSchema.pre("save", async function(next) {
//   if (this.role === "Worker" && !this.workerCode) {
//     let code;
//     let exists = true;

//     // Ensure uniqueness
//     while (exists) {
//       code = generateWorkerCode();
//       const kyc = await mongoose.models.KYC.findOne({ workerCode: code });
//       if (!kyc) exists = false;
//     }

//     this.workerCode = code;
//   }
//   next();
// });

export const KYC = mongoose.model("KYC", kycSchema);


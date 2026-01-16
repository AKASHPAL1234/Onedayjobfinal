import express from "express";
import { isAdmin, isAuthenticated } from "../middlewarw/authUser.js";
import { 
  acceptJob,
  closeJob,
  createJob, 
  getJobs, 
  getMyJobs, 
  getNotification, 
  updateJob,
  deleteJob, // ✅ Import deleteJob
  addWorkersToJob
} from "../controllers/job.controller.js";
import { isKycApproved } from "../middlewarw/kyc.js";

const router = express.Router();

// ✅ Create a job (Client/Admin)
router.post(
  "/create",
  isAuthenticated,
  isAdmin("Client", "Admin"),
  isKycApproved("Client"),  // KYC check middleware
  createJob
);

router.post("/add-worker", addWorkersToJob);

// ✅ Get all jobs (Public)
router.get("/all", getJobs);

// ✅ Accept a job (Worker)
router.post("/accept", acceptJob);

// ✅ Get notifications for client
router.get("/notifications/:userId", getNotification);

// ✅ Close job (Client)
router.post("/close", closeJob);

// ✅ Update job (Client/Admin who posted it)
router.put(
  "/update/:id",
  isAuthenticated,
  isAdmin("Client", "Admin"),
  updateJob
);

// ✅ Delete job (Client/Admin who posted it)
router.delete(
  "/:id",
  isAuthenticated,
  isAdmin("Client", "Admin"),
  deleteJob
);

// ✅ Get logged-in user's jobs
router.get("/my", isAuthenticated, getMyJobs);

export default router;


import express from "express";
// import multer from "multer";
import { getMyProfile, login, logout, register, resetPasswordWithoutToken, sendotp, verifyotp } from "../controllers/user.controller.js";
import { isAdmin, isAuthenticated } from "../middlewarw/authUser.js";
import { getAllKycRecords, getKycStatus,  getStats,  getWorkerCode,  getWorkerCodeByUserId,  submitKyc, updateKycStatus, validateWorkerCode } from "../controllers/Kyc.controller.js";

const router = express.Router();
// const upload = multer({ dest: "uploads/" });

router.post("/register", register);
router.post("/login", login);
router.get("/logout",isAuthenticated,logout);
router.get("/myprofile",isAuthenticated,getMyProfile);
router.post("/reset-password",resetPasswordWithoutToken);
router.post("/send-otp",sendotp);
router.post("/verify-otp",verifyotp);



router.post("/kyc/submit", isAuthenticated, submitKyc);
 router.get("/kyc/stats",getStats);  // User submits KYC
router.get("/kyc/worker-code/:userId", getWorkerCodeByUserId);
router.post("/validate-worker-code", validateWorkerCode);
router.put("/kyc/status/:kycId",  updateKycStatus);
router.get("/kyc/status/:userId", isAuthenticated, getKycStatus);
router.get("/kyc/all", getAllKycRecords);
router.get("/worker/:workercode",getWorkerCode);

export default router;

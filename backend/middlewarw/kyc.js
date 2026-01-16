// middleware/kycCheck.js
export const isKycApproved = (role) => {
  return (req, res, next) => {
    if (req.user.role === role && req.user.kycStatus !== "Approved") {
      return res.status(403).json({
        error: `Your KYC is not approved. You cannot perform this action.`,
      });
    }
    next();
  };
};

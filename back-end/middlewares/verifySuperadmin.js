const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin");
async function verifySuperAdmin(req, res, next) {
  const token = req.cookies.adminToken;
  console.log("Token received:", req.cookies.adminToken);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Not verify token",
      });
    }
    const admin = await adminModel
      .findOne({ email: decoded.email })
      .select("-password");

    if (!admin) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    if (admin.role != "superadmin") {
      return res.status(403).send("Access denied");
    }

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
}

module.exports = verifySuperAdmin;

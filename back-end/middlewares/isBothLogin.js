const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin");

async function isBothLogin(req, res, next) {
  const token = req.cookies.adminToken;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await adminModel
      .findOne({ email: decoded.email })
      .select("-password");

    if (!admin) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // 🔑 Attach admin to request
    req.admin = admin; // contains role: admin | superadmin

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
}

module.exports = isBothLogin;

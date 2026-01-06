const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports.isLoggedIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : req.cookies?.token;

    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userfind = await userModel.findById(decoded.id);

    if (!userfind) return res.status(401).json({ message: "User not found" });

    req.user = userfind;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (entity) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const payload = {
    id: entity._id,
    email: entity.email,
  };

  // ✅ Add role ONLY if present (admin / superadmin)
  if (entity.role) {
    payload.role = entity.role;
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports.generateToken = generateToken;
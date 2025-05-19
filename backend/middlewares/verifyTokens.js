const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // use env variable for secret key

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // now req.user will have the full user
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(401).json({ message: "Invalid Token" });
  }
};
 const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
  }

module.exports = {verifyToken,authorizeRoles};

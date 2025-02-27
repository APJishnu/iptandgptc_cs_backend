import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // Import cookie-parser

dotenv.config();

/**
 * Middleware to authenticate admin users
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const authenticateAdmin = (req, res, next) => {
  console.log(req.cookies, "cookies");
  console.log(req.headers.cookie);  // Check if cookie is sent

  try {
    const token = req.cookies.admin_token; // Retrieve token from cookies

    if (!token) {
      return res.status(403).json({
        status: false,
        message: "Access denied. No token provided.",
        errors: [{ field: "auth", message: "Admin authentication required" }],
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin" && decoded.role !== "superadmin") {
      return res.status(403).json({
        status: false,
        message: "Access denied. Not authorized.",
        errors: [{ field: "auth", message: "You are not authorized to perform this action" }],
      });
    }

    req.admin = decoded; // Attach admin info to request object
    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Invalid token",
      errors: [{ field: "auth", message: "Invalid or expired token" }],
    });
  }
};

export default authenticateAdmin;

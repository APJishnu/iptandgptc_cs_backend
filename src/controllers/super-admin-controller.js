import AdminRepository from "../repositories/admin-repository.js";
import { comparePassword } from "../utils/bcrypt-helper.js";
import { generateToken } from "../utils/jwt-helper.js";


const adminRepository = new AdminRepository();

export default class SuperAdminController {
  /**
   * Admin login function
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} - Response with status, message, token, and errors if applicable
   */
  async login(req, res) {
    try {
     
      const { email, password } = req.body.values;
      const errors = [];

      // Validation
      if (!email) errors.push({ field: "email", message: "Email is required" });
      if (!password) errors.push({ field: "password", message: "Password is required" });

      if (errors.length > 0) {
        return res.status(400).json({ status: false, message: "Validation errors", errors });
      }

      // Find admin in the database
      const admin = await adminRepository.findAdminByEmail(email);
      if (!admin) {
        return res.status(401).json({
          status: false,
          message: "Invalid credentials",
          errors: [{ field: "email", message: "Email not found" }],
        });
      }

      // Compare passwords
      const isMatch = await comparePassword(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({
          status: false,
          message: "Invalid credentials",
          errors: [{ field: "password", message: "Incorrect password" }],
        });
      }

      // Generate JWT token
      const token = generateToken({ id: admin._id, role: admin.role });

      return res.status(200).json({ status: true, message: "Login successful", token });
    } catch (error) {
      console.error("Error in AdminController login:", error);
      return res.status(500).json({
        status: false,
        message: "Internal server error",
        errors: [{ field: "server", message: "Something went wrong, please try again later" }],
      });
    }
  }
}

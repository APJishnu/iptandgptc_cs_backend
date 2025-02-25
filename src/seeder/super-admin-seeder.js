import dotenv from "dotenv";
import { hashPassword } from "../utils/bcrypt-helper.js";
import AdminRepository from "../repositories/admin-repository.js";


dotenv.config();
const adminRepo = new AdminRepository()
const seedSuperAdmin = async () => {
  try {
    

    const superAdminEmail = "superadmin@example.com";
    const superAdminPassword = "SuperAdmin@123";
    
    const hashedPassword = await hashPassword(superAdminPassword);

    await adminRepo.createAdmin({
      email: superAdminEmail,
      password: hashedPassword,
      role: "superadmin",
    });

    console.log("Super Admin seeded successfully!");
  } catch (error) {
    console.error("Error seeding super admin:", error);
  }
};

export default seedSuperAdmin;

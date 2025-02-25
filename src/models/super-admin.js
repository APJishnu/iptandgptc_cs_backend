import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["superadmin", "admin"], default: "admin" },
});

const superAdmin = mongoose.model("Admin", AdminSchema);
export default superAdmin;

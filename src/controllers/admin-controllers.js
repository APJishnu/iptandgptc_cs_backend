import cloudinary from "../config/cloudinary.js";
import AdminRepository from "../repositories/admin-repository.js";
import dotenv from "dotenv";

dotenv.config();

const adminRepository = new AdminRepository();
export default class AdminController {
  async addNotes(req, res) {
    try {
      const { module, description, link } = req.body;
      const file = req.files?.file; // Access file correctly

      if (!module || !description) {
        return res
          .status(400)
          .json({
            status: false,
            error: "Module and description are required",
          });
      }

      let fileUrl = null;
      console.log(req.files?.file);
      if (file) {
        const tempFilePath = file.tempFilePath || "/tmp/" + file.name;

        // Move file manually if tempFilePath is empty
        if (!file.tempFilePath) {
          await file.mv(tempFilePath);
        }

        const result = await cloudinary.uploader.upload(tempFilePath, {
          folder: process.env.CLOUDINARY_FOLDER,
          resource_type: "auto",
        });

        console.log("Cloudinary upload result:", result);
        fileUrl = result.secure_url;
      }

      console.log(module, description, fileUrl, link);
      const newNotes = await adminRepository.addNotes(
        module,
        description,
        fileUrl,
        link
      );

      if (newNotes) {
        return res
          .status(200)
          .json({
            status: true,
            message: "Notes added successfully",
            data: newNotes,
          });
      } else {
        return res
          .status(500)
          .json({ status: false, message: "Failed to add notes", data: [] });
      }
    } catch (error) {
      console.error("Error in addNotes:", error);
      res.status(500).json({
        status: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async getSubjectsWithModules(req, res) {
    try {
      const subjectsWithModules =
        await adminRepository.getSubjectsWithModules();

      if (!subjectsWithModules || subjectsWithModules.length === 0) {
        return res
          .status(404)
          .json({ status: false, message: "No subjects found" });
      }

      res
        .status(200)
        .json({
          status: true,
          data: subjectsWithModules,
          message: "subjects fetched successfully",
        });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: false, message: "Internal server error", error });
    }
  }

  async fetchAllNotes(req, res) {
    try {
      const result = await adminRepository.getAllNotes();

      if (!result.length) {
        return res.status(404).json({ status: false, message: "No notes found." , data:[] });
      }

      res.status(200).json({ status: true,message:"Note fetched successfully", data: result });
    } catch (error) {
      console.error("Error in fetchAllNotes:", error);
      res.status(500).json({ status: false, message: "Internal server error", error: error.message });
    }
  }

}

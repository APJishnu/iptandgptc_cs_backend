import express from "express";
import AdminController from "../controllers/admin-controllers.js";


const adminRouter = express.Router();

const adminController = new AdminController();


adminRouter.route("/add-notes").post(adminController.addNotes);
adminRouter.route("/subjects-with-modules").post(adminController.getSubjectsWithModules);
adminRouter.route("/get-notes").post(adminController.fetchAllNotes);



export default adminRouter;
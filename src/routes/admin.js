import express from "express";
import AdminController from "../controllers/admin-controllers.js";
import EventController from "../controllers/event-controller.js";


const adminRouter = express.Router();

const adminController = new AdminController();
const eventController = new EventController()


adminRouter.route("/add-notes").post(adminController.addNotes);
adminRouter.route("/subjects-with-modules").post(adminController.getSubjectsWithModules);
adminRouter.route("/get-notes").post(adminController.fetchAllNotes);
adminRouter.route("/delete-note").post(adminController.deleteNote);

adminRouter.route("/add-event").post(eventController.addEvent);
adminRouter.route("/get-all-events").post(eventController.findAllEvents);



export default adminRouter;
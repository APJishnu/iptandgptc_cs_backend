import express from 'express';
import UserController from '../controllers/user-controllers.js';
import EventController from '../controllers/event-controller.js';

const userRouter = express.Router();

const userController = new UserController();
const eventController = new EventController();

userRouter.route("/get-notes").post(userController.getNotes);

userRouter.route("/events").post(eventController.getUserEventsByCategory);

export default userRouter;
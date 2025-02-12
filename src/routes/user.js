import express from 'express';
import UserController from '../controllers/user-controllers.js';

const userRouter = express.Router();

const userController = new UserController();

userRouter.route("/get-notes").post(userController.getNotes);

export default userRouter;
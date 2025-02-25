import express from 'express';
import SuperAdminController from '../controllers/super-admin-controller.js';


const authRouter = express.Router();
const superadminController = new SuperAdminController();

authRouter.route('/admin-login').post(superadminController.login);



export default authRouter;
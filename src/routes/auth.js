import express from 'express';


const authRouter = express.Router();

authRouter.route('/login').post(()=>{});



export default authRouter;
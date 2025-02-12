import adminRouter from "./admin.js";
import authRouter from "./auth.js";
import userRouter from "./user.js";

const configureRoutes = (app) => {
    app.use('/api/auth',authRouter);
    app.use('/api/user',userRouter);
    app.use('/api/admin',adminRouter);
}


export default configureRoutes;
import { Router } from "express";
import { loginController, logoutController, refreshToken, registerController } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post('/register', registerController);
authRouter.post('/login',loginController)
authRouter.post('/refreshToken',refreshToken)
authRouter.post('/logout' , logoutController)
authRouter.get('/get-me',isAuthenticated,getMe)

export default authRouter;
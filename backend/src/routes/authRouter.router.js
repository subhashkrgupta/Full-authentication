import { Router } from "express";
import { getMe, loginController, logoutController, refreshToken, registerController, UpdateProfile } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post('/register', registerController);
authRouter.post('/login',loginController)
authRouter.post('/refreshToken',refreshToken)
authRouter.post('/logout' , logoutController)
authRouter.get('/get-me',isAuthenticated,getMe)
authRouter.post('/update-profile',isAuthenticated ,UpdateProfile)

export default authRouter;
import { Router } from "express";
import { loginController, refreshToken, registerController } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/register', registerController);
authRouter.post('/login',loginController)
authRouter.post('/refreshToken',refreshToken)

export default authRouter;
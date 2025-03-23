import { Router } from "express";
import { signup, signIn, verifyEmail, } from "../controllers/auth.controller.js";
const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signIn);
authRouter.get('/verify/:token', verifyEmail);
export default authRouter;
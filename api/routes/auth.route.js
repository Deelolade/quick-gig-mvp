import { Router } from "express";
import { signup, signIn, verifyEmail, google, updateUser, } from "../controllers/auth.controller.js";
import {authenticateUser} from "../utils/authMiddleware.js"

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signIn);
authRouter.get('/verify/:token', verifyEmail);
authRouter.post('/google', google)
authRouter.put('/update/:userId', authenticateUser, updateUser)
export default authRouter;
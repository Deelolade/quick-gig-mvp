import { Router } from "express";
import { signup, verifyEmail, signIn} from "../controllers/auth.controller.js";
const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signIn);
authRouter.post('/verify', verifyEmail);
export default authRouter;
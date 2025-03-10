import { Router } from "express";
import { signup, verifyEmail, signIn} from "../controllers/auth.controller.js";
const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signIn);
authRouter.post('/verifyemail', verifyEmail);
export default authRouter;
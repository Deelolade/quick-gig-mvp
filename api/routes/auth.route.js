import { Router } from "express";
import signup from "../controllers/auth.controller.js";
const authRouter = Router();

authRouter.post('/auth', signup);
export default authRouter;
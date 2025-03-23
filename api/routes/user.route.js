import { Router } from "express";
import { authenticateUser, isAdmin } from "../utils/admins.js";
import { makeAdmin } from "../controllers/user.controller.js";
const userRouter = Router();

userRouter.put("/make-admin/:userId", authenticateUser, isAdmin, makeAdmin)
export default userRouter;
import { Router } from "express";
import { authenticateUser, isAdmin, isClient,  } from "../utils/authMiddleware.js";
import { makeAdmin,getFreelancers } from "../controllers/user.controller.js";
const userRouter = Router();


//Make authenticated user admin
userRouter.put("/make-admin/:userId", authenticateUser, isAdmin, makeAdmin);

// get admin dashboard
userRouter.get('/admin-dashboard',authenticateUser, isAdmin, (req, res) =>{
    res.json({message: "Welcome to the Admin dashboard"})
})
// get freelancers dashboard
userRouter.get('/freelancer-dashboard',authenticateUser,getFreelancers)
// get clients dashboard
userRouter.get("/client-dashboard", authenticateUser, isClient, (req, res)=>{
    res.json({message: "Welcome to the client dashboard"})
})
export default userRouter;
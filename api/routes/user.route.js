import { Router } from "express";
import { authenticateUser, isAdmin, isClient, isFreelancer,  } from "../utils/authMiddleware.js";
import { makeAdmin,getFreelancers, getFreelancer, updateUserRole } from "../controllers/user.controller.js";
const userRouter = Router();


//Make authenticated user admin
userRouter.put("/make-admin/:userId", authenticateUser, isAdmin, makeAdmin);

userRouter.get("/freelancer/:userId", authenticateUser,isFreelancer, getFreelancer)

// get freelancers for clients
userRouter.get('/freelancers',authenticateUser,getFreelancers)

// updates user role when signing in
userRouter.patch('/role/:userId',authenticateUser,updateUserRole)


// get admin dashboard
userRouter.get('/admin-dashboard',authenticateUser, isAdmin, (req, res) =>{
    res.json({message: "Welcome to the Admin dashboard"})
})
// get clients dashboard

userRouter.get("/client-dashboard", authenticateUser, isClient, (req, res)=>{
    res.json({message: "Welcome to the client dashboard"})
})
export default userRouter;
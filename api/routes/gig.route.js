import { Router } from "express";
import { createGig, getAllGigs, getGigCount } from "../controllers/gigs.controller.js";
import { authenticateUser } from "../utils/authMiddleware.js";

const gigRouter = Router()

gigRouter.post("/gigs", authenticateUser, createGig)
gigRouter.get("/gigs", getAllGigs)
gigRouter.get("/gigs/count", authenticateUser, getGigCount)

export default gigRouter
import { Router } from "express";
import { createGig, getAllGigs } from "../controllers/gigs.controller.js";
import { authenticateUser } from "../utils/authMiddleware.js";

const gigRouter = Router()

gigRouter.post("/gigs", authenticateUser, createGig)
gigRouter.get("/gigs", getAllGigs)
export default gigRouter
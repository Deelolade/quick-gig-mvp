import User from "../models/user.model.js";
import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";


export const isAdmin = async (req,res, next)=>{
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized. User not found." });
        }

        const user = await User.findById(req.user.id);
        if(!user || !user.isAdmin){
            return res.status(403).json({
                message: "Access denied. Admins only."
            })
        }
        next()
    } catch (error) {
        next(errorHandler(500, "Internal Server Error"));
    }
}

export const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers
        if (!token) {
            return res.status(401).json({ message: "No token provided. Unauthorized !" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to req.user
        next(); // Continue to next middleware
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

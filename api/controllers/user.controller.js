import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

// Controller to make a user an admin
export const makeAdmin = async (req, res, next) => {
    try {
        const { userId } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return next(errorHandler(404, "User not found."));
        }

        // Update user role to admin
        user.isAdmin = true;
        await user.save();

        res.json({ success: true, message: "User has been made an admin." });
    } catch (error) {
        next(errorHandler(500, "Internal Server Error"));
    }
};
export const getFreelancers = async (req, res, next) => {

        try {
            const allFreelancers = await User.find({ role: "freelancer" }).select('-password');
            res.status(200).json({
                success: true,
                freelancers: allFreelancers,
            })

        } catch (error) {
            next(error)
        }
    }

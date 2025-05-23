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
export const getFreelancer = async(req, res, next)=>{
    const {userId}= req.params;
    try {
        const freelancerDetails = await User.findById(userId)
        res.status(200).json({
            success: true,
            freelancer: freelancerDetails
        })

    } catch (error) {
        next(error)
    }
}
export const updateUserRole = async(req, res, next)=>{
    try {
        const {role} =req.body;
        if(!role){
            return res.status(400).json({success:false, message:"Role is required."})
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {role},
        {new:true})
            res.status(200).json({
                success:true,
                message:"Role updated successfully",
                role:updatedUser.role
            })
    } catch (err) {
        next(err)
    }

}
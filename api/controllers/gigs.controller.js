import Gigs from "../models/gig.model.js"
import { errorHandler } from "../utils/error.js";


export const getAllGigs = async (req, res, next)=>{
try {
    const allGigs = await Gigs.find();
    res.status(200).json({
        count : allGigs.length,
        success: true,
        Gigs: allGigs
    })
} catch (error) {
    next(error)
}    
} 
export const createGig = async (req, res, next) => {
    console.log(req.body)
    console.log("User making request:", req.user);

    try {
        const { title, description, price, category, deliveryTime } = req.body;
        if (!title || !description || !price || !category || !deliveryTime || title === "" || description === "" || price === "" || category === "" || deliveryTime ==="" ) {
            return next(errorHandler(400, "all fields are required "))
        }

        if (req.user.role !== "client") {
            return res.status(403).json({ message: "Only clients can create gigs!" })
        }

        const newGig = new Gigs({
            ...req.body,
            client: req.user.id
        })
        await newGig.save()
        res.status(200).json({
            success: true,
            message: "gig created successfully!"
        });
    } catch (error) {
        next(error)
    }
}
export const getGigCount = async (req, res, next)=>{
    try {
        const client = req.user.id;
        const count = await Gigs.countDocuments({client})
        res.status(200).json({count})
    } catch (error) {
        next(error)
    }
}
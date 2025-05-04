import Messages from "../models/message.model.js"
import User from "../models/user.model.js";


export const sendMessage = async (req, res, next) => {
    try {
        const { senderId, receiverId, content } = req.body
        if (senderId === "" || receiverId === "" || content === "" || !senderId || !receiverId || !content) {
            res.status(400).json({ message: "All fields are required." })
        }
        const newMessage = new Messages({ senderId, receiverId, content })
        await newMessage.save()
        res.status(200).json({
            success: true,
            message: newMessage
        })
    } catch (error) {
        next(error)
    }
}

export const getMessages = async (req, res, next) => {
    try {
        const {userA, userB}= req.query
        if(!userA || !userB){
            return res.status(400).json({ message: "User IDs are required." });
        }
        const messages = await Messages.find({
            $or: [
                { senderId: userA, receiverId: userB },
                { senderId: userB, receiverId: userA }
            ]
        })
            .sort({ createdAt: 1 }).limit(20)
        res.status(201).json({success: true,
            messages:messages})
    } catch (error) {
        next(error)
    }
}



import Messages from "../models/message.model.js"
import User from "../models/user.model.js";


export const sendMessage = async (req, res, next) => {
    try {
        const { senderId, recieverId, content } = req.body
        if (senderId === "" || recieverId === "" || content === "" || !senderId || !recieverId || !content) {
            res.status(400).json({ message: "All fields are required." })
        }
        const newMessage = new Messages({ senderId, recieverId, content })
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
        res.status(201).json(messages)
    } catch (error) {
        next(error)
    }
}


// export const conversations = async (req, res, next) => {
//   const { userId } = req.params;

//   try {
//     // Find all messages where the user is either sender or receiver
//     const messages = await Messages.find({
//       $or: [{ senderId: userId }, { receiverId: userId }],
//     });

//     // Get unique user IDs they've chatted with
//     const otherUserIds = new Set();
//     messages.forEach(msg => {
//       if (msg.senderId !== userId) otherUserIds.add(msg.senderId);
//       if (msg.receiverId !== userId) otherUserIds.add(msg.receiverId);
//     });

//     // Fetch user info for each of those users
//     const users = await User.find({ _id: { $in: Array.from(otherUserIds) } }).select('userName profilePicture');

//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: "Something went wrong." });
//   }
// };


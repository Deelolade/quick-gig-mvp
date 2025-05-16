import Chat from "../models/chat.model.js";
import Messages from "../models/message.model.js"
import GroupChat from "../models/chatroom.model.js";


export const sendMessage = async (req, res, next) => {
    try {
        const { senderId, recieverId, content } = req.body
        if (senderId === "" || recieverId === "" || content === "" || !senderId || !recieverId || !content) {
            res.status(400).json({ message: "All fields are required." })
        }
        // SAVE MESSAGES TO DB 
        const newMessage = new Messages({ senderId, recieverId, content })
        await newMessage.save()

        //UPDATES MESSAGES 
        await Chat.findByIdAndUpdate(
            {
                participants: { $all: [senderId, recieverId] }
            },
            {
                participants: [senderId, recieverId],
                lastMessages: content,
                createdAt: new Date()
            },
            {
                upsert: true,
                new: true
            }
        )
        res.status(200).json({
            success: true,
            message: { newMessage }
        })
    } catch (error) {
        next(error)
    }
}

export const getMessages = async (req, res, next) => {
    try {
        const { userA, userB } = req.query
        if (!userA || !userB) {
            return res.status(400).json({ message: "User IDs are required." });
        }
        const messages = await Messages.find({
            $or: [
                { senderId: userA, receiverId: userB },
                { senderId: userB, receiverId: userA }
            ]
        })
            .sort({ createdAt: 1 }).limit(50)
        console.log(req.query); // To check userA and userB
        res.status(201).json({ messages })
    } catch (error) {
        next(error)
    }
}

export const getUserChats = async (req, res, next) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: "userId required" });
        }
        const chats = await Chat.find({ participants: userId })
            .populate("participants", "username avatar")
            .sort({ updatedAt: -1 });

        res.status(200).json(chats);
    } catch (error) {
        next(error);
    }
};

export const getChatRoomMessages = async(req, res, next) => {
    try {
        const newMessage = await GroupChat.find().populate("senderId",  "userName profilePicture");
        res.status(200).json({
            message:newMessage
        })

    } catch(error) {
        next(error)
    }
}

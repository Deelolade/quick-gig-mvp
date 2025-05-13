import GroupChat from "./models/chatroom.model.js";
import Messages from "./models/message.model.js";
import { getUserFromDB } from "./utils/getUsers.js";

const userSocketMap = {}; // { userId: socketId }

export const socketHandler = (io) => {
    io.on("connection", (socket) => {
        // console.log("Client connected:", socket.id);

        // Register the user and join general room
        socket.on("register_user", (userId) => {
            userSocketMap[userId] = socket.id;
            socket.join("general");
            // console.log(`User ${userId} registered and joined 'general' room with socket ${socket.id}`);
        });

        // Join specific room
        socket.on("join_room", ({ userId, room }) => {
            socket.join(room);
            // console.log(`User ${userId} joined room ${room}`);
        });

        // Send direct message to specific room
        socket.on("send_message", async ({ senderId, receiverId, content, room }) => {
            if (!senderId || !receiverId || !content || !room) return;

            const message = new Messages({ senderId, receiverId, content });
            await message.save();

            io.to(room).emit("receive_message", {
                senderId,
                content,
                createdAt: message.createdAt,
            });
        });

        // Handle chat request
        socket.on("chat_request", ({ from, to }) => {
            const targetSocketId = userSocketMap[to];
            if (targetSocketId) {
                io.to(targetSocketId).emit("incoming_chat_request", from);
                console.log(`Chat request sent from ${from._id || from} to ${to}`);
            } 
            // else {
            //     console.log(`User (${to}) is not connected`);
            // }
        });

        // ✅ General chat message handler
        socket.on("send_general_message", async ({ senderId, text }) => {
            if (!senderId || !text) return;

            const message = new GroupChat({ senderId, text, room: "general" });
            const savedMessage = await message.save();

            io.to("general").emit("chatRoom_request", {
                senderId,
                text,
                timestamp: savedMessage.createdAt,
            });
        });

        // Disconnect handler
        socket.on("disconnect", () => {
            // console.log("Client disconnected:", socket.id);
            for (const [userId, socketId] of Object.entries(userSocketMap)) {
                if (socketId === socket.id) {
                    delete userSocketMap[userId];
                    break;
                }
            }
        });
    });
};

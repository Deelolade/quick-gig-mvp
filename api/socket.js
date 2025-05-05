import Messages from "./models/message.model.js";
import { getUserFromDB } from "./utils/getUsers.js";

const userSocketMap = {}; // { userId: socketId }

export const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        // Register the user with their socket ID
        socket.on("register_user", (userId) => {
            userSocketMap[userId] = socket.id;
            console.log(`User ${userId} registered with socket ${socket.id}`);
        });

        // Join a chat room
        socket.on("join_room", ({ userId, room }) => {
            socket.join(room);
            console.log(`User ${userId} joined room ${room}`);
        });

        // Handle sending a message
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

        // Chat request sent by client to freelancer
        socket.on("chat_request", ({ from, to }) => {
            const targetSocketId = userSocketMap[to];
            if (targetSocketId) {
                io.to(targetSocketId).emit("incoming_chat_request", from);
                console.log(`Chat request sent from ${from._id || from} to ${to}`);
            } else {
                console.log(`Freelancer (${to}) is not connected`);
            }
        });

        // Handle disconnect
        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
            for (const [userId, socketId] of Object.entries(userSocketMap)) {
                if (socketId === socket.id) {
                    delete userSocketMap[userId];
                    break;
                }
            }
        });
    });
};

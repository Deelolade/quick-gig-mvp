import Messages from "./models/message.model.js";
import { getUserFromDB } from "./utils/getUsers.js";


export const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        socket.on("join_room", ({ userId, room }) => {
            socket.join(room)
            console.log(`user with ${userId} join ${room}`)
        })

        // Handle sending a message (saves it in DB & broadcasts it)
        socket.on("send_message", async ({ senderId, receiverId, content, room }) => {
            if (!senderId || !receiverId || !content || !room) return;

            // Save message to DB
            const message = new Messages({ senderId, receiverId, content });
            await message.save();

            // Emit message to the room
            io.to(room).emit("receive_message", {
                senderId,
                content,
                createdAt: message.createdAt,
            });
        });

        socket.on("disconnect", () => {
            console.log('Client disconnected:', socket.id);
        })
    })
}

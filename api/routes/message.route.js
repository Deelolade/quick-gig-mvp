import { Router } from "express";
import { getChatRoomMessages, getMessages, getUserChats, sendMessage, } from "../controllers/message.controller.js";
const messageRouter = Router()

messageRouter.post("/messages", sendMessage)
messageRouter.get("/messages", getMessages)
messageRouter.get("/chats/:userId", getUserChats)
messageRouter.get("/chatrooms", getChatRoomMessages)
// messageRouter.post("/conversations/:userId", conversations)
export default messageRouter
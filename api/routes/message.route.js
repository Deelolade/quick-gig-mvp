import { Router } from "express";
import { getMessages, getUserChats, sendMessage, } from "../controllers/message.controller.js";
const messageRouter = Router()

messageRouter.get("/messages", getMessages)
messageRouter.get("/chats/:userId", getUserChats)
messageRouter.post("/messages", sendMessage)
// messageRouter.post("/conversations/:userId", conversations)
export default messageRouter
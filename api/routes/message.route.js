import { Router } from "express";
import { getMessages, getUserChats, sendMessage, } from "../controllers/message.controller.js";
const messageRouter = Router()

messageRouter.post("/messages", sendMessage)
messageRouter.get("/messages", getMessages)
messageRouter.get("/chats/:userId", getUserChats)
// messageRouter.post("/conversations/:userId", conversations)
export default messageRouter
import { Router } from "express";
import { getMessages, sendMessage, } from "../controllers/message.controller.js";
const messageRouter = Router()

messageRouter.get("/messages", getMessages)
messageRouter.post("/messages", sendMessage)
// messageRouter.post("/conversations/:userId", conversations)
export default messageRouter
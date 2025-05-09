import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({
    participants: {
        required: true,
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    }, 
    lastMessages:{
        type: String,
        default:""
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
},{ timestamps:true }
);

const Chat = mongoose.model("chat", chatSchema)
export default Chat
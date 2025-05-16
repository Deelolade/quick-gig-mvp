import mongoose from "mongoose"

const groupSchema = new mongoose.Schema({
    text:{
        type: String, 
        required: true
    },
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    room:{
        type:String,
        default: "general"
    }
}, {timestamps: true})
const GroupChat = mongoose.model("chatRoom", groupSchema)
export default GroupChat
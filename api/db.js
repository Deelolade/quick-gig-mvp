import { config } from 'dotenv'
import mongoose from 'mongoose'
config()
export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("connected to mongodb database")
    } catch (err) {
        console.log("error connecting to mongodb:", err)
    }
}
import express from 'express';
import { connectDB } from './db.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import gigRouter from './routes/gig.route.js';
import cors from "cors"
import cookieParser from 'cookie-parser';

const port =  5500;

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
// app.use(cors())


app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api", gigRouter)


app.listen(port, (req, res)=>{
    console.log(`server is running on  http://localhost:${port}`)
})


connectDB();
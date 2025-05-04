import express from 'express';
import http from "http"
import { connectDB } from './db.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import gigRouter from './routes/gig.route.js';
import cors from "cors"
import cookieParser from 'cookie-parser';
import proposalRouter from './routes/proposal.route.js';
import { Server } from "socket.io";
import { socketHandler } from './socket.js';
import messageRouter from './routes/message.route.js';
const port = 5500;

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
// app.use(cors())


const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});


// connect to database
connectDB();


// use socket logic
socketHandler(io)

//routes 
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api", gigRouter)
app.use("/api", proposalRouter)
app.use("/api", messageRouter)

// listening port
server.listen(port, () => {
    console.log(`server is running on  http://localhost:${port}`)
})
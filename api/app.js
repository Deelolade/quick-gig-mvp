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
import { arcjetMiddleware } from './utils/arcjet.js';
import dotenv from 'dotenv';
dotenv.config();
console.log("🌍 FRONTEND_URL:", process.env.FRONTEND_URL);


const port = process.env.PORT || 5500;

const app = express();
app.set('trust proxy', true);

app.use(cors({
    origin: ["https://quick-gig-mvp.vercel.app","http://localhost:5173"]  ,
    credentials: true
}));
// ✅ Add this for preflight CORS requests to succeed
app.options('*', cors({
    origin: ["https://quick-gig-mvp.vercel.app", "http://localhost:5173"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());


if (process.env.ARCJET_ENV !== 'development') {
    app.use(arcjetMiddleware);
}

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["https://quick-gig-mvp.vercel.app" ,"http://localhost:5173"] ,
        methods: ["GET", "POST"],
    credentials: true

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
app.use("/", messageRouter)

// listening port
server.listen(port, () => {
    console.log(`server is running on  http://localhost:${port}`)
})

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
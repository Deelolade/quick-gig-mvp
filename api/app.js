import express from 'express';
import { connectDB } from './db.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
const port = 5500;


const app = express();
app.use(express.json());
connectDB();


app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)


app.listen(port, (req, res)=>{
    console.log(`server is running on  http://localhost:${port}`)
})


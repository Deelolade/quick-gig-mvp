import express from 'express';
import { connectDB } from './db.js';
import authRouter from './routes/auth.route.js';
const port = 5500;
const app = express();
app.use(express.json());
connectDB();

app.get("/", (req, res)=>{
    res.json("Hello World");
})

app.use("/api", authRouter)


app.listen(port, (req, res)=>{
    console.log(`server is running on  http://localhost:${port}`)
})


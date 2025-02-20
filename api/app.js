import express from 'express';
import { connectDB } from './db.js';
const port = 5500;


const app = express();
app.use(express.json());
connectDB();

app.get("/", (req, res)=>{
    res.json("Hello World");
})




app.listen(port, (req, res)=>{
    console.log(`server is running on  http://localhost:${port}`)
})


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // cho phép Vite gọi API
app.use(express.json()); //đọc json từ body

//Kết nối DB
connectDB();

//test Route
app.get('/api',(req,res)=>{
    res.json({ message: 'TechZone API is running' });
});

app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});
import express from "express";
import Product from "../models/Product"
import { verifyToken, requireAdmin } from "../middleware/auth";

const router = express.Router();

//api/products?category=
router.get('/', async(req,res)=>{
    const filter = req.query.category ?{category};
})
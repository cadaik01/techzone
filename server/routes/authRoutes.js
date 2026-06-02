import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

//Method post cho register
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const exist = await User.findOne({ username });
        if (exist) {
            return res.status(400).json({ message: 'Username already exists' });
            
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
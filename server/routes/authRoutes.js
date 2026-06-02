import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

//Method post cho register
//api/auth/register
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const exist = await User.findOne({ username });
        if (exist) {
            return res.status(400).json({ message: 'Username already exists' });

            const hashed = await bcrypt.hash(password, 10);
            const user = await User.create({ username, password: hashed, role });
            res.status(201).json(({ message: 'Registered successfully', role }));
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    //api/auth/login
    router.post('/login', async (res, req) => {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username });
            if (!user) { //check username đã tồn tại -> lỗi
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) { //check đúng mật khẩu
                return res.status(400).json({ message: 'Password do not match! Try again!' });
            };
            const token = jwt.sign(
                {
                    id: user._id,
                    username: user.username,
                    role: user.role
                }, process.env.JWT_SECRET,
                { expiresIn: '12h' }
            );
            res.json({
                token,
                role: user.role,
                username: user.username,
            })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })
});

export default router;
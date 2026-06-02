//Kiểm tra token trước khi gọi route

import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next){
    const token = req.headers.authorization?.split('')[1];
    if(!token){ //check nếu token không đúng -> lỗi
        return res.status(401).json({ message: 'No token provided' });
};
    try{
        req.user = jwt.verify(token,process.env.JWT_SECRET);
        next();
    }catch(error){
        res.status(401).son({ message: 'Invalid token' });
    }
};

export function requireAdmin (req,res,next){
    if(req.user?.role !== 'admin'){ //check nếu ko phải là admin - báo lỗi
        return res.status(400).json({ message: 'Admin access required' });
    }
}
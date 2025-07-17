require('dotenv').config();
const jwt = require('jsonwebtoken');
const User_Services = require('../controllers/user_services');
const classUserServices = new User_Services();
const ACCESS_TOKEN = 'dd392eba2883b918867abbd4cf0dfdb79522bccae3e337e6f7796848e6e50f34702cb7dbdc2a81b8f89d8ed5628aa411e365df8d1acb481a57c4db8ef444cdbc'
const verifyToken = (req, res, next) => {
    console.log('Authorization Header:', req.headers.authorization);

    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'unauthorized access' });
    }

    const token = req.headers.authorization.split(' ')[1];
    console.log('Extracted Token:', token);

    jwt.verify(token, ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            console.error('JWT Verification Error:', err.message);
            return res.status(401).send({ message: 'unauthorized access' });
        }
        req.decoded = decoded;
        console.log('Decoded Token:', decoded);
        next();
    });
};


const verifyUserRole = async (req, res, next) => {
    const email = req.decoded.email;
    const query = { email: email };
    const user = await classUserServices.findDataIfExist('users', query);
    const isAdmin = user?.role === 'admin';
    if (!isAdmin) {
        return res.status(403).send({ message: 'forbidden access' });
    }
    next();
}


const getUserRole = async (req, res, next) => {
    const email = req.decoded.email;
    const query = { email: email };

    if (!email) {
        return res.status(401).send({ message: 'unauthorized access' });
    }
    try {
        const user = await classUserServices.findDataIfExist('users', query);
        if (!user || Object.keys(user).length === 0) {
            return res.status(404).send({ message: 'User not found' });
        }
        req.userRole = user.role;
        next();
    } catch (err) {
        console.error("Error fetching user role:", err.message);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

module.exports = { verifyToken, getUserRole, verifyUserRole };
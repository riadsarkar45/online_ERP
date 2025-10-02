require('dotenv').config();
const jwt = require('jsonwebtoken');
const User_Services = require('../controllers/user_services');
const classUserServices = new User_Services();

const verifyToken = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'unauthorized access' });
    }

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
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
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const userAuth = express.Router();
const User_Services = require('../../controllers/user_services');
const verifyToken = require('../../services/auth');

const classUserServices = new User_Services();

userAuth.post('/jwt', async (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1h' });

    res.send({ token });
});

userAuth.get('/user/role/:email', verifyToken, async (req, res) => {
    const email = req.params.email;
    if (!email) return res.status(403).send({ message: 'forbidden access' });
    try{
        const user = await classUserServices.findDataIfExist('users', { email });
        if (!user || Object.keys(user).length === 0) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send({ role: user.role });
    }catch(err){
        console.error("Error fetching user role:", err.message);
        return res.status(500).send({ error: "Internal Server Error" });
    }
})

module.exports = userAuth;

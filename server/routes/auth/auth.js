require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const userAuth = express.Router();
const User_Services = require('../../controllers/user_services');
const { verifyToken } = require('../../services/auth');

const classUserServices = new User_Services();

userAuth.post('/jwt', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send({ message: 'Email is required' });
    }

    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
    res.send({ token });
});


userAuth.get('/user/role/:email', verifyToken, async (req, res) => {
    const email = req.params.email;
    if (email !== req.decoded.email) {
        return res.send({ message: email })
    }
    try {
        const user = await classUserServices.findDataIfExist('users', { email });
        console.log(user, 'user role fetched');
        if (!user || Object.keys(user).length === 0) {
            return res.status(404).send({ message: 'User not found' });
        }
        console.log('User role fetched:', user.role);
        res.send({ role: user.role });
    } catch (err) {
        console.error("Error fetching user role:", err.message);
        return res.status(500).send({ error: "Internal Server Error" });
    }
})

module.exports = userAuth;

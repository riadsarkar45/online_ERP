const express = require('express');
const issueRoutes = express.Router();
const User_Services = require('../controllers/user_services');
const classUserServices = new User_Services();

issueRoutes.get('/raw-issue', async (req, res) => {
    try {
        const raw_yarn_balance = await classUserServices.fetchData('raw-yarn-balance')
        if (raw_yarn_balance.length === 0) return res.send({ message: "No raw issue data found" });
        const sortedRawYarnBalance = raw_yarn_balance.sort((a, b) => b.quantity - a.quantity);
        res.send(sortedRawYarnBalance);
    } catch (err) {
        console.error("Error fetching raw issue data:", err.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
})

module.exports = issueRoutes;
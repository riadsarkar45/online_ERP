const express = require('express');
const summaryRouters = express.Router();
const User_Services = require('../controllers/user_services');
const classUserServices = new User_Services();

summaryRouters.get('/summary', async (req, res) => {
  try {

    const summary = await classUserServices.fetchData('summary')
    if(!summary || summary.length === 0) return res.status(404).send({ error: "No summary data found" });
    res.send(summary);

  } catch (error) {
    console.error('Error fetching or summarizing:', error);
    res.status(500).send('Internal Server Error');
  }
});




module.exports = summaryRouters;
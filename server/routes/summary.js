const express = require('express');
const summaryRouters = express.Router();
const User_Services = require('../controllers/user_services');
const classUserServices = new User_Services();

summaryRouters.get('/summary', async (req, res) => {
  try {

    const summary = await classUserServices.fetchData('summary')
    if (!summary || summary.length === 0) return res.status(404).send({ error: "No summary data found" });
    res.send(summary);

  } catch (error) {
    console.error('Error fetching or summarizing:', error);
    res.status(500).send('Internal Server Error');
  }
});

summaryRouters.get('/pi-summary', async (req, res) => {
  try {
    const piWiseSummary = await classUserServices.fetchData('pi_wise_report');

    if (!piWiseSummary || piWiseSummary.length === 0) {
      return res.status(404).json({ error: "No PI summary data found" });
    }

    const groupedByMarketing = {};

    for (const item of piWiseSummary) {
      const marketing = item.marketing_name?.trim();

      if (!groupedByMarketing[marketing]) {
        groupedByMarketing[marketing] = [];
      }

      groupedByMarketing[marketing].push(item);
    }

    const result = Object.entries(groupedByMarketing)
      .map(([marketing_name, items]) => ({
        marketing_name,
        dyeing_sections: items.sort((a, b) => a.pi_no - b.pi_no),
      }))
      .sort((a, b) => a.marketing_name.localeCompare(b.marketing_name));

    res.send(result);

  } catch (error) {
    console.error('Error fetching PI summary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});








module.exports = summaryRouters;
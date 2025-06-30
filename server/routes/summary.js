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
    const dyeingOrders = await classUserServices.fetchData('dyeing_orders');

    if (!dyeingOrders || dyeingOrders.length === 0) {
      return res.status(404).json({ error: "No PI summary data found" });
    }

    const piNos = [
      ...new Set(
        dyeingOrders
          .map(order => String(order.pi_no).trim()) // normalize all to string
          .filter(Boolean) // remove undefined/null/empty
      )
    ].sort((a, b) => Number(a) - Number(b));

    // Step 3: Optionally, group by pi_no if you want per-pi summaries
    // const grouped = Object.groupBy(dyeingOrders, o => o.pi_no); // Node 20+
    // fallback: group manually if needed

    // Step 4: Send the response
    res.json({
      summary: dyeingOrders,
      pi_nos: piNos
    });

  } catch (error) {
    console.error('Error fetching PI summary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});







module.exports = summaryRouters;
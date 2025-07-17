const express = require('express');
const summaryRouters = express.Router();
const User_Services = require('../controllers/user_services');
const classUserServices = new User_Services();
const { verifyToken, getUserRole } = require('../services/auth');

summaryRouters.get('/summary', verifyToken, getUserRole, async (req, res) => {
  try {

    const summary = await classUserServices.fetchData('summary')
    if (!summary || summary.length === 0) return res.status(404).send({ error: "No summary data found" });
    res.send(summary);

  } catch (error) {
    console.error('Error fetching or summarizing:', error);
    res.status(500).send('Internal Server Error');
  }
});

summaryRouters.get('/pi-summary', verifyToken, getUserRole, async (req, res) => {
  try {
    const piWiseSummary = await classUserServices.fetchData('dyeing_orders');

    if (!Array.isArray(piWiseSummary) || piWiseSummary.length === 0) {
      return res.status(404).json({ error: "No PI summary data found" });
    }

    const groupedByMarketing = {};

    for (const item of piWiseSummary) {
      const marketing = item.marketing_name?.trim();
      const pi_no = item.pi_no?.trim();
      const factory_name = item.factory_name?.trim();

      if (!groupedByMarketing[marketing]) {
        groupedByMarketing[marketing] = {};
      }

      if (!groupedByMarketing[marketing][pi_no]) {
        groupedByMarketing[marketing][pi_no] = {};
      }

      if (!groupedByMarketing[marketing][pi_no][factory_name]) {
        groupedByMarketing[marketing][pi_no][factory_name] = [];
      }

      groupedByMarketing[marketing][pi_no][factory_name].push(item);
    }

    const result = Object.entries(groupedByMarketing).map(([marketing_name, piGroups]) => ({
      marketing_name,
      pi_summaries: Object.entries(piGroups).map(([pi_no, factoryGroups]) => ({
        pi_no,
        factories: Object.entries(factoryGroups).map(([factory_name, items]) => {
          const total_production_qty = items.reduce((sum, item) => sum + Number(item.total_production_qty || 0), 0);
          const total_sample_adjust_qty = items.reduce((sum, item) => sum + Number(item.total_sample_adjust_qty || 0), 0);
          const total_store_delivery = items.reduce((sum, item) => sum + Number(item.total_store_delivery || 0), 0);
          const total_dyeing_order_qty = items.reduce((sum, item) => sum + Number(item.dyeing_order_qty || 0), 0);

          return {
            factory_name,
            total_production_qty,
            total_sample_adjust_qty,
            total_store_delivery,
            total_dyeing_order_qty,
            dyeing_sections: items.sort((a, b) => a.section_name?.localeCompare(b.section_name)),
          };
        }),
      })),
    })).sort((a, b) => a.marketing_name.localeCompare(b.marketing_name));

    res.json(result);

  } catch (error) {
    console.error('Error fetching PI summary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});








module.exports = summaryRouters;
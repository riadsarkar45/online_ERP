const express = require('express');
const summaryRouters = express.Router();
const User_Services = require('../controllers/user_services');
const classUserServices = new User_Services();

summaryRouters.get('/summary', async (req, res) => {
  try {
    const normalOrders = await classUserServices.fetchData('dyeing_orders');
    const sampleAdjustments = await classUserServices.fetchData('production_report');

    const summary = {};

    function safeParseNumber(value) {
      if (value == null) return 0;
      const cleaned = value.toString().replace(/,/g, '').trim();
      const num = Number(cleaned);
      if (isNaN(num)) {
        console.warn('Warning: Could not parse number from', value);
        return 0;
      }
      return num;
    }

    // Process normal dyeing orders
    normalOrders.forEach(order => {
      const name = order.marketing_name;
      if (!name) return;

      const qty = safeParseNumber(order.dyeing_order_qty);

      if (!summary[name]) {
        summary[name] = {
          marketing_name: name,
          total_dyeing_order_qty: 0,
          total_sample_adjust_qty: 0,
          total_store_delivery: 0,
        };
      }

      summary[name].total_dyeing_order_qty += qty;
    });

    // Process sample adjustments
    sampleAdjustments.forEach(sample => {
      const name = sample.marketing_name;
      if (!name || sample.status !== 'Sample Adjust Qty') return;

      const qty = safeParseNumber(sample.productionQty);

      if (!summary[name]) {
        summary[name] = {
          marketing_name: name,
          total_dyeing_order_qty: 0,
          total_sample_adjust_qty: 0,
          total_store_delivery: 0,
        };
      }

      summary[name].total_sample_adjust_qty += qty;
    });

    // Process total store delivery
    sampleAdjustments.forEach(delivery => {
      const marketingName = delivery.marketing_name?.trim();
      const status = delivery.status?.trim();

      if (!marketingName || status !== "Total Store Delivery") return;

      const qty = safeParseNumber(delivery.productionQty);

      if (!summary[marketingName]) {
        summary[marketingName] = {
          marketing_name: marketingName,
          total_dyeing_order_qty: 0,
          total_sample_adjust_qty: 0,
          total_store_delivery: 0,
        };
      }

      summary[marketingName].total_store_delivery += qty;
    });


    res.json(Object.values(summary));

  } catch (error) {
    console.error('Error fetching or summarizing:', error);
    res.status(500).send('Internal Server Error');
  }
});




module.exports = summaryRouters;
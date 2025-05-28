const express = require('express');
const userRouters = express.Router();
const User_Services = require('../controllers/user_services');
const classUserServices = new User_Services();

userRouters.get('/dyeing-orders', async (req, res) => {
    try {
        const result = await classUserServices.fetchData('dyeing_orders', {
            lookups: [
                {
                    from: 'production_report',
                    localField: 'dyeing_order',
                    foreignField: 'dyeing_order',
                    as: 'production_reports'
                }
            ]
        });

        if (!result.length) {
            return res.status(404).send({ error: "No data found" });
        }

        res.send(result);
    } catch (err) {
        console.error("Error fetching dyeing orders:", err.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

userRouters.post('/update-production', async (req, res) => {
    const checkData = req.body;
    if (!checkData || Object.keys(checkData).length === 0) return res.status(400).send({ error: "No data provided" });
    const dataToInsert = await classUserServices.insertToTheDatabase(checkData, 'production_report');
    if (dataToInsert) {
        res.send({ message: "Data inserted successfully", data: dataToInsert });
    } else {
        res.status(500).send({ error: "Something went wrong don't try again later" });
    }
})

userRouters.post('/add_new_dyeing_order', async (req, res) => {

    if (!req.body || Object.keys(req.body).length === 0 || !Array.isArray(req.body)) return res.status(400).send({ error: "No data provided" });

    const dyeingOrders = [];

    for (const element of req.body) {

        const insertNewDyeingOrder = await classUserServices.insertToTheDatabase(element, 'dyeing_orders');

        if (!insertNewDyeingOrder) {
            return res.status(500).send({ error: "Something went wrong, don't try again later" });
        }

        dyeingOrders.push(insertNewDyeingOrder);
    }

    res.send({ message: "All dyeing orders added successfully", data: dyeingOrders });

})



module.exports = userRouters;

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
    const checkIfDyeingStatusAreSame = await classUserServices.findDataIfExist('production_report', { status: checkData.status, productionQty: checkData.productionQty })
    if (checkIfDyeingStatusAreSame && Object.keys(checkIfDyeingStatusAreSame).length > 0) return res.send({ error: "Match found. Please make changes first." });
    if (checkData.status === 'Total Production Qty') await classUserServices.updateData({ dyeing_order: checkData.dyeing_order }, { productionQty: Number(checkData.productionQty) }, 'dyeing_orders');
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
    const duplicates = [];

    for (const element of req.body) {
        const exists = await classUserServices.findDataIfExist('dyeing_orders', {
            dyeing_order: element.dyeing_order
        });

        if (exists) {
            duplicates.push(element.dyeing_order); // or store full element if needed
            continue; // Skip inserting duplicates
        }

        const inserted = await classUserServices.insertToTheDatabase(element, 'dyeing_orders');

        if (!inserted) {
            return res.status(500).send({ error: "Something went wrong, please try again later" });
        }

        dyeingOrders.push(inserted);
    }

    if (duplicates.length > 0) {
        return res.status(409).send({
            error: "Some dyeing orders already exist",
            duplicates
        });
    }

    res.send({
        message: "All dyeing orders added successfully",
        data: dyeingOrders
    });


})



module.exports = userRouters;

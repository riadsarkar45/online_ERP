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
    if (!checkData || Object.keys(checkData).length === 0) {
        return res.status(400).send({ error: "No data provided" });
    }

    const checkIfDyeingStatusAreSame = await classUserServices.findDataIfExist('production_report', {
        status: checkData.status,
        productionQty: checkData.productionQty
    });

    if (checkIfDyeingStatusAreSame && Object.keys(checkIfDyeingStatusAreSame).length > 0) {
        return res.send({ error: "Match found. Please make changes first." });
    }

    if (checkData.status === 'Total Production Qty') {
        await classUserServices.updateData(
            { dyeing_order: checkData.dyeing_order },
            { productionQty: Number(checkData.productionQty) },
            'dyeing_orders'
        );

        const checkMarketingName = await classUserServices.findDataIfExist('summary', {
            marketing_name: checkData.marketing_name
        });

        if (checkMarketingName) {
            await classUserServices.updateData(
                { marketing_name: checkData.marketing_name },
                { total_production_qty: Number(checkData.productionQty) },
                'summary'
            );


        }
    }

    if (checkData.status === 'Sample Adjust Qty') {

        const checkMarketingName = await classUserServices.findDataIfExist('summary', {
            marketing_name: checkData.marketing_name
        });

        if (checkMarketingName) {
            await classUserServices.updateData(
                { marketing_name: checkData.marketing_name },
                { total_sample_adjust_qty: Number(checkData.productionQty) },
                'summary'
            );


        }
    }

    const dataToInsert = await classUserServices.insertToTheDatabase(checkData, 'production_report');

    if (dataToInsert) {
        return res.send({ message: "Data inserted successfully", data: dataToInsert });
    } else {
        return res.status(500).send({ error: "Something went wrong don't try again later" });
    }
});


userRouters.post('/add_new_dyeing_order', async (req, res) => {
    if (Object.keys(req.body).length < 1 || !req.body) return res.status(400).send({ error: 'No data provided' });
    const exists = await classUserServices.findDataIfExist('dyeing_orders', {
        dyeing_order: req.body.dyeing_order
    });
    if (exists) return res.send({ error: 'Dyeing order already inserted' })
    const insertOrder = await classUserServices.insertToTheDatabase(req.body, 'dyeing_orders')

    const dyeingOrderFound = await classUserServices.findDataIfExist('summary', {
        dyeing_order: req.body.dyeing_order
    });
    const { marketing_name, month_name, sectionName, total_production_qty, total_sample_adjust_qty, total_store_delivery } = req.body || {};
    if (dyeingOrderFound) {
        await classUserServices.updateData(
            { marketing_name: marketing_name },
            { total_dyeing_qty: Number(req.body.dyeing_order_qty) },
            'summary'
        )
    } else {
        await classUserServices.insertToTheDatabase({ marketing_name, month_name, sectionName, total_production_qty, total_sample_adjust_qty, total_store_delivery }, 'summary');
    }

    if (!insertOrder) return res.send({ error: 'Failed to insert data.' })
    res.send({ success: 'Order Inserted' })

})



module.exports = userRouters;

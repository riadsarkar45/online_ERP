const express = require('express');
const userRouters = express.Router();
const User_Services = require('../controllers/user_services');
const verifyToken = require('../services/auth');
const getUserRole = require('../services/auth');
const classUserServices = new User_Services();
const currentM = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;

userRouters.get('/dyeing-orders', verifyToken, getUserRole, async (req, res) => {
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

userRouters.post('/update-production', verifyToken, getUserRole, async (req, res) => {
    const checkData = req.body;
    console.log(checkData, 'line 33');
    if (!checkData || Object.keys(checkData).length === 0) {
        return res.status(400).send({ error: "No data provided" });
    }

    const qty = Number(checkData.productionQty);
    if (isNaN(qty)) {
        return res.status(400).send({ error: "Production quantity must be a number" });
    }

    const statusOptions = [
        {
            status: 'Total Production Qty',
            dyeingField: 'productionQty',
            summaryField: 'total_production_qty',
        },
        {
            status: 'Total Store Delivery',
            dyeingField: 'total_store_delivery',
            summaryField: 'total_store_delivery',
        },
        {
            status: 'Sample Adjust Qty',
            dyeingField: 'total_sample_adjust_qty',
            summaryField: 'total_sample_adjust_qty',
        },
        {
            status: 'Total Delivery Order',
            dyeingField: 'total_delivery_order',
            summaryField: 'total_delivery_order',
        },
    ];

    const currentStatus = statusOptions.find(opt => opt.status === checkData.status);

    if (!currentStatus) {
        return res.status(400).send({ error: "Invalid status" });
    }

    const checkDyeingOrder = await classUserServices.findDataIfExist('dyeing_orders', {
        dyeing_order: checkData.dyeing_order
    });
    const isMatchFoundWithPi = await classUserServices.findDataIfExist('pi_wise_report', {
        pi_no: Number(checkData.pi_no),
        yarn_type: checkData.yarn_type,
    });

    if (isMatchFoundWithPi) {
        await classUserServices.updateData(
            { pi_no: checkData.pi_no, yarn_type: checkData.yarn_type },
            { $inc: { [currentStatus.dyeingField]: qty } },
            'pi_wise_report'
        );

    }

    const checkSummary = await classUserServices.findDataIfExist('summary', {
        marketing_name: checkData.marketing_name,
        currentMonth: currentM,
    });

    if (checkDyeingOrder) {
        await classUserServices.updateData(
            { dyeing_order: checkData.dyeing_order },
            { $inc: { [currentStatus.dyeingField]: qty } },
            'dyeing_orders'
        );

    }

    if (checkSummary) {
        await classUserServices.updateData(
            { marketing_name: checkData.marketing_name, currentMonth: currentM },
            { $inc: { [currentStatus.summaryField]: qty } },
            'summary'
        );

    }

    const dataToInsert = await classUserServices.insertToTheDatabase(checkData, 'production_report');

    if (dataToInsert) {
        return res.send({ message: "Data inserted successfully", data: dataToInsert });
    } else {
        return res.status(500).send({ error: "Something went wrong. Try again later." });
    }
});



userRouters.post('/add_new_dyeing_order', verifyToken, getUserRole, async (req, res) => {
    if (Object.keys(req.body).length < 1 || !req.body) return res.status(400).send({ error: 'No data provided' });
    const exists = await classUserServices.findDataIfExist('dyeing_orders', {
        dyeing_order: req.body.dyeing_order
    });
    if (exists) return res.send({ error: 'Dyeing order already inserted' })
    const insertOrder = await classUserServices.insertToTheDatabase(req.body, 'dyeing_orders')
    const { marketing_name, month_name, sectionName, dyeing_order_qty, currentMonth, total_sample_adjust_qty, total_store_delivery } = req.body || {};


    const isPiSummaryFound = await classUserServices.findDataIfExist('pi_wise_report',
        { pi_no: Number(req.body.pi_no), yarn_type: req.body.yarn_type, }
    );
    if (isPiSummaryFound) {
        await classUserServices.updateData(
            { pi_no: Number(req.body.pi_no) },
            { $inc: { dyeing_order_qty: Number(req.body.dyeing_order_qty) } },
            'pi_wise_report'
        );


    } else {
        await classUserServices.insertToTheDatabase(
            {
                sectionName,
                marketing_name,
                month_name,
                yarn_type: req.body.yarn_type,
                pi_no: Number(req.body.pi_no),
                unit_price: Number(req.body.unit_price),
                dyeing_order_qty: Number(dyeing_order_qty),
                total_sample_adjust_qty: Number(total_sample_adjust_qty),
                total_store_delivery: Number(total_store_delivery),

            }, 'pi_wise_report')
    }


    const dyeingOrderFound = await classUserServices.findDataIfExist('summary', {
        marketing_name: req.body.marketing_name,
        currentMonth: currentM,
    });
    if (dyeingOrderFound) {
        await classUserServices.updateData(
            {
                marketing_name: marketing_name,
                currentMonth: currentM,
            },
            { $inc: { total_dyeing_qty: Number(req.body.dyeing_order_qty) } },
            'summary'
        );

    } else {
        await classUserServices.insertToTheDatabase(
            {
                marketing_name,
                month_name,
                sectionName,
                total_sample_adjust_qty,
                total_store_delivery,
                currentMonth,
                total_dyeing_qty: Number(dyeing_order_qty) || 0
            },
            'summary');
    }

    if (!insertOrder) return res.send({ error: 'Failed to insert data.' })
    res.send({ success: 'Order Inserted' })

})

userRouters.get('/get_pi_info/:pi_no', verifyToken, getUserRole, async (req, res) => {
    if (!req.params.pi_no || isNaN(Number(req.params.pi_no))) {
        return res.status(400).send({ error: 'Invalid PI number provided.' });
    }
    const findData = await classUserServices.findDataIfExist('dyeing_orders',
        { pi_no: Number(req.params.pi_no) }
    )
    if (!findData) return res.send({ findData: null, error: 'No data found for this PI number.' });
    res.send(findData);
})



module.exports = userRouters;

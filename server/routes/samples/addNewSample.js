const express = require('express');
const User_Services = require('../../controllers/user_services');
const { default: analyzeColorDelivery } = require('../../functions/functions');
const userSampleRouters = express.Router();
const classUserServices = new User_Services();
const verifyToken = require('../../services/auth');
const getUserRole = require('../../services/auth');

userSampleRouters.post('/new-sample', async (req, res) => {
    try {
        const requiredFields = [
            'dyeing_order',
            'sectionName',
            'yarn_type',
            'marketing_name',
            'merchandiser_name',
            'factory_name',
            'dyeing_order_qty',
            'month_name',
            'currentMonth',
            'color_name'
        ];

        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`,
                type: 'error',
            });
        }
        const {
            dyeing_order,
            sectionName,
            yarn_type,
            marketing_name,
            merchandiser_name,
            factory_name,
            dyeing_order_qty,
            month_name,
            currentMonth,
            color_name,

        } = req.body;

        const trimmedOrder = dyeing_order.trim();

        const existingOrder = await classUserServices.findDataIfExist(
            'sample_orders',
            { dyeing_order: trimmedOrder }
        );

        if (existingOrder) {
            return res.status(409).json({
                message: 'Sample order already exists',
                type: 'error',
            });
        }

        const newSampleData = {
            dyeing_order: trimmedOrder,
            sectionName,
            yarn_type,
            marketing_name,
            merchandiser_name,
            factory_name,
            dyeing_order_qty,
            month_name,
            currentMonth,
            color_name,
            created_at: new Date(),
            received_cols: [],
            status: '',
            delivered: '',
        };

        await classUserServices.insertToTheDatabase(newSampleData, 'sample_orders');

        return res.status(201).json({
            message: 'Sample added successfully',
            type: 'success',
        });

    } catch (err) {
        console.error('POST /new-sample error:', err);
        return res.status(500).json({
            message: 'Something went wrong while adding the sample.',
            type: 'error',
        });
    }
});

userSampleRouters.get('/samples', verifyToken, getUserRole, async (req, res) => {
    try {
        const sampleOrders = await classUserServices.fetchData('sample_orders');
        const { month, marketing } = req.query;

        if (!Array.isArray(sampleOrders) || sampleOrders.length === 0) {
            return res.send({ message: 'No sample orders found', type: 'error' });
        }

        const filtered = sampleOrders.filter(item => {
            const matchMonth = month ? item.month_name === month : true;
            const matchMarketing = marketing ? item.marketing_name === marketing : true;
            return matchMonth && matchMarketing;
        });

        const groupBy = (list, keyFn) => {
            const map = {};
            for (const item of list) {
                const key = keyFn(item);
                if (!key) continue;
                if (!map[key]) map[key] = [];
                map[key].push(item);
            }
            return map;
        };

        const buildGroupedSections = (items) => {
            const sectionMap = {};
            for (const item of items) {
                const yarn_type = item.yarn_type?.trim();
                const section = item.sectionName?.trim();
                const key = `${yarn_type}__${section}`;

                if (!sectionMap[key]) {
                    sectionMap[key] = {
                        yarn_type,
                        sectionName: section,
                        month_name: item.month_name,
                        factoryName: item.factory_name,
                        total_dyeing_order_qty: 0,
                        orders: [],
                    };
                }

                sectionMap[key].total_dyeing_order_qty += parseFloat(item.dyeing_order_qty || 0);
                sectionMap[key].orders.push(item);
            }

            return Object.values(sectionMap).sort((a, b) => a.yarn_type.localeCompare(b.yarn_type));
        };

        for (const sample of sampleOrders) {
            if (sample.color_name.length === sample.received_cols.length) {
                await classUserServices.updateData(
                    { dyeing_order: sample.dyeing_order },
                    { $set: { delivered: 'Sample Received' } },
                    'sample_orders'
                );
            } else {
                await classUserServices.updateData(
                    { dyeing_order: sample.dyeing_order },
                    { $set: { delivered: ' ' } },
                    'sample_orders'
                );
            }
        }

        const marketingGroups = groupBy(filtered, item => item.marketing_name?.trim());
        const marketingWiseSamples = Object.entries(marketingGroups).map(([marketing_name, items]) => ({
            marketing_name,
            dyeing_sections: buildGroupedSections(items),
        }));

        const factoryGroups = groupBy(filtered, item => item.factory_name?.trim());
        const factoryWiseSamples = Object.entries(factoryGroups).map(([factory_name, items]) => ({
            factory_name,
            dyeing_sections: buildGroupedSections(items),
        }));

        res.send({
            marketingWiseSamples,
            factoryWiseSamples,
            sampleOrders
        });
    } catch (error) {
        console.error('Error fetching samples:', error);
        res.status(500).send({ message: 'Internal server error', error });
    }
});

userSampleRouters.post('/sample-status/:status/:dyeing_order', verifyToken, getUserRole, async (req, res) => {
    const status = req.params.status;
    const dyeing_order = req.params.dyeing_order;
    console.log(status, dyeing_order, 'line 166');

    if (status === 'sample-adjust') {
        await classUserServices.updateData(
            { dyeing_order: dyeing_order },
            { $set: { status: 'Adjust Qty' } },
            'sample_orders'
        );

        return res.send({ message: 'Status updated to Adjust Qty', type: 'success' });
    }

    // Optional: handle unknown status
    return res.status(400).send({ message: 'Invalid status', type: 'error' });
});



userSampleRouters.post('/update-sample/:dyeing_order', verifyToken, getUserRole, async (req, res) => {
    const input = req.body;
    const dyeingOrder = req.params.dyeing_order;


    if (!Array.isArray(input) || input.length === 0) {
        return res.send({ message: 'Invalid input format' });
    }

    const sampleOrders = await classUserServices.fetchData('sample_orders');

    // Group received colors by month (yyyy-mm)
    const groupedByMonth = input.reduce((acc, item) => {
        const monthKey = item.date?.slice(0, 7); // e.g., "2025-07"
        if (!acc[monthKey]) acc[monthKey] = [];
        acc[monthKey].push(item.color);
        return acc;
    }, {});

    const results = [];



    for (const month in groupedByMonth) {
        const matchingRecord = sampleOrders.find(order => order.currentMonth === month);

        if (!matchingRecord) {
            results.push({
                month,
                error: 'No matching record found in DB for this month'
            });
            continue;
        }

        const received = groupedByMonth[month];
        const expected = matchingRecord.color_name;

        const { matches } = analyzeColorDelivery(expected, received);

        results.push(matches);
    }

    const existingOrder = await classUserServices.findDataIfExist(
        'sample_orders',
        { dyeing_order: dyeingOrder }
    );
    console.log(existingOrder);
    if (results && existingOrder) {
        const flatResult = input.flat();
        await classUserServices.updateData(
            { dyeing_order: dyeingOrder },
            { $push: { received_cols: { $each: flatResult } } },
            'sample_orders'
        );



    }
    res.json({
        status: 'success',
        data: results
    });
});

userSampleRouters.get('/final-summary', verifyToken, getUserRole, async (req, res) => {
    try {
        const samples = await classUserServices.fetchData('sample_orders');

        let totalDyeingQty = 0;
        let totalAdjustQty = 0;
        let storeDelivery = 0;
        let adjustBalance = 0;
        let deliveryBalance = 0;

        for (const sample of samples) {
            totalDyeingQty += parseInt(sample.dyeing_order_qty) || 0;

            if (sample.status === "Adjust Qty") {
                totalAdjustQty += sample.dyeing_order_qty ? parseInt(sample.dyeing_order_qty) : 0;
            }
            if (sample.delivered === "Sample Received") {
                storeDelivery += sample.dyeing_order_qty ? parseInt(sample.dyeing_order_qty) : 0;
            }
            if (sample.status === "Not Adjusted" || sample.status === "") {
                adjustBalance += sample.dyeing_order_qty ? parseInt(sample.dyeing_order_qty) : 0;
            }
            if (sample.delivered === " ") {
                deliveryBalance += sample.dyeing_order_qty ? parseInt(sample.dyeing_order_qty) : 0;
            }

            if (sample.color_name.length === sample.received_cols.length) {
                await classUserServices.updateData(
                    { dyeing_order: sample.dyeing_order },
                    { $set: { delivered: 'Sample Received' } },
                    'sample_orders'
                );
            } else {
                await classUserServices.updateData(
                    { dyeing_order: sample.dyeing_order },
                    { $set: { delivered: ' ' } },
                    'sample_orders'
                );
            }
        }

        res.send({ totalDyeingQty, totalAdjustQty, adjustBalance, storeDelivery, deliveryBalance });
    } catch (error) {
        console.error('Error in /final-summary:', error);
        res.status(500).send({ message: 'Internal server error', error });
    }
});










module.exports = userSampleRouters
const express = require('express');
const User_Services = require('../../controllers/user_services');
const { default: analyzeColorDelivery } = require('../../functions/functions');
const userSampleRouters = express.Router();
const classUserServices = new User_Services();

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
            status: ''
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

userSampleRouters.get('/samples', async (req, res) => {
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



userSampleRouters.post('/update-sample/:dyeing_order', async (req, res) => {
    const input = req.body;
    console.log(req.body);
    const dyeingOrder = req.params.dyeing_order;
    console.log(dyeingOrder);
    if (!Array.isArray(input) || input.length === 0) {
        return res.status(400).json({ message: 'Invalid input format' });
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
    // if (results) {
    //     await classUserServices.updateData(
    //         { dyeing_order: checkData.dyeing_order },
    //         { $inc: { [currentStatus.dyeingField]: qty } },
    //         'dyeing_orders'
    //     );
    // }
    console.log(results);
    res.json({
        status: 'success',
        data: results
    });
});






module.exports = userSampleRouters
const express = require('express');
const User_Services = require('../../controllers/user_services');
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
            color_name
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
            created_at: new Date()
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
    const sampleOrders = await classUserServices.fetchData('sample_orders');

    if (!sampleOrders || sampleOrders.length === 0) {
        return res.send({ message: 'No sample order found', type: 'error' });
    }

    const samplesGroupByMarketing = {};

    for (const item of sampleOrders) {
        const marketing = item.marketing_name?.trim();
        const yarn_type = item.yarn_type?.trim();
        const section = item.sectionName?.trim();
        const month_name = item.month_name?.trim();
        const qty = parseFloat(item.dyeing_order_qty || 0);

        if (!samplesGroupByMarketing[marketing]) {
            samplesGroupByMarketing[marketing] = {};
        }

        const key = `${yarn_type}__${section}`;

        if (!samplesGroupByMarketing[marketing][key]) {
            samplesGroupByMarketing[marketing][key] = {
                yarn_type,
                sectionName: section,
                total_dyeing_order_qty: 0,
                month_name: month_name,
                orders: [],
            };
        }

        samplesGroupByMarketing[marketing][key].total_dyeing_order_qty += qty;
        samplesGroupByMarketing[marketing][key].orders.push(item);
    }

    const samples = Object.entries(samplesGroupByMarketing).map(([marketing_name, group]) => ({
        marketing_name,
        dyeing_sections: Object.values(group).sort((a, b) =>
            a.yarn_type.localeCompare(b.yarn_type)
        ),
    })).sort((a, b) => a.marketing_name.localeCompare(b.marketing_name));

    res.send(samples);
});


module.exports = userSampleRouters
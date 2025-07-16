const express = require('express');
const issueRoutes = express.Router();
const User_Services = require('../controllers/user_services');
const classUserServices = new User_Services();
const verifyToken = require('../services/auth');
const getUserRole = require('../services/auth');

issueRoutes.get('/raw-issue', verifyToken, getUserRole, async (req, res) => {
    try {
        const raw_yarn_balance = await classUserServices.fetchData('raw-yarn-balance')
        if (raw_yarn_balance.length === 0) return res.send({ message: "No raw issue data found" });
        const sortedRawYarnBalance = raw_yarn_balance.sort((a, b) => b.quantity - a.quantity);
        res.send(sortedRawYarnBalance);
    } catch (err) {
        console.error("Error fetching raw issue data:", err.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
})

issueRoutes.post('/update-raw-yarn', verifyToken, getUserRole, async (req, res) => {
    try {
        const {
            order_no,
            yarn_type,
            issue_qty,
            type
        } = req.body;

        const trimmedOrderNo = order_no?.trim();
        const trimmedYarnType = yarn_type?.trim();
        const issueQty = Number(issue_qty);

        if (!trimmedOrderNo || !trimmedYarnType || !type || isNaN(issueQty) || issueQty <= 0) {
            return res.send({ message: "Invalid input", type: "error" });
        }

        const [dyeingOrder, rawYarnBalance] = await Promise.all([
            classUserServices.findDataIfExist('dyeing_orders', {
                dyeing_order: trimmedOrderNo,
                yarn_type: trimmedYarnType
            }),
            classUserServices.findDataIfExist('raw-yarn-balance', {
                yarn_type: trimmedYarnType
            })
        ]);

        if (type === 'Total Rcv Qty') {
            await classUserServices.updateData(
                { yarn_type: trimmedYarnType },
                { $inc: { quantity: issueQty } },
                'raw-yarn-balance'
            );
        }

        if (type === 'Total Issue Qty') {
            if (!dyeingOrder) {
                return res.send({ message: "Dyeing order not found. Maybe it's not inserted.", type: "error" });
            }

            await classUserServices.updateData(
                { pi_no: Number(dyeingOrder.pi_no) },
                { $inc: { total_raw_issue: issueQty } },
                'pi_wise_report'
            );

            if (rawYarnBalance) {
                await classUserServices.updateData(
                    { yarn_type: trimmedYarnType },
                    { $inc: { quantity: -issueQty } },
                    'raw-yarn-balance'
                );
            }
        }

        const insertResult = await classUserServices.insertToTheDatabase(req.body, 'raw-issue');
        if (!insertResult) {
            return res.send({ message: 'Failed to insert raw yarn data', type: 'error' });
        }

        return res.status(200).json({ message: 'Raw yarn balance updated', type: 'success' });

    } catch (err) {
        console.error('[update-raw-yarn] Error:', err.message);
        return res.send({ message: 'Server error', type: 'error' });
    }
});




module.exports = issueRoutes;
const express = require('express');
const router = express.Router();
const { transfer } = require('../controllers/transactionController');

router.post('/transfer', async (req, res) => {
    try {
        const { fromAccountId, toAccountId, amount } = req.body;
        const result = await transfer(fromAccountId, toAccountId, amount);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router; 
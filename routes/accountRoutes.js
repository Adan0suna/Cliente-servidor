const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const { transfer } = require('../controllers/transactionController');

// Crear una nueva cuenta
router.post('/accounts', async (req, res) => {
    try {
        const { accountNumber, owner, balance } = req.body;
        const account = new Account({
            accountNumber,
            owner,
            balance
        });
        await account.save();
        res.status(201).json(account);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener todas las cuentas
router.get('/accounts', async (req, res) => {
    try {
        const accounts = await Account.find();
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Realizar una transferencia
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
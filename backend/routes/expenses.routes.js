const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenses.controller')

router.post('/',expenseController.addExpense);
router.get('/',expenseController.getExpenses);
router.get('/total',expenseController.getTotalExpenses);


module.exports = router;
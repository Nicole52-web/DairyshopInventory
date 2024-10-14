const express = require('express');
const { createExpensesEntry, getAllExpenses } = require('../Controller/expensesController');
const ExpensesRouter = express.Router();

ExpensesRouter.post('/create', createExpensesEntry);
ExpensesRouter.get('/getAll', getAllExpenses);



module.exports = ExpensesRouter;
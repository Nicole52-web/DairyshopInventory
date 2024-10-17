const express = require('express');
const { createExpensesEntry, getAllExpenses, getExpenseById, updateExpense, deleteExpense } = require('../Controller/expensesController');
const ExpensesRouter = express.Router();

ExpensesRouter.post('/create', createExpensesEntry);
ExpensesRouter.get('/getAll', getAllExpenses);
ExpensesRouter.get('/:id',getExpenseById);
ExpensesRouter.put('/update/:id',updateExpense);
ExpensesRouter.delete('/delete/:id',deleteExpense)



module.exports = ExpensesRouter;
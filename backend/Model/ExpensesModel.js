const mongoose = require('mongoose');

const ExpensesSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
    }
}, {timestamps: true})

const Expenses = mongoose.model('Expenses', ExpensesSchema);

module.exports = Expenses;
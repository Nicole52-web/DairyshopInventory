const Expenses = require("../Model/ExpensesModel");


const createExpensesEntry = async (req,res) => {
    try {
        const {date,name, amount} = req.body;

        const expenses = new Expenses({
            date,
            name,
            amount
        })

        await expenses.save()
        res.status(201).json({message: "Entry created Successfully", expenses})
    } catch (error) {
        res.status(500).json({message: "Error creating entry", entry});
    }
}

const getAllExpenses = async (req,res) => {
    try {
        const expensesEntries = await Expenses.find();
        res.status(200).json(expensesEntries);
    } catch (error) {
        res.status(500).json({message: "Error retrieving entries"});
    }
}

module.exports= {createExpensesEntry, getAllExpenses}
const Expenses = require("../Model/ExpensesModel");


const createExpensesEntry = async (req, res) => {
    try {
      const { date, name, amount } = req.body;
  
      if (!date || !name || typeof amount !== 'number') {
        return res.status(400).json({ message: "Invalid input, please provide a valid date, name, and amount" });
      }
  
      const expenses = new Expenses({
        date,
        name,
        amount
      });
  
      await expenses.save();
      res.status(201).json({ message: "Entry created successfully", expenses });
    } catch (error) {
      res.status(500).json({ message: "Error creating entry" });
    }
  };


const getAllExpenses = async (req,res) => {
    try {
        const expensesEntries = await Expenses.find();
        res.status(200).json(expensesEntries);
    } catch (error) {
        res.status(500).json({message: "Error retrieving entries"});
    }
}

const getExpenseById = async (req,res) => {
    try {
        const expense = await Expenses.findById(req.params.id);
        if(!expense){
            return res.status(404).json({message: "Expense record not found"})
        }
        res.status(200).json(expense)
    } catch (error) {
        res.status(500).json({message: "Error retrieving record"});
    }
}

const updateExpense = async (req, res) => {
  try {
    const { date, name, amount } = req.body;

    if (!date || !name || typeof amount !== 'number') {
      return res.status(400).json({ message: "Invalid input, please provide a valid date, name, and amount" });
    }

    const expense = await Expenses.findByIdAndUpdate(
      req.params.id,
      { date, name, amount },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense updated successfully", expense });
  } catch (error) {
    res.status(500).json({ message: "Error updating expense entry" });
  }
};

const deleteExpense = async (req,res) => {
    try {
        const expense = await Expenses.findByIdAndDelete(req.params.id);
        if(!expense){
            return res.status(404).json({message: "Expense entry not found"})
        }
        res.status(200).json({message: "Expense entry deleted successfully!"})
    } catch (error) {
        res.status(500).json({message: "Error deleting expense entry"})
    }
}

module.exports= {createExpensesEntry, getAllExpenses, getExpenseById, updateExpense, deleteExpense}
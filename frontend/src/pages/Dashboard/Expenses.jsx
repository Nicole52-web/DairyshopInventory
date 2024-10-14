import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';

const Expenses = () => {

    const [expenses, setExpenses] = useState ([]);
    const [isModalOpen, setIsModalOpen] = useState([false]);
    const [newExpense, setNewExpense] = useState({date: '',name: '', amount: 0});
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/expenses/getAll');
            setExpenses(response.data);
            calculateTotal(response.data)
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    }

    useEffect(() => {
        fetchExpenses();
    }, []);

    const calculateTotal = (expenses) => {
        const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        setTotalAmount(total);
      };

      const handleAddExpense = () => {
        setIsModalOpen(true);
      };
    
      const handleSaveExpense = async () => {
        try {
          const response = await axios.post('http://localhost:8000/api/expenses/create', newExpense);
          setExpenses([...expenses, response.data.expenses]);
          calculateTotal([...expenses, response.data.expenses]);
          setIsModalOpen(false);
          setNewExpense({ date: '', name: '', amount: 0 });
        } catch (error) {
          console.error('Error saving expense:', error);
        }
      };

      useEffect(() =>{
        setTimeout(() =>{
            setLoading(false)
        },1000)
      }, [])




  return (
    <div>
      {loading ? (
        <Loading/>
      ) : <div className="container mx-auto mt-10 p-5">
      <h1 className="text-2xl font-bold mb-5">Expenses Tracker</h1>

      {expenses.length === 0 ? (
        <div>
          <p>No expenses available</p>
          <button
            onClick={handleAddExpense}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add Expense
          </button>
        </div>
      ) : (
        <div>
          <table className="table-auto border-collapse border border-gray-400 w-full mb-5">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-4 py-2">{expense.name}</td>
                  <td className="border border-gray-300 px-4 py-2">Ksh{expense.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="font-bold">
            <p>Total Amount: Ksh{totalAmount}</p>
          </div>

          <button
            onClick={handleAddExpense}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-5"
          >
            Add Expense
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add Expense</h2>

            <label className="block mb-2">Date:</label>
            <input
              type="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2">Name:</label>
            <input
              type="text"
              value={newExpense.name}
              onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2">Amount:</label>
            <input
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) })}
              className="w-full p-2 border rounded mb-3"
            />

            <div className="flex justify-end">
              <button
                onClick={handleSaveExpense}
                className="bg-green-500 text-white py-2 px-4 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
      }
    </div>
  )
}

export default Expenses

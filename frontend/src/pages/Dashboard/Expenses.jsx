import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useUserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';

const Expenses = () => {

    const [expenses, setExpenses] = useState ([]);
    const [isModalOpen, setIsModalOpen] = useState([false]);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [newExpense, setNewExpense] = useState({date: '',name: '', amount: 0});
    const [expenseToUpdate, setExpenseToUpdate] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [filterMonth, setFilterMonth] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const { user } = useUserContext();

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('https://dairyshop-inventory-api.vercel.app/api/expenses/getAll');
            setExpenses(response.data);
            calculateTotal(response.data)
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    }

    const handleDelete = async (id) => {
      if (window.confirm('Are you sure you want to delete this entry?')) {
          try {
              await axios.delete(`https://dairyshop-inventory-api.vercel.app/api/expenses/delete/${id}`);
              fetchExpenses();
          } catch (error) {
              console.error('Error deleting entry:', error)
          }
      }
    };

    const handleDownloadPDF = () => {
      const doc = new jsPDF();

      doc.text('Expenses Report Table',14,15);

      const tableColumn = [
        "Date",
        "Name",
        "Amount"
      ];

      
    // Filter records by selected month if a filter is applied
    const filteredEntries = filterMonth
    ? expenses.filter((entry) => {
        const entryDate = new Date(entry.date);
        const formattedMonth = `${entryDate.getMonth() + 1}/${entryDate.getFullYear()}`;
        return formattedMonth.includes(filterMonth);
      })
    : expenses;

  const tableRows = filteredEntries.map((entry) => [
    new Date(entry.date).toLocaleDateString(),
        entry.name,
        entry.amount
  ]);


      doc.autoTable({
        head:[tableColumn],
        body: tableRows,
        startY: 22
      });

      doc.save(`expenses_report_${filterMonth}_records.pdf`);
    }

    const filteredExpenses = searchQuery 
  ? expenses.filter((entry) => {
      const entryDate = new Date(entry.date);
      const formattedDate = entryDate.toLocaleDateString();
      const formattedMonth = `${entryDate.getMonth() + 1}/${entryDate.getFullYear()}`;

      return (
        formattedDate.includes(searchQuery) ||
        formattedMonth.includes(searchQuery)
      );
    })
  : expenses; // If there's no search query, display all records


    useEffect(() => {
        fetchExpenses();
    }, []);

    const calculateTotal = (expenses) => {
      if (!expenses || expenses.length === 0) return;
    
      const total = expenses.reduce((acc, expense) => {
        if (expense && typeof expense.amount === 'number') {
          return acc + expense.amount;
        } else {
          console.warn('Expense amount is undefined', expense); // Log which expense is causing the issue
          return acc;
        }
      }, 0);
    
      setTotalAmount(total);
    };
    
    
      const handleAddExpense = () => {
        setIsModalOpen(true);
      };
    
      const handleSaveExpense = async () => {
        try {
          const response = await axios.post('https://dairyshop-inventory-api.vercel.app/api/expenses/create', newExpense);
          setExpenses([...expenses, response.data.expenses]);
          calculateTotal([...expenses, response.data.expenses]);
          setIsModalOpen(false);
          setNewExpense({ date: '', name: '', amount: 0 });
        } catch (error) {
          console.error('Error saving expense:', error);
        }
      };

      const handleOpenUpdateModal = (expense) => {
        setExpenseToUpdate(expense);
        // Convert the date to the format "yyyy-MM-dd" for the date input
        const formattedDate = expense.date ? new Date(expense.date).toISOString().slice(0, 10) : '';
        
        setNewExpense({
            date: formattedDate, // Properly formatted date
            name: expense.name || '',
            amount: expense.amount || 0,
        });
        setIsUpdateModalOpen(true);
    };
    
    const handleUpdateExpense = async () => {
      if (!expenseToUpdate) {
        console.error("No expense selected for update.");
        return;
      }
    
      try {
        // Log the expense being updated for debugging
        // console.log("Updating expense:", expenseToUpdate);
        // console.log("New expense data:", newExpense);
    
        // Send the updated expense to the backend
        const response = await axios.put(`https://dairyshop-inventory-api.vercel.app/api/expenses/update/${expenseToUpdate._id}`, newExpense);
    
        // // Log the response to ensure the backend returns the updated data
        // console.log("Backend response:", response.data);
    
        // Update the local expenses array with the updated expense
        const updatedExpenses = expenses.map(expense => 
          expense._id === expenseToUpdate._id ? response.data.expense : expense // Corrected response key to 'expense'
        );
    
        // Update state with the new expenses list and recalculate the total
        setExpenses(updatedExpenses);
        calculateTotal(updatedExpenses);
    
        // Close the modal and reset the form fields
        setIsUpdateModalOpen(false);
        setNewExpense({ date: '', name: '', amount: 0 });
    
      } catch (error) {
        console.error('Error updating expense:', error);
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

      {user?.role === 'admin' && (
        <>
        <button
        onClick={handleDownloadPDF}
        className='mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hoer:bg-green overflow-hidden'
        >
          Download PDF
        </button>
        </>
      )}

      <input
      type='text'
      placeholder='Search by date (dd/mm/yyyy) or month (mm/yyyy)'
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className='mb-4 px-4 py-2 border rounded-lg w-full'
      />

      <input
                  type="text"
                  placeholder="Filter by month (mm/yyyy) for download"
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="mb-4 px-4 py-2 border rounded-lg w-full"
                />

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
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
  {filteredExpenses.map((expense, index) => (
    expense ? ( // Ensure expense is not undefined
      <tr key={index}>
        <td className="border border-gray-300 px-4 py-2">
          {expense.date ? new Date(expense.date).toLocaleDateString() : 'N/A'}
        </td>
        <td className="border border-gray-300 px-4 py-2">{expense.name || 'N/A'}</td>
        <td className="border border-gray-300 px-4 py-2">
          Ksh {expense.amount !== undefined ? expense.amount : 'N/A'} {/* Handle undefined amount */}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <button onClick={() => handleOpenUpdateModal(expense)} className="text-blue-600 hover:text-blue-900">
            Update
          </button>
          {user?.role === 'admin' && (
            <>
              |{' '}
              <button onClick={() => handleDelete(expense._id)} className="text-red-600 hover:text-red-900">
                Delete
              </button>
            </>
          )}
        </td>
      </tr>
    ) : (
      <tr key={index}><td colSpan="4">Expense is undefined</td></tr>
    )
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
      
      {isUpdateModalOpen && expenseToUpdate && (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-5 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Update Expense</h2>
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
                <button onClick={handleUpdateExpense} className="bg-green-500 text-white py-2 px-4 rounded mr-2">
                    Update
                </button>
                <button onClick={() => setIsUpdateModalOpen(false)} className="bg-red-500 text-white py-2 px-4 rounded">
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

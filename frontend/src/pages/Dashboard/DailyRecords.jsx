import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading';

const DailyRecords = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    date: '',
    till: '',
    deficit: '',
    surplus: '',
    sales: '',
    expenses: '',
    cash: '',
    coins: ''
  })

  const handleChange = (e) => {
    const {name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { date,till,deficit,surplus, sales, expenses, cash, coins}= formData;
   
  
    const dataToSend = {
      ...formData,
      date,
      till,
      deficit,
      surplus, 
      sales, 
      expenses, 
      cash, 
      coins
    };
  

    console.log('Sending data to server: ', dataToSend);

    try {
      await axios.post('http://localhost:8000/api/dailyreport/create', dataToSend);
      alert('Dailyreport entry created successfully!');


      //clear form after successful submission

      setFormData({
        date: '',
        till: '',
        deficit: '',
        surplus: '',
        sales: '',
        expenses: '',
        cash: '',
        coins: ''
      })
    } catch (error) {
      console.error('Error creating Daily Report entry', error);
      alert('Error creating Daily Report entry.');
    }
  }


  useEffect(() =>{
    setTimeout(() =>{
      setLoading(false)
    }, 1000)
  }, []);
  return (
    <div>
      {loading ? (
        <Loading/>
      ) :  <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Daily Report Entry Entry</h2>

      <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            placeholder='Enter date DD/MM/YY'
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

      <div className="mb-4">
        <label htmlFor="till" className="block text-sm font-medium text-gray-700">Till</label>
        <input
          type="number"
          name="till"
          placeholder='expected till amount'
          value={formData.till}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="deficit" className="block text-sm font-medium text-gray-700">Deficit</label>
        <input
          type="number"
          name="deficit"
          placeholder="amount short"
          value={formData.deficit}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="surplus" className="block text-sm font-medium text-gray-700">Surplus</label>
        <input
          type="number"
          name="surplus"
          placeholder="amount in excess"
          value={formData.surplus}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="sales" className="block text-sm font-medium text-gray-700">Sales</label>
        <input
          type="number"
          name="sales"
          placeholder="total amount of mursik and fresh"
          value={formData.sales}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="expenses" className="block text-sm font-medium text-gray-700">Expenses</label>
        <input
          type="number"
          name="expenses"
          placeholder="total expenses"
          value={formData.expenses}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="cash" className="block text-sm font-medium text-gray-700">Cash</label>
        <input
          type='number'
          name="cash"
          placeholder="expected cash"
          value={formData.cash}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="coins" className="block text-sm font-medium text-gray-700">Coins</label>
        <input
          type='number'
          name="coins"
          placeholder="today's coins"
          value={formData.coins}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Entry
      </button>
    </form>}
    </div>
  )
}

export default DailyRecords

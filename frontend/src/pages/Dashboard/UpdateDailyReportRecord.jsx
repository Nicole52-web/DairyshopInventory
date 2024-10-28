import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';

const UpdateDailyReportRecord = () => {
    const { id } = useParams();  // Extract ID from the URL
  const navigate = useNavigate(); // To redirect after updating
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    date: '',
    till: '',
    deficit: '',
    surplus: '',
    sales: '',
    expenses: '',
    cash: '',
    coins: '',
    toBank: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://dairyshop-inventory-api.vercel.app/api/dailyreport/${id}`);
        setFormData(response.data); // Pre-fill the form with existing data
      } catch (error) {
        console.error('Error fetching entry data', error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://dairyshop-inventory-api.vercel.app/api/dailyreport/update/${id}`, formData);
      alert('Entry updated successfully!');
      navigate('/dashboard/dailyreportrecords'); // Redirect back to the records page
    } catch (error) {
      console.error('Error updating entry', error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
        setLoading(false)
    }, 1000)
  }, []);

  return (
    <div>
      {loading ? (
        <Loading/>
      ) :  <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Daily Report Entry Entry</h2>

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

      <div className="mb-4">
        <label htmlFor="toBank" className="block text-sm font-medium text-gray-700">To Bank</label>
        <input
          type='number'
          name="toBank"
          placeholder="Cash to Bank"
          value={formData.toBank}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Update Entry
      </button>
    </form>}
    </div>
  )
}

export default UpdateDailyReportRecord

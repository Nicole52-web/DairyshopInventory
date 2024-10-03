import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FreshRecords = () => {
  const [loading, setLoading] = useState(true);
  const [milkEntries, setMilkEntries] = useState([]);

  const fetchMilkEntries = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/fresh/getAll');
      setMilkEntries(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
        try {
            await axios.delete(`http://localhost:8000/api/fresh/delete/${id}`);
            fetchMilkEntries();
        } catch (error) {
            console.error('Error deleting entry:', error)
        }
    }
  };
  

  useEffect(() => {
    fetchMilkEntries();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-4 flex flex-col justify-start sm:pt-8">
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Fresh Milk Records</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supply (Litres)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cost</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Litres Sold</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Per Litre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {milkEntries.map((entry) => (
                  <tr key={entry._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.supply}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.totalCost}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.litresSold}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.litreCost}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.remarks}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <Link to={`/dashboard/updatefresh/${entry._id}`} className="text-blue-600 hover:text-blue-900">
                        Update
                        </Link>{' '}
                        |{' '}
                        <button onClick={ () => handleDelete(entry._id)} className="text-red-600 hover:text-red-900">
                            Delete
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreshRecords;

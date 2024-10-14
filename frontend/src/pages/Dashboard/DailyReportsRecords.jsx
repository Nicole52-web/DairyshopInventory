import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DailyReportsRecords = () => {
    const [loading, setLoading] = useState(true);
  const [reportEntries, setReportEntries] = useState([]);

  const fetchReportEntries = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/dailyreport/getAll');
      setReportEntries(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
        try {
            await axios.delete(`http://localhost:8000/api/dailyreport/delete/${id}`);
            fetchReportEntries();
        } catch (error) {
            console.error('Error deleting entry:', error)
        }
    }
  };
  

  useEffect(() => {
    fetchReportEntries();
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
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Daily Report Records</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Till</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deficit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Surplus</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expenses</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cash</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coins</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportEntries.map((entry) => (
                  <tr key={entry._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.till}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.deficit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.surplus}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.sales}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.expenses}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.cash}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.coins}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <Link to={`/dashboard/updatedailyreport/${entry._id}`} className="text-blue-600 hover:text-blue-900">
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
  )
}

export default DailyReportsRecords

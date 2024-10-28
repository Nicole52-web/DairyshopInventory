import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const DailyReportsRecords = () => {
  const [loading, setLoading] = useState(true);
  const [reportEntries, setReportEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const { user } = useUserContext();

  const fetchReportEntries = async () => {
    try {
      const response = await axios.get('https://dairyshop-inventory-api.vercel.app/api/dailyreport/getAll');
      setReportEntries(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await axios.delete(`https://dairyshop-inventory-api.vercel.app/api/dailyreport/delete/${id}`);
        fetchReportEntries();
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Daily Report Records', 14, 16);

    const tableColumn = [
      'Date',
      'Till',
      'Deficit',
      'Surplus',
      'Sales',
      'Expenses',
      'Cash',
      'Coins',
    ];

    // Filter records by selected month if a filter is applied
    const filteredEntries = filterMonth
      ? reportEntries.filter((entry) => {
          const entryDate = new Date(entry.date);
          const formattedMonth = `${entryDate.getMonth() + 1}/${entryDate.getFullYear()}`;
          return formattedMonth.includes(filterMonth);
        })
      : reportEntries;

    const tableRows = filteredEntries.map((entry) => [
      new Date(entry.date).toLocaleDateString(),
      entry.till,
      entry.deficit,
      entry.surplus,
      entry.sales,
      entry.expenses,
      entry.cash,
      entry.coins,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 22,
    });

    doc.save(`daily_report_${filterMonth}_records.pdf`);
  };

  const filteredReports = searchQuery
    ? reportEntries.filter((entry) => {
        const entryDate = new Date(entry.date);
        const formattedDate = entryDate.toLocaleDateString();
        const formattedMonth = `${entryDate.getMonth() + 1}/${entryDate.getFullYear()}`;
        return (
          formattedDate.includes(searchQuery) || formattedMonth.includes(searchQuery)
        );
      })
    : reportEntries;

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

          {user?.role === 'admin' && (
            <>
              <button
                onClick={handleDownloadPDF}
                className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Download PDF
              </button>
            </>
          )}

          <input
            type="text"
            placeholder="Search by date (dd/mm/yyyy) or month (mm/yyyy)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 px-4 py-2 border rounded-lg w-full"
          />

          <input
            type="text"
            placeholder="Filter by month (mm/yyyy) for download"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="mb-4 px-4 py-2 border rounded-lg w-full"
          />

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Till
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deficit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Surplus
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expenses
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cash
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coins
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    To Bank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((entry) => (
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.toBank}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <Link to={`/dashboard/updatedailyreport/${entry._id}`} className="text-blue-600 hover:text-blue-900">
                        Update
                      </Link>{' '}
                      {user?.role === 'admin' && (
                        <>
                          |{' '}
                          <button
                            onClick={() => handleDelete(entry._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </>
                      )}
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

export default DailyReportsRecords;

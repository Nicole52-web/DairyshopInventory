import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const MursikRecords = () => {
  const [loading, setLoading] = useState(true);
  const [mursikEntries, setMursikEntries] = useState([]);

  const { user } = useUserContext();

  const fetchMursikEntries = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/mursik/getAll');
      // Ensure the data is an array
      if (Array.isArray(response.data.mursikEntries)) {
        setMursikEntries(response.data.mursikEntries);
      } else {
        console.error('Unexpected response format:', response.data);
        setMursikEntries([]);
      }
    } catch (error) {
      console.error('Error fetching data', error);
      setMursikEntries([]); // Fallback to an empty array in case of error
    }
  };


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
        try {
            await axios.delete(`http://localhost:8000/api/mursik/delete/${id}`);
            fetchMursikEntries();
        } catch (error) {
            console.error('Error deleting entry:', error)
        }
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.text('Mursik Records', 14,16);

    const tableColumn = [
      "Date", 
      "Supply (Litres)", 
      "Price", 
      "Total Cost", 
      "Litres Sold", 
      "Cost Per Litre", 
      "Amount", 
      "Remarks"
    ];

    const tableRows = mursikEntries.map(entry => ([
      new Date(entry.date).toLocaleDateString(),
      entry.supply,
      entry.price,
      entry.totalCost,
      entry.litresSold,
      entry.litreCost,
      entry.amount,
      entry.remarks
    ]));


    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 22
    });

    doc.save('mursik_records.pdf');
  }


  useEffect(() => {
    fetchMursikEntries();
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
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Mursik Records</h2>

          { user?.role === 'admin' && (
            <>
            <button
            onClick={handleDownloadPDF}
            className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Download PDF
          </button>
            </>
          )}

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
                {mursikEntries.length > 0 ? (
                  mursikEntries.map((entry) => (
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
                        <Link to={`/dashboard/updatemursik/${entry._id}`} className="text-blue-600 hover:text-blue-900">
                        Update</Link>{' '}
                      {/* Show Delete button only if user is an admin */}
                      {user?.role === 'admin' && (
                        <>
                          |{' '}
                          <button onClick={() => handleDelete(entry._id)} className="text-red-600 hover:text-red-900">
                            Delete
                          </button>
                        </>
                      )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MursikRecords;

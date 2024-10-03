import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';

const UpdateFreshRecord = () => {
    const { id } = useParams();  // Extract ID from the URL
  const navigate = useNavigate(); // To redirect after updating
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    date: '',
    supply: '',
    price: '',
    litresSold: '',
    litreCost: '',
    remarks: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/fresh/${id}`);
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
      await axios.put(`http://localhost:8000/api/fresh/update/${id}`, formData);
      alert('Entry updated successfully!');
      navigate('/dashboard/freshrecords'); // Redirect back to the records page
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {loading ? (
        <Loading/>
      ) : (
        <form className="bg-white p-6 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Fresh Milk Record</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Supply (Litres)</label>
          <input
            type="number"
            name="supply"
            value={formData.supply}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Litres Sold</label>
          <input
            type="number"
            name="litresSold"
            value={formData.litresSold}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cost Per Litre</label>
          <input
            type="number"
            name="litreCost"
            value={formData.litreCost}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Remarks</label>
          <input
            type="text"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Update Entry
        </button>
      </form>
      )}
    </div>
  )
}

export default UpdateFreshRecord

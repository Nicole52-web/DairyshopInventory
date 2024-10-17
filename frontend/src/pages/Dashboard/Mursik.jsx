import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import axios from 'axios';

const Mursik = () => {

    const [loading, setLoading]= useState(true);
    const [formData, setFormData] = useState({
      date: '',
      supply: '',
      price: '',
      litresSold: '',
      litreCost: '',
      remarks: ''
    })
  
  
    const handleChange = (e) => {
      const {name, value } = e.target;
  
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const { date, supply, price, litresSold, litreCost, remarks}= formData;
      const totalCost = Number(supply) * Number(price);
      const amount = Number(litresSold) * Number(litreCost);
    
      const dataToSend = {
        ...formData,
        supply: Number(supply),
        price: Number(price),
        litresSold: Number(litresSold),
        litreCost: Number(litreCost),
        remarks:Number(remarks),
        totalCost,
        amount
      };
    
  
      console.log('Sending data to server: ', dataToSend);
  
      try {
        await axios.post('http://localhost:8000/api/mursik/create', dataToSend);
        alert('Mursik entry created successfully!');
  
  
        //clear form after successful submission
  
        setFormData({
          date:'',
          supply: '',
          price: '',
          litresSold: '',
          litreCost: '',
          remarks: ''
        })
      } catch (error) {
        console.error('Error creating Mursik entry', error);
        alert('Error creating Mursik entry.');
      }
    }
  

    useEffect (() =>{
        setTimeout (() =>{
            setLoading(false);
        }, 1000)
    }, [])
  return (
    <div>
        {loading ? (
            <Loading/>
        ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Mursik Entry</h2>
  
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
          <label htmlFor="supply" className="block text-sm font-medium text-gray-700">Supply (Litres)</label>
          <input
            type="number"
            name="supply"
            placeholder="Supply in Litres"
            value={formData.supply}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price per Litre</label>
          <input
            type="number"
            name="price"
            placeholder="Supplier price per Litre"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="litresSold" className="block text-sm font-medium text-gray-700">Litres Sold</label>
          <input
            type="number"
            name="litresSold"
            placeholder="Litres Sold"
            value={formData.litresSold}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="litreCost" className="block text-sm font-medium text-gray-700">Litre Cost</label>
          <input
            type="number"
            name="litreCost"
            placeholder="Cost per Litre"
            value={formData.litreCost}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
          <input
            type='number'
            name="remarks"
            placeholder="Mursik Left in Litres"
            value={formData.remarks}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
  
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Entry
        </button>
      </form>
        )}
    </div>
  )
}

export default Mursik

import React from 'react'
import Navbar from '../components/Navbar'
import HomeImage from '../images/home.jpg'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${HomeImage})` }}>
      <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
        <div className="text-center text-white p-6 bg-opacity-80 rounded-lg">
          {/* <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
          <p className="text-lg">Savor the Creaminess of Nature’s Best</p> */}
<div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${HomeImage})`  }}>
      <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
        <div className="text-center text-white p-6 bg-opacity-80 rounded-lg">
          <h1 className="text-4xl font-bold mb-4">Welcome to Onyx Dairy Point of Sale</h1>
          <p className="text-lg">Pure Dairy Delight, Right from Our Farm to Your Table</p>
          </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Home

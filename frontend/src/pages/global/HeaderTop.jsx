import React from 'react';
import Nav from '../../images/on.png';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const HeaderTop = () => {
  const { handleFetchMe, user } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/logout",
        {},
        {
          withCredentials: true,  // Ensure cookies are sent with the request
        }
      );

      Swal.fire({
        icon: "success",
        title: "Logout...",
        text: response?.data?.message,
      });

      handleFetchMe();  // Refresh user state or perform any other action after logout
      navigate('/');
    } catch (error) {
      console.error("Error during logout: ", error.message);  // Detailed error logging
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md flex justify-between items-center p-4">
      <div className="flex items-center space-x-4">
        {/* Logo Section */}
        <img src={Nav} alt="Company Logo" className="h-12 w-12 rounded-full shadow-lg" />
        <span className="text-2xl font-bold tracking-wide">Onyx Dairies</span>
      </div>
      <div className="flex items-center space-x-6">
        {/* Optional: Display user info */}
        {user && <span className="hidden sm:block font-medium text-lg">{`Hello, ${user.name}`}</span>}
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default HeaderTop;

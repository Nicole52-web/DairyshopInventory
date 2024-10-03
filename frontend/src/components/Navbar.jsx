import React, { useState } from 'react';
import Nav from '../images/on.png';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons
import { useUserContext } from '../context/UserContext';
import { useNavigate, NavLink } from 'react-router-dom'; // Import NavLink

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDashboardClick = (e) => {
    e.preventDefault();
  
    if (user && user._id) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Nav} className="h-16 w-16" alt="Onyx Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Onyx Dairies</span>
        </a>

        <button onClick={toggleMenu} className="md:hidden">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 md:p-0 text-blue-700" // Active link style
                    : "block py-2 px-3 md:p-0 text-gray-900 hover:text-blue-700 hover:bg-transparent dark:text-white md:hover:text-blue-500"
                }
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 md:p-0 text-blue-700" // Active link style
                    : "block py-2 px-3 md:p-0 text-gray-900 hover:text-blue-700 hover:bg-transparent dark:text-white md:hover:text-blue-500"
                }
              >
                Sign Up
              </NavLink>
            </li>
            
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 md:p-0 text-blue-700" // Active link style
                    : "block py-2 px-3 md:p-0 text-gray-900 hover:text-blue-700 hover:bg-transparent dark:text-white md:hover:text-blue-500"
                }
              >
                Log In
              </NavLink>
            </li>
            
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 md:p-0 text-blue-700" // Active link style
                    : "block py-2 px-3 md:p-0 text-gray-900 hover:text-blue-700 hover:bg-transparent dark:text-white md:hover:text-blue-500"
                }
                onClick={handleDashboardClick}
              >
                Dashboard
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

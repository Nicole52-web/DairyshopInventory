import React from 'react'; 
import { FaLeaf, FaBook, FaMoneyBillWave } from 'react-icons/fa'; // Import icons
import { LuMilk } from 'react-icons/lu';
import { LiaClipboardListSolid } from "react-icons/lia";
import { NavLink } from 'react-router-dom'; // Use NavLink

const SideBar = () => {
  return (
    <aside className="bg-gradient-to-b from-blue-400 to-blue-600 text-white w-64 h-screen p-6 shadow-lg overflow-y-auto"> {/* Added 'overflow-y-auto' for scrollable sidebar */}
      <h2 className="text-3xl font-semibold mb-8 text-center">Onyx Menu</h2>
      <ul className="space-y-6">
        <li>
          <NavLink
            to="/dashboard/fresh"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center space-x-4 p-3 rounded-lg bg-white text-blue-600'
                : 'flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-500 transition-all duration-300'
            }
          >
            <FaLeaf className="text-green-400" />
            <span className="text-lg">Fresh Entry</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/freshrecords"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center space-x-4 p-3 rounded-lg bg-white text-blue-600'
                : 'flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-500 transition-all duration-300'
            }
          >
            <LiaClipboardListSolid className="text-green-400" />
            <span className="text-lg">Fresh Records</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/mursik"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center space-x-4 p-3 rounded-lg bg-white text-blue-600'
                : 'flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-500 transition-all duration-300'
            }
          >
            <LuMilk className="text-blue-400" />
            <span className="text-lg">Mursik Entry</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/mursikrecords"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center space-x-4 p-3 rounded-lg bg-white text-blue-600'
                : 'flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-500 transition-all duration-300'
            }
          >
            <LiaClipboardListSolid className="text-blue-400" />
            <span className="text-lg">Mursik Records</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/dailyrecords"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center space-x-4 p-3 rounded-lg bg-white text-blue-600'
                : 'flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-500 transition-all duration-300'
            }
          >
            <FaBook className="text-yellow-400" />
            <span className="text-lg">Daily Reports Entry</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/dailyreportrecords"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center space-x-4 p-3 rounded-lg bg-white text-blue-600'
                : 'flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-500 transition-all duration-300'
            }
          >
            <LiaClipboardListSolid className="text-yellow-400" />
            <span className="text-lg">Daily Reports Records</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/expenses"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center space-x-4 p-3 rounded-lg bg-white text-blue-600'
                : 'flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-500 transition-all duration-300'
            }
          >
            <FaMoneyBillWave className="text-red-400" />
            <span className="text-lg">Debts and Expenses</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;

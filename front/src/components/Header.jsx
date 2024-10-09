// src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../assets/ThemeToggle';

const Header = ({ children, title }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 shadow-lg flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold tracking-wide">{title}</div>
        {children}
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;

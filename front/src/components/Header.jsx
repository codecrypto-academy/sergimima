// src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Mi Aplicación</div>
      <div className="flex items-center">
        {children}
        <button
          onClick={handleLogout}
          className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;

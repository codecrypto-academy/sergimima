// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../assets/ThemeToggle';
import { ethers } from 'ethers';

const ethereum = window.ethereum;

const Header = ({ children, title }) => {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (ethereum) {
      ethereum.request({ method: 'eth_requestAccounts' }).then(addresses => {
        setAddress(addresses[0]);
        ethereum.on("accountsChanged", (addresses) => {
          setAddress(addresses[0]);
        });
      });
    } else {
      console.log("Please install MetaMask!");
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 dark:bg-gray-900 text-white p-4 shadow-lg flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold tracking-wide">{title}</div>
        {children}
      </div>
      <div className="flex items-center space-x-4">
        <p>{address}</p>
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

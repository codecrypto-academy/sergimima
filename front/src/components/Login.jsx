// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: username,
        password,
        role,
      });

      if (response.status === 200) {
        console.log('Logged in successfully:', response.data);
        localStorage.setItem('isAuthenticated', 'true');
        setError(''); // Clear any previous error
        navigate('/admin');
      } else {
        setError('Login failed. Please check your credentials and try again.');
        console.log('Login failed:', response.data);
      }
    } catch (error) {
      setError('Error during login. Please try again later.');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-slate-800">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700 dark:text-gray-100">Login</h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-600 dark:text-gray-300 text-sm font-bold mb-2">Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 dark:text-gray-300 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 dark:text-gray-300 text-sm font-bold mb-2">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select your role</option>
            <option value="Admins">Admin</option>
            <option value="Productores">Productor</option>
            <option value="Almacenes">Almacen</option>
            <option value="Distribuidores">Distribuidor</option>
            <option value="Minoristas">Minorista</option>
          </select>
        </div>
        
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

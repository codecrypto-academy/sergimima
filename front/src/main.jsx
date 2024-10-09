// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Admin from './components/organitzations/Admin';
import PrivateRoute from './components/PrivateRoute';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  </React.StrictMode>
);

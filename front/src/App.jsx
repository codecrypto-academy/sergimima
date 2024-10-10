// src/App.jsx
import React from 'react';
import Admin from './components/organitzations/Admin';
import Productor from './components/organitzations/Productor';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';import Login from './components/Login';

const App = () => {
  return (
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
        <Route path="/Productores" element={
          <PrivateRoute>
            <Productor producerId={localStorage.getItem('userId')} />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  </React.StrictMode>
  );
};

export default App;

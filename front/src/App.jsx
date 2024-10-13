// src/App.jsx
import React from 'react';
import Admin from './components/organitzations/Admin';
import Productor from './components/organitzations/Productor';
import Almacen from './components/organitzations/Almacen';
import Mayorista from './components/organitzations/Mayorista';
import Minorista from './components/organitzations/Minorista';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';import Login from './components/Login';
import Unauthorized from './components/Unauthorized';


const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/admin" element={
            <PrivateRoute allowedRoles={['Admins']}>
              <Admin />
            </PrivateRoute>
          } />
          <Route path="/Productores" element={
            <PrivateRoute allowedRoles={['Admins', 'Productores']}>
              <Productor producerId={localStorage.getItem('userId')} />
            </PrivateRoute>
          } />
          <Route path="/Almacenes" element={
            <PrivateRoute allowedRoles={['Admins', 'Almacenes']}>
              <Almacen almacenId={localStorage.getItem('userId')} />
            </PrivateRoute>
          } />
          <Route path="/Distribuidores" element={
            <PrivateRoute allowedRoles={['Admins', 'Distribuidores']}>
              <Mayorista distribuidorId={localStorage.getItem('userId')} />
            </PrivateRoute>
          } />
          <Route path="/Minoristas" element={
            <PrivateRoute allowedRoles={['Admins', 'Minoristas']}>
              <Minorista minoristaId={localStorage.getItem('userId')} />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

export default App;

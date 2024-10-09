// src/components/organitzations/Admin.jsx
import React from 'react';
import Header from '../Header';

const Admin = () => {
  return (
    <div>
      <Header>
        <div className="text-lg">Admin Dashboard</div>
      </Header>
      <div className="p-4">
        {/* Contenido específico de la página de Admin */}
        <h1 className="text-2xl font-bold">Bienvenido al panel de administración</h1>
      </div>
    </div>
  );
};

export default Admin;


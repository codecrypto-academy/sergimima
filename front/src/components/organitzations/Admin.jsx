// src/components/organitzations/Admin.jsx
import React, { useState } from 'react';
import Header from '../Header';
import WarehouseList from './adminComponents/AlmacenList';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('usuarios');

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'usuarios':
        return <div>Contenido de Gestión de Usuarios</div>;
      case 'productos':
        return <div>Contenido de Gestión de Productos</div>;
      case 'almacenes':
        return <WarehouseList />;
      case 'distribuidores':
        return <div>Contenido de Gestión de Distribuidores</div>;
      case 'minoristas':
        return <div>Contenido de Gestión de Minoristas</div>;
      default:
        return <div>Seleccione una sección</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Admin Dashboard">
        <nav className="flex items-center space-x-4">
          <button onClick={() => handleNavigation('usuarios')} className="text-white hover:text-gray-300">Gestión de Usuarios</button>
          <button onClick={() => handleNavigation('productos')} className="text-white hover:text-gray-300">Gestión de Productos</button>
          <button onClick={() => handleNavigation('almacenes')} className="text-white hover:text-gray-300">Gestión de Almacenes</button>
          <button onClick={() => handleNavigation('distribuidores')} className="text-white hover:text-gray-300">Gestión de Distribuidores</button>
          <button onClick={() => handleNavigation('minoristas')} className="text-white hover:text-gray-300">Gestión de Minoristas</button>
        </nav>
      </Header>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Bienvenido al panel de administración</h1>
        {renderSection()}
      </div>
    </div>
  );
};

export default Admin;

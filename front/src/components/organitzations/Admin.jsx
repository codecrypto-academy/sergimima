// src/components/organitzations/Admin.jsx
import React, { useState } from 'react';
import Header from '../Header';
import WarehouseList from './adminComponents/AlmacenList';
import ProductList from './adminComponents/ProductorList';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('usuarios');

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'usuarios':
        return <div>Gestión de Usuarios</div>;
      case 'productores':
        return <ProductList />;
      case 'productos':
        return <div>Gestión de Productos</div>;
      case 'almacenes':
        return <WarehouseList />;
      case 'distribuidores':
        return <div>Gestión de Distribuidores</div>;
      case 'minoristas':
        return <div>Gestión de Minoristas</div>;
      default:
        return <div>Seleccione una sección</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header title="Admin Dashboard">
        <nav className="flex items-center space-x-4">
          <button onClick={() => handleNavigation('usuarios')} className="text-white hover:text-gray-300">Usuarios</button>
          <button onClick={() => handleNavigation('productores')} className="text-white hover:text-gray-300">Productores</button>
          <button onClick={() => handleNavigation('almacenes')} className="text-white hover:text-gray-300">Almacenes</button>
          <button onClick={() => handleNavigation('distribuidores')} className="text-white hover:text-gray-300">Distribuidores</button>
          <button onClick={() => handleNavigation('minoristas')} className="text-white hover:text-gray-300">Minoristas</button>
          <button onClick={() => handleNavigation('productos')} className="text-white hover:text-gray-300">Productos</button>
        </nav>
      </Header>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-200 mb-6">Bienvenido al panel de administración</h1>
        {renderSection()}
      </div>
    </div>
  );
};

export default Admin;

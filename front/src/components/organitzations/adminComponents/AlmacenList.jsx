// src/components/WarehouseList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [newWarehouse, setNewWarehouse] = useState({ name: '', location: '' });

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/warehouse');
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/warehouse/${id}`);
      fetchWarehouses();
    } catch (error) {
      console.error('Error deleting warehouse:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:3001/warehouse', newWarehouse);
      setNewWarehouse({ name: '', location: '' });
      fetchWarehouses();
    } catch (error) {
      console.error('Error creating warehouse:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Gestión de Almacenes</h2>
      <ul className="mb-4">
        {warehouses.map((warehouse) => (
          <li key={warehouse.id} className="flex justify-between items-center mb-2 p-2 bg-white shadow rounded">
            <div>
              <p className="font-bold">{warehouse.name}</p>
              <p>{warehouse.location}</p>
            </div>
            <button
              onClick={() => handleDelete(warehouse.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Crear Nuevo Almacén</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={newWarehouse.name}
          onChange={(e) => setNewWarehouse({ ...newWarehouse, name: e.target.value })}
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={newWarehouse.location}
          onChange={(e) => setNewWarehouse({ ...newWarehouse, location: e.target.value })}
          className="mb-2 p-2 border rounded w-full"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Crear
        </button>
      </div>
    </div>
  );
};

export default WarehouseList;

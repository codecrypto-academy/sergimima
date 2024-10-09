import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WarehouseList = () => {
    const [warehouses, setWarehouses] = useState([]);
    const [newWarehouse, setNewWarehouse] = useState({ name: '', email: '', password: '', ubicacion: '', wallet_address: '' });
    const [showForm, setShowForm] = useState(false);
    useEffect(() => {
        fetchWarehouses();
    }, []);

    const fetchWarehouses = async () => {
        try {
            const response = await axios.get('http://localhost:3001/warehouse');
            console.log('Datos recibidos:', response.data); // Verifica los datos recibidos
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
            setNewWarehouse({ name: '', email: '', password: '', ubicacion: '', wallet_address: '' });
            fetchWarehouses();
        } catch (error) {
            console.error('Error creating warehouse:', error);
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-4">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">Gestión de Almacenes</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 text-white">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="px-4 py-2 text-left">Nombre</th>
                            <th className="px-4 py-2 text-left">Ubicación</th>
                            <th className="px-4 py-2 text-left">Wallet</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {warehouses.map((warehouse) => (
                            <tr key={warehouse.almacen_id} className="border-b border-gray-700">
                                <td className="px-4 py-2 font-bold">{warehouse.nombre}</td>
                                <td className="px-4 py-2">{warehouse.ubicacion}</td>
                                <td className="px-4 py-2">{warehouse.wallet_address}</td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleDelete(warehouse.almacen_id)}
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                onClick={() => setShowForm(!showForm)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mt-4"
            >
                {showForm ? 'Ocultar Formulario' : 'Crear Nuevo Almacén'}
            </button>
            {showForm && (
                <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-200 mb-2">Crear Nuevo Almacén</h3>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={newWarehouse.name}
                        onChange={(e) => setNewWarehouse({ ...newWarehouse, name: e.target.value })}
                        className="mb-2 p-2 border rounded w-full bg-gray-700 text-white"
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        value={newWarehouse.email}
                        onChange={(e) => setNewWarehouse({ ...newWarehouse, email: e.target.value })}
                        className="mb-2 p-2 border rounded w-full bg-gray-700 text-white"
                    />
                    <input
                        type="text"
                        placeholder="Password"
                        value={newWarehouse.password}
                        onChange={(e) => setNewWarehouse({ ...newWarehouse, password: e.target.value })}
                        className="mb-2 p-2 border rounded w-full bg-gray-700 text-white"
                    />
                    <input
                        type="text"
                        placeholder="Ubicación"
                        value={newWarehouse.ubicacion}
                        onChange={(e) => setNewWarehouse({ ...newWarehouse, ubicacion: e.target.value })}
                        className="mb-2 p-2 border rounded w-full bg-gray-700 text-white"
                    />
                    <input
                        type="text"
                        placeholder="Wallet Address"
                        value={newWarehouse.wallet_address}
                        onChange={(e) => setNewWarehouse({ ...newWarehouse, wallet_address: e.target.value })}
                        className="mb-2 p-2 border rounded w-full bg-gray-700 text-white"
                    />
                    <button
                        onClick={handleCreate}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Crear
                    </button>
                </div>
            )}
        </div>
    );
};

export default WarehouseList;

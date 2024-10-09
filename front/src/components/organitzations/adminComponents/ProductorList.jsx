// src/components/ProductorList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
  const ProductorList = () => {
    const [producers, setProducers] = useState([]);
    const [newProducer, setNewProducer] = useState({ nombre: '', email: '', password: '', ubicacion: '', wallet_address: '' });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
      fetchProducers();
    }, []);

    const fetchProducers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/produsers');
        setProducers(response.data);
      } catch (error) {
        console.error('Error fetching producers:', error);
      }
    };

    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:3001/produsers/${id}`);
        fetchProducers();
      } catch (error) {
        console.error('Error deleting producer:', error);
      }
    };

    const handleCreate = async () => {
      try {
        await axios.post('http://localhost:3001/produsers', newProducer);
        setNewProducer({ nombre: '', email: '', password: '', ubicacion: '',  wallet_address: '' });
        fetchProducers();
      } catch (error) {
        console.error('Error creating producer:', error);
      }
    };

    return (
      <div className="bg-gray-900 text-white min-h-screen p-4">
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Gestión de Productores</h2>
        <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Ubicación</th>
                <th className="px-4 py-2 text-left">Wallet</th>
                <th className="px-4 py-2 text-left">Creado</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
          </thead>
          <tbody>
          {producers.map((producer) => (
              <tr key={producer.productor_id} className="border-b border-gray-700">
                <td className="px-4 py-2 font-bold">{producer.nombre}</td>
                <td className="px-4 py-2">{producer.email}</td>
                <td className="px-4 py-2">{producer.ubicacion}</td>
                <td className="px-4 py-2">{producer.wallet_address}</td>
                <td className="px-4 py-2">{new Date(producer.creado_en).toLocaleDateString()}</td>
                <td className="px-4 py-2 text-center">
                  <ul>
                    {producer.products && producer.products.length > 0 ? (
                      producer.products.map((product) => (
                        <li key={product.product_id}>{product.product_name}</li>
                      ))
                    ) : (
                      <li>No products</li>
                    )}
                  </ul>
                  <button
                    onClick={() => handleDelete(producer.productor_id)}
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
          {showForm ? 'Ocultar Formulario' : 'Crear Nuevo Productor'}
        </button>

        {showForm && (
          <div className="mb-4 mt-4">
            <h3 className="text-xl font-semibold text-gray-200 mb-2">Crear Nuevo Productor</h3>
            <input
              type="text"
              placeholder="Nombre"
              value={newProducer.nombre}
              onChange={(e) => setNewProducer({ ...newProducer, nombre: e.target.value })}
              className="mb-2 p-2 border rounded w-full bg-gray-700 text-white"
            />
            <input
              type="text"
              placeholder="Email"
              value={newProducer.email}
              onChange={(e) => setNewProducer({ ...newProducer, email: e.target.value })}
              className="mb-2 p-2 border rounded w-full bg-gray-700 text-white"
            />
            <input
              type="text"
              placeholder="Password"
              value={newProducer.password}
              onChange={(e) => setNewProducer({ ...newProducer, password: e.target.value })}
              className="mb-2 p-2 border rounded w-full bg-gray-700 text-white"
            />
            <input
              type="text"
              placeholder="Ubicación"
              value={newProducer.ubicacion}
              onChange={(e) => setNewProducer({ ...newProducer, ubicacion: e.target.value })}
              className="mb-2 p-2 border rounded w-full bg-gray-700 text-white"
            />
            <input
              type="text"
              placeholder="Wallet Address"
              value={newProducer.wallet_address}
              onChange={(e) => setNewProducer({ ...newProducer, wallet_address: e.target.value })}
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
export default ProductorList;

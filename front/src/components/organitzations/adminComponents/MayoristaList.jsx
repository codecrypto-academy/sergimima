// src/components/ProductorList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

  const MayoristaList = ({ contract, registerOrganizationOnBlockchain }) => {
    const [wholesalers, setWholesalers] = useState([]);
    const [newWholesaler, setNewWholesaler] = useState({ nombre: '', email: '', password: '', ubicacion: '', wallet_address: '' });
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
      fetchWholesalers();
    }, []);

    const fetchWholesalers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/wholesalers');
        setWholesalers(response.data);
      } catch (error) {
        console.error('Error fetching producers:', error);
      }
    };

    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:3001/wholesalers/${id}`);
        fetchWholesalers();
      } catch (error) {
        console.error('Error deleting producer:', error);
      }
    };
    const handleCreate = async () => {
      try {
        setError(null);
        console.log("Iniciando creación de productor...");
        console.log("Datos del nuevo productor:", newWholesaler);
    /*
        // Primero, registra el productor en el contrato inteligente
        console.log("Intentando registrar en la blockchain...");
        try {
          await registerOrganizationOnBlockchain(newWholesaler.wallet_address);
          console.log("Productor registrado en la blockchain con éxito");
        } catch (blockchainError) {
          console.error('Error registrando en la blockchain:', blockchainError);
          setError('Error al registrar en la blockchain. Por favor, inténtalo de nuevo.');
          return; // Detener la ejecución si falla el registro en la blockchain
        }*/
    
        // Luego, crea el productor en tu base de datos local
        console.log("Intentando crear en la base de datos local...");
        const response = await axios.post('http://localhost:3001/wholesalers', newWholesaler);
        console.log("Productor creado en la base de datos:", response.data);
    
        setNewWholesaler({ nombre: '', email: '', password: '', ubicacion: '', wallet_address: '' });
        fetchWholesalers();
        setShowForm(false);
        console.log("Proceso de creación completado con éxito");
      } catch (error) {
        console.error('Error general creando mayorista:', error);
        setError('Error al crear el mayorista. Por favor, inténtalo de nuevo.');
      }
    };
    
    return (
      <div className="bg-gray-900 text-white min-h-screen p-4">
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Gestión de Mayoristas</h2>
        {error && (
        <div className="bg-red-500 text-white p-3 rounded mb-4">
          {error}
        </div>
      )}

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
          {wholesalers.map((wholesalers) => (
              <tr key={wholesalers.distribuidor_id} className="border-b border-gray-700">
                <td className="px-4 py-2 font-bold">{wholesalers.nombre}</td>
                <td className="px-4 py-2">{wholesalers.email}</td>
                <td className="px-4 py-2">{wholesalers.ubicacion}</td>
                <td className="px-4 py-2">{wholesalers.wallet_address}</td>
                <td className="px-4 py-2">{new Date(wholesalers.creado_en).toLocaleDateString()}</td>
                <td className="px-4 py-2 text-center">
                  <ul>
                    {/*wholesalers.products && wholesalers.products.length > 0 ? (
                      wholesalers.products.map((product) => (
                        <li key={wholesalers.distribuidor_id}>{wholesalers.product_name}</li>
                      ))
                    ) : (
                      <li>No Distribuidores</li>
                    )*/}
                  </ul>
                  <button
                    onClick={() => handleDelete(wholesalers.distribuidor_id)}
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
            <h3 className="text-xl font-semibold text-gray-200 mb-2">Crear Nuevo Distribuidor</h3>
            <input
              type="text"
              placeholder="Nombre"
              value={newWholesaler.nombre}
              onChange={(e) => setNewWholesaler({ ...newWholesaler, nombre: e.target.value })}
              className="mb-2 p-2 border rounded w-full bg-gray-700 text-white"
            />
            <input
              type="text"
              placeholder="Email"
              value={newWholesaler.email}
              onChange={(e) => setNewWholesaler({ ...newWholesaler, email: e.target.value })}
              className="mb-2 p-2 border rounded w-full bg-gray-700 text-white"
            />
            <input
              type="text"
              placeholder="Password"
              value={newWholesaler.password}
              onChange={(e) => setNewWholesaler({ ...newWholesaler, password: e.target.value })}
              className="mb-2 p-2 border rounded w-full bg-gray-700 text-white"
            />
            <input
              type="text"
              placeholder="Ubicación"
              value={newWholesaler.ubicacion}
              onChange={(e) => setNewWholesaler({ ...newWholesaler, ubicacion: e.target.value })}
              className="mb-2 p-2 border rounded w-full bg-gray-700 text-white"
            />
            <input
              type="text"
              placeholder="Wallet Address"
              value={newWholesaler.wallet_address}
              onChange={(e) => setNewWholesaler({ ...newWholesaler, wallet_address: e.target.value })}
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
export default MayoristaList;

import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl font-bold mb-4">Acceso No Autorizado</h1>
      <p className="mb-4">No tienes permiso para acceder a esta página.</p>
      <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Volver al inicio de sesión
      </Link>
    </div>
  );
};

export default Unauthorized;
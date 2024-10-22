import React, { useState } from 'react';

const SuppModal = ({ isOpen, onClose, suppliers = [], onSend }) => {
    const [selectedSuppliers, setSelectedSuppliers] = useState('');
    const [quantity, setQuantity] = useState('');
    const handleSubmit = () => {
        onSend(selectedSuppliers, quantity);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h2 className="text-xl font-bold mb-4">Seleccionar Proveedor</h2>
                <select
                    value={selectedSuppliers}
                    onChange={(e) => setSelectedSuppliers(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                >
                    <option value="">Seleccione un proveedor</option>
                    {suppliers.map(supplier => (
                        <option key={supplier.distribuidor_id} value={supplier.distribuidor_id}>{supplier.nombre}</option>
                    ))}
                </select>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Cantidad"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                />
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuppModal;
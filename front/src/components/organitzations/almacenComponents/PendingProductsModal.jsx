import React, { useState } from 'react';

const PendingProductsModal = ({ isOpen, onClose, products, onReceive }) => {
    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (uniqueId, value) => {
        setQuantities(prev => ({ ...prev, [uniqueId]: value }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Productos por Recibir</h3>
                    <div className="mt-2 px-7 py-3">
                        <ul className="space-y-2">
                            {products.map((product, index) => {
                                const uniqueId = `${product.producto_id}-${product.transfer_id || index}`;
                                return (
                                    <li key={uniqueId} className="flex justify-between items-center">
                                        <span>{product.nombre}</span>
                                        <span>{product.quantity_sent_almacen}</span>
                                        <div className="flex items-center">
                                            <input
                                                type="number"
                                                min="1"
                                                max={product.quantity_sent_almacen}
                                                value={quantities[uniqueId] || ''}
                                                onChange={(e) => handleQuantityChange(uniqueId, e.target.value)}
                                                className="w-16 mr-2 px-2 py-1 border rounded"
                                            />
                                            <button
                                                onClick={() => onReceive(product.producto_id, quantities[uniqueId], product.transfer_id)}
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                                            >
                                                Recibir
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="items-center px-4 py-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PendingProductsModal;

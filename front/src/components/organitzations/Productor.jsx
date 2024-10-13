
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';
import QRCode from 'qrcode';
import WarehouseModal from './productorComponents/warehouseModal';

const Productor = ({ producerId }) => {
    const [warehouses, setWarehouses] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ nombre: '', description: '', quantity: '' });
    console.log(producerId);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/products?productor_id=${producerId}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchWarehouses = async () => {
        try {
            const response = await axios.get('http://localhost:3001/warehouse');
            setWarehouses(response.data);
        } catch (error) {
            console.error('Error fetching warehouses:', error);
        }
    };

    const handleInputChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/productorCreate', {
                ...newProduct,
                productor_id: producerId,
            });
            setNewProduct({ nombre: '', description: '', quantity: '' });
            fetchProducts();
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleLabel = (productId) => {
        const qrCode = document.createElement('canvas');
        QRCode.toCanvas(qrCode, productId, function (error) {
            if (error) console.error(error);
            console.log('QR code generated!');
        });

        // Create a new window or modal to display the QR code
        const win = window.open("", "QR Code", "width=300,height=300");
        win.document.body.appendChild(qrCode);
    };

    const handleSend = (product) => {
        setSelectedProduct(product);
        fetchWarehouses();
        setIsModalOpen(true);
    };
    const sendProduct = async (warehouseId, quantity) => {
        console.log('Parámetros enviados:', { warehouseId, quantity, productId: selectedProduct });

        try {
            await axios.post('http://localhost:3001/productSent', {
                producto_id: selectedProduct,
                almacen_id: warehouseId,
                quantity: quantity
            });
            fetchProducts();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error sending product:', error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await axios.post('http://localhost:3001/productDeleted', {
                producto_id: productId,
            });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };


    return (
        <div className="container mx-auto px-4 py-8">
            <Header title="Producers Dashboard" />
            <h2 className="text-2xl font-bold mb-6">Productor Dashboard</h2>
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex flex-wrap -mx-2 mb-4">
                    <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
                        <input
                            type="text"
                            name="nombre"
                            value={newProduct.nombre}
                            onChange={handleInputChange}
                            placeholder="Product Name"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
                        <input
                            type="text"
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="w-full md:w-1/3 px-2">
                        <input
                            type="number"
                            name="quantity"
                            value={newProduct.quantity}
                            onChange={handleInputChange}
                            placeholder="Quantity"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Create Product
                </button>
            </form>

            <h3 className="text-xl font-semibold mb-4">Your Products</h3>
            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Description</th>
                            <th className="px-4 py-2 text-left">Quantity</th>
                            <th className="px-4 py-2 text-left">Created</th>
                            <th className="px-4 py-2 text-left">Sent</th>
                            <th className="px-4 py-2 text-left">State</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={`product.product_id-${index}`} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                <td className="px-4 py-2">{product.nombre}</td>
                                <td className="px-4 py-2">{product.descripcion}</td>
                                <td className="px-4 py-2">{product.quantity}</td>
                                <td className="px-4 py-2">
                                    {new Date(product.fecha_creacion).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2">
                                    {!product.fecha_distribucion
                                        ? 'No enviado'
                                        : new Date(product.fecha_distribucion).toLocaleDateString()
                                    }
                                </td>
                                <td className="px-4 py-2">{product.state}</td>
                                <td className="px-4 py-2">
                                    <div className="flex space-x-2">
                                        <button key={`label-${product.product_id}`} onClick={() => handleLabel(product.uuid)} className="text-blue-500 hover:text-blue-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <button key={`send-${product.product_id}`} onClick={() => handleSend(product.producto_id)} className="text-green-500 hover:text-green-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                            </svg>
                                        </button>
                                        <button key={`delete-${product.product_id}`} onClick={() => handleDelete(product.producto_id)} className="text-red-500 hover:text-red-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <WarehouseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                warehouses={warehouses}
                onSend={sendProduct}
            />
        </div>
    );
};

export default Productor;



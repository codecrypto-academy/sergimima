import Header from '../Header';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode';

const Almacen = ({ almacenId }) => {
    const [products, setProducts] = useState([]);
    const [productsToReceive, setToReceive] = useState([]);
    const [mayoristas, setMayoristas] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/productsAlmacen?almacen_id=${almacenId}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchProductsPendingReceive = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/productsPendingReveiveAlmacen?almacen_id=${almacenId}`);
            setToReceive(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchMayoristas = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/distribuidor`);
            setMayoristas(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching Mayoristas:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchProductsPendingReceive();
    }, []);

    const receiveProduct = async (productId) => {
        try {
            await axios.post('http://localhost:3001/receiveProduct', { productId });
            fetchProducts();
        } catch (error) {
            console.error('Error receiving product:', error);
        }
    };

    const handleLabel = (productId) => {
        const qrCode = document.createElement('canvas');
        QRCode.toCanvas(qrCode, productId, function (error) {
            if (error) console.error(error);
            console.log('QR code generated!');
        });

        const win = window.open("", "QR Code", "width=300,height=300");
        win.document.body.appendChild(qrCode);
    };

    const handleReceive = (productId) => {
        receiveProduct(productId);
        fetchProducts();
    };

    const sendToMayorista = async (product_id, distribuidor_id) => {
        try {
            await axios.post('http://localhost:3001/sendToMayorista', { product_id, distribuidor_id });
            fetchProducts();
        } catch (error) {
            console.error('Error sending product to mayorista:', error);
        }
    };

    const handleSend = (productId) => {
        receiveProduct(productId);
        fetchProducts();
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Header title="Panel de Almacenes">
                <nav className="flex items-center space-x-4">
                    <div className="bg-blue-500 text-white p-3 flex justify-between items-center mb-6">
                        <div className="relative">
                            <span className="mr-2">Para recivir</span>
                            {productsToReceive.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                                    {productsToReceive.length}
                                </span>
                            )}
                        </div>
                    </div>
                </nav>
            </Header>
            <h2 className="text-2xl font-bold mb-6">Portal Almacen</h2>
            <h3 className="text-xl font-semibold mb-4">Productos almacenados</h3>
            <div className="overflow-x-auto">
                <title>Stock actual</title>
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left">Nombre</th>
                            <th className="px-4 py-2 text-left">Description</th>
                            <th className="px-4 py-2 text-left">Quantity</th>
                            <th className="px-4 py-2 text-left">Recivido</th>
                            <th className="px-4 py-2 text-left">Enviado</th>
                            <th className="px-4 py-2 text-left">Estado</th>
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
                                        <button
                                            key={`receive-${product.product_id}`}
                                            onClick={() => handleReceive(product.producto_id)}
                                            className="text-green-500 hover:text-green-700 relative group"
                                            title="Recibir"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                Recibir
                                            </span>
                                        </button>
                                        <button key={`send-${product.product_id}`} onClick={() => handleSend(product.producto_id)} className="text-green-500 hover:text-green-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Almacen;

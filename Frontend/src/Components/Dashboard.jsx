import React, { useState, useEffect } from 'react'
import { Web3 } from 'web3'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../../../Backend/Contract.js'
import { useWallet } from '../Context/WalletContext.jsx'
import { useNavigate } from 'react-router-dom'



const Dashboard = () => {
    const navigate = useNavigate()
    const { isConnected, userInfo, currentAddress } = useWallet()
    const [clients, setClients] = useState([])
    const [companies, setCompanies] = useState([])
    const [userAddress, setUserAddress] = useState('')
    const [productForm, setProductForm] = useState({
        name: '',
        price: '',
        image: null
    })

    // Add this field in the form, right at the top:


    useEffect(() => {
        fetchUsers()
        if (!isConnected) {
            navigate('/')
        }
    }, [isConnected])

    const fetchUsers = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum)
            const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            })
            const currentAddress = accounts[0]
            setUserAddress(currentAddress)

            const client = await contract.methods.clientes(currentAddress).call()
            const empresa = await contract.methods.empresas(currentAddress).call()

            if (client.addressCliente !== '0x0000000000000000000000000000000000000000') {
                setClients([client])
            }
            if (empresa.addressEmpresa !== '0x0000000000000000000000000000000000000000') {
                setCompanies([empresa])
            }
        }
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (file) {
            // Here we'll add the IPFS upload logic
            const formData = new FormData()
            formData.append('file', file)

            // Using Pinata, Infura, or your preferred IPFS service
            const response = await fetch('YOUR_IPFS_UPLOAD_ENDPOINT', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()
            const ipfsHash = data.IpfsHash
            setProductForm({ ...productForm, ipfsHash })
        }
    }

    const handleAddProduct = async (e) => {
        e.preventDefault()
        if (typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum)
            const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
            try {
                const accounts = await web3.eth.getAccounts()
                await contract.methods.addProduct(
                    web3.utils.toWei(productForm.price, 'ether'),
                    productForm.ipfsHash
                ).send({ from: accounts[0] })

                setProductForm({ price: '', image: null })
            } catch (error) {
                console.error('Error adding product:', error)
            }
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
            <p className="text-white mb-4">Connected Address: {userAddress}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clients.length > 0 && (
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold text-white mb-4">Registered Clients</h2>
                        <div className="space-y-4">
                            {clients.map((client, index) => (
                                <div key={index} className="bg-gray-700 p-4 rounded">
                                    <p className="text-white">Client Address: {client.addressCliente}</p>
                                    <p className="text-white">Total Purchases: {client.ComprasTotales}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {companies.length > 0 && (
                    <>
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold text-white mb-4">Registered Companies</h2>
                            <div className="space-y-4">
                                {companies.map((company, index) => (
                                    <div key={index} className="bg-gray-700 p-4 rounded">
                                        <p className="text-white">Name: {company.nombreEmpresa}</p>
                                        <p className="text-gray-300">Address: {company.addressEmpresa}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold text-white mb-4">Add New Product</h2>
                            <form onSubmit={handleAddProduct} className="space-y-4">
                                <div>
                                    <label className="block text-white mb-2">Product Name</label>
                                    <input
                                        type="text"
                                        value={productForm.name}
                                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        placeholder="Enter product name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-2">Product Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="w-full p-2 border rounded text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-2">Price (POL)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={productForm.price}
                                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
                                >
                                    Add Product
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
            <button
                onClick={fetchUsers}
                className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
                Refresh Data
            </button>
        </div>
    )
}

export default Dashboard

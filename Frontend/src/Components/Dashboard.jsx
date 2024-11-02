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
            try {
                const formData = new FormData()
                formData.append('file', file)

                const response = await fetch('http://127.0.0.1:5001/api/v0/add', {
                    method: 'POST',
                    headers: {
                        'Origin': 'http://localhost:5173'
                    },
                    body: formData
                })

                const data = await response.json()
                console.log('File uploaded to local node with hash:', data.Hash)
                await checkPinStatus(data.Hash)
                setProductForm({ ...productForm, image: data.Hash })
                await fetch(`http://127.0.0.1:5001/api/v0/files/cp?arg=/ipfs/${data.Hash}&arg=/${file.name}`, {
                    method: 'POST',
                    headers: {
                        'Origin': 'http://localhost:5173'
                    }
                })

            } catch (error) {
                console.error('Error uploading to IPFS:', error)
            }
        }
    }
    const checkPinStatus = async (hash) => {
        const response = await fetch(`http://127.0.0.1:5001/api/v0/pin/ls?arg=${hash}`, {
            method: 'POST',
            headers: {
                'Origin': 'http://localhost:5173'
            }
        })
        const data = await response.json()
        console.log('Pin status:', data)
    }

    const handleAddProduct = async (e) => {
        e.preventDefault()
        if (typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum)
            const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
            try {
                const accounts = await web3.eth.getAccounts()
                const amoyPrice = web3.utils.toWei('0.001', 'ether')



                console.log('Transaction details:', {
                    from: accounts[0],
                    price: amoyPrice.toString(),
                    hash: productForm.image,
                    contract: CONTRACT_ADDRESS
                })

                const gas = await contract.methods.crearProducto(
                    amoyPrice.toString(),
                    productForm.image
                ).estimateGas({ from: accounts[0] })


                await contract.methods.crearProducto(
                    amoyPrice,
                    productForm.image
                ).send({
                    from: accounts[0],
                    gas: gas,
                    gasPrice: await web3.eth.getGasPrice()
                })

                setProductForm({ name: '', price: '', image: null })
            } catch (error) {
                console.error('Detailed error:', error)
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
                                        className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
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
                                        className="w-full p-2 border rounded bg-gray-700 text-white"
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

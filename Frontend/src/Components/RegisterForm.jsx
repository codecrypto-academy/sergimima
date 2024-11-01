import React, { useState } from 'react'
import { Web3 } from 'web3'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../../../Backend/Contract.js'

const RegisterForm = ({ onClose }) => {
    const [role, setRole] = useState('cliente')
    const [formData, setFormData] = useState({
        name: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (typeof window.ethereum !== 'undefined') {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: '0x13882',
                    chainName: 'Amoy Testnet',
                    rpcUrls: ['https://rpc-amoy.polygon.technology'],
                    nativeCurrency: {
                        name: 'AMOY',
                        symbol: 'POL',
                        decimals: 18
                    },
                    blockExplorerUrls: ['https://amoy.blockscout.com']
                }]
            })

            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            })

            const web3 = new Web3(window.ethereum)
            const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

            try {
                if (role === 'empresa') {
                    const tx = await contract.methods.registrarEmpresa(formData.name)
                        .send({
                            from: accounts[0],
                            gas: 300000,
                            gasPrice: await web3.eth.getGasPrice()
                        })
                    console.log('Transaction:', tx)
                    onClose()
                } else {
                    const tx = await contract.methods.registrarCliente()
                        .send({
                            from: accounts[0],
                            gas: 300000,
                            gasPrice: await web3.eth.getGasPrice()
                        })
                    console.log('Transaction:', tx)
                    onClose()
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }
    }

    return (
        <div className="flex items-center justify-center py-6 px-4">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-white">
                        Register
                    </h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Select Role
                            </label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                                <option value="cliente">Cliente</option>
                                <option value="empresa">Empresa</option>
                            </select>
                        </div>

                        {role === 'empresa' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter company name"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm

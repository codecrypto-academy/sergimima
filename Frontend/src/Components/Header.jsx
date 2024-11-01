import React, { useState, useEffect } from 'react'
import Modal from './RegisterModal'
import { Web3 } from 'web3'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../../../Backend/Contract.js'
import RegisterForm from './RegisterForm'
import { Link } from 'react-router-dom'
import { useWallet } from '../Context/WalletContext.jsx'
import { Cog6ToothIcon } from '@heroicons/react/24/solid'



const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { isConnected, setIsConnected, userInfo, setUserInfo, currentAddress, setCurrentAddress } = useWallet()


    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    connectWallet()
                } else {
                    disconnectWallet()
                }
            })
        }
        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', connectWallet)
            }
        }
    }, [])

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum)
            const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            })

            if (accounts[0]) {
                setCurrentAddress(accounts[0])
                setIsConnected(true)
                const cliente = await contract.methods.clientes(accounts[0]).call()
                const empresa = await contract.methods.empresas(accounts[0]).call()

                if (cliente.addressCliente !== '0x0000000000000000000000000000000000000000') {
                    setUserInfo({
                        address: accounts[0],
                        type: 'Cliente',
                        compras: cliente.ComprasTotales
                    })
                } else if (empresa.addressEmpresa !== '0x0000000000000000000000000000000000000000') {
                    setUserInfo({
                        address: accounts[0],
                        type: 'Empresa',
                        name: empresa.nombreEmpresa
                    })
                }
            }
        }
    }

    const disconnectWallet = () => {
        setUserInfo(null)
        setIsConnected(false)
        setCurrentAddress(null)
    }

    return (
        <>
            <nav className="bg-gray-800 shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0">
                            <Link
                                to="/"
                                className="text-xl font-bold text-white hover:text-gray-300 transition duration-300"
                            >
                                Web3 Shop
                            </Link>
                        </div>


                        <div className="flex items-center space-x-4">
                            {!isConnected ? (
                                <button
                                    onClick={connectWallet}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                                >
                                    Connect Wallet
                                </button>
                            ) : userInfo ? (
                                <div className="flex items-center space-x-4">

                                    <span className="text-white">{userInfo.type}: {userInfo.type === 'Empresa' ? userInfo.name : ''}</span>
                                    <span className="text-gray-400">{userInfo.address.slice(0, 6)}...{userInfo.address.slice(-4)}</span>

                                    <button
                                        onClick={disconnectWallet}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                                    >
                                        Disconnect Wallet
                                    </button>
                                    <Link
                                        to="/dashboard"
                                        className=" p-2 rounded-md hover:bg-blue-700 transition duration-300"
                                    >
                                        <Cog6ToothIcon className="h-6 w-6 text-white" />
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-400">{currentAddress.slice(0, 6)}...{currentAddress.slice(-4)}</span>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                                    >
                                        Register
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <RegisterForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </>
    )
}

export default Header

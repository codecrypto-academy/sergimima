import React, { useState, useEffect, useRef } from 'react'
import Modal from './RegisterModal'
import { Web3 } from 'web3'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../../../Backend/Contract.js'
import RegisterForm from './RegisterForm'
import { Link } from 'react-router-dom'
import { useWallet } from '../Context/WalletContext.jsx'
import { Cog6ToothIcon } from '@heroicons/react/24/solid'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { WalletIcon } from '@heroicons/react/24/solid'
import { PowerIcon } from '@heroicons/react/24/solid'
import ShoppingCart from './ShoppingCart'
import { useCart } from '../Context/CartContext'
import { useTheme } from '../Context/ThemeContext'

const Header = () => {
    const theme = useTheme()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { isConnected, setIsConnected, userInfo, setUserInfo, currentAddress, setCurrentAddress } = useWallet()
    const [isCartOpen, setIsCartOpen] = useState(false)
    const { cartItems } = useCart()
    const cartRef = useRef()
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartRef.current &&
                !cartRef.current.contains(event.target) &&
                !event.target.closest('button')) {
                setIsCartOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
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
            <div className="relative">
                <nav className={theme.nav.container}>
                    <span className={theme.nav.gradient} />
                    <div className={`${theme.card.content} mx-auto px-4`}>
                        <div className="flex justify-between items-center h-16">
                            <Link to="/" className={`${theme.neonText.title} ${theme.animations.glitch}`}>
                                Web3 Shop
                            </Link>

                            <div className="flex items-center space-x-4">
                                {!isConnected ? (
                                    <button onClick={connectWallet} className={theme.button.primary}>
                                        <span className={theme.button.primaryGradient} />
                                        <span className={theme.button.content}>
                                            <WalletIcon className="h-5 w-5" />
                                        </span>
                                    </button>
                                ) : userInfo ? (
                                    <div className="flex items-center space-x-4">
                                        <Link to="/dashboard" className={theme.button.secondary}>
                                            <span className={theme.button.secondaryGradient} />
                                            <span className={theme.button.content}>
                                                <Cog6ToothIcon className="h-5 w-5" />
                                            </span>
                                        </Link>
                                        <button onClick={disconnectWallet} className={theme.button.primary}>
                                            <span className={theme.button.primaryGradient} />
                                            <span className={theme.button.content}>
                                                <PowerIcon className="h-5 w-5 text-red-500" />
                                            </span>
                                        </button>
                                    </div>
                                ) : (
                                    <button onClick={() => setIsModalOpen(true)} className={theme.button.secondary}>
                                        <span className={theme.button.secondaryGradient} />
                                        <span className={theme.button.content}>
                                            Register
                                        </span>
                                    </button>
                                )}
                                <div ref={cartRef} className="relative z-50">
                                    <button onClick={() => setIsCartOpen(!isCartOpen)} className={theme.button.primary}>
                                        <span className={theme.button.primaryGradient} />
                                        <span className={theme.button.content}>
                                            <ShoppingCartIcon className="h-5 w-5" />
                                            {cartItems.length > 0 && (
                                                <span className={`absolute -top-1 -right-1 ${theme.animations.cartBadge} text-white text-xs rounded-full h-5 w-5 flex items-center justify-center`}>
                                                    {cartItems.length}
                                                </span>
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className={`${theme.divider.gradient} ${theme.animations.neonPulse}`} />
            </div>

            {isCartOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40"
                        onClick={() => setIsCartOpen(false)}
                    />
                    <div className={`fixed right-0 top-0 h-full w-[90%] xs:w-[80%] sm:w-96 md:w-80 bg-gray-900 shadow-xl ${theme.animations.slideIn} z-50`}>
                        <ShoppingCart />
                    </div>
                </>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <RegisterForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </>
    )
}

export default Header
import React from 'react'
import { useCart } from '../Context/CartContext'
import { useWallet } from '../Context/WalletContext'
import { Web3 } from 'web3'
import { WalletIcon, CreditCardIcon } from '@heroicons/react/24/solid'
import { useTheme } from '../Context/ThemeContext'
import { Link } from 'react-router-dom'


const ShoppingCart = () => {
    const theme = useTheme()
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart()
    const { isConnected, userInfo } = useWallet()

    const total = cartItems.reduce((sum, item) => sum + (parseFloat(item.precio) * item.quantity), 0)

    const handleCryptoCheckout = async () => {
        if (!isConnected) {
            alert('Please connect your wallet first')
            return
        }

        const web3 = new Web3(window.ethereum)
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
        const accounts = await web3.eth.getAccounts()

        try {
            // Implementation coming next
        } catch (error) {
            console.error('Checkout error:', error)
        }
    }

    const handleRedsysCheckout = async () => {
        // Implementation coming next
    }

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity === 0) {
            removeFromCart(itemId);
        } else {
            updateQuantity(itemId, newQuantity);
        }
    };

    return (
        <div className="h-full flex flex-col">
            <h2 className="text-2xl font-bold text-white p-6 border-b border-gray-700">Shopping Cart</h2>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center bg-gray-800 p-4 rounded">
                        <img
                            src={`http://127.0.0.1:8080/ipfs/${item.image}`}
                            alt={`Product ${item.id}`}
                            className="w-20 h-20 object-cover rounded mr-4"
                        />
                        <div className="flex-1">
                            <p className="text-white">{item.nombreEmpresa}</p>
                            <p className="text-gray-400">{item.precio} POL</p>
                            <div className="flex items-center mt-2">
                                <button
                                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                    className="text-white bg-gray-700 px-2 rounded"
                                >
                                    -
                                </button>
                                <span className="text-white mx-3">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="text-white bg-gray-700 px-2 rounded"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-400 ml-4"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <div className="p-6 border-t border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-white text-lg">Total:</span>
                    <span className="text-white text-lg">{total.toFixed(2)} POL</span>
                </div>
                <Link
                    to="/checkout"
                    className={`${theme.button.primary} w-full flex justify-center items-center`}
                >
                    <span className={theme.button.primaryGradient} />
                    <span className={theme.button.content}>
                        Proceed to Checkout
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default ShoppingCart
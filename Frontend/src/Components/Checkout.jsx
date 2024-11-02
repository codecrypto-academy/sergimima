import React from 'react'
import { useCart } from '../Context/CartContext'
import { useWallet } from '../Context/WalletContext'
import { useTheme } from '../Context/ThemeContext'
import { Web3 } from 'web3'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../../../Backend/Contract.js'
import { WalletIcon, CreditCardIcon } from '@heroicons/react/24/solid'

const Checkout = () => {
    const theme = useTheme()
    const { cartItems, clearCart } = useCart()
    const { isConnected, currentAddress } = useWallet()

    const total = cartItems.reduce((sum, item) => sum + (parseFloat(item.precio) * item.quantity), 0)

    const handleCryptoPayment = async () => {
        if (!isConnected) {
            alert('Please connect your wallet first')
            return
        }

        const web3 = new Web3(window.ethereum)
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

        try {
            await contract.methods.processPurchase(cartItems).send({
                from: currentAddress,
                value: web3.utils.toWei(total.toString(), 'ether')
            })
            clearCart()
        } catch (error) {
            console.error('Payment failed:', error)
        }
    }

    const handleRedsysCheckout = async () => {
        try {
            const response = await fetch('http://localhost:3001/payment/create-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: Math.round(total * 100),
                    orderId: `ORDER${Date.now()}`
                })
            });

            const data = await response.json();

            const form = document.createElement('form');
            form.method = data.form.method;
            form.action = data.form.action;

            Object.entries(data.form.inputs).forEach(([key, value]) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value;
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
        } catch (error) {
            console.error('Payment creation failed:', error);
        }
    }

    return (
        <div className={`${theme.card.container} max-w-2xl mx-auto mt-10 p-6`}>
            <h1 className={`${theme.neonText.title} mb-6`}>Checkout</h1>
            <div className="space-y-4">
                {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-4 bg-gray-800 rounded">
                        <div className="flex items-center">
                            <img
                                src={`http://127.0.0.1:8080/ipfs/${item.image}`}
                                alt={item.nombreEmpresa}
                                className="w-16 h-16 object-cover rounded mr-4"
                            />
                            <div>
                                <p className="text-white">{item.nombreEmpresa}</p>
                                <p className="text-gray-400">Quantity: {item.quantity}</p>
                            </div>
                        </div>
                        <span className="text-white">{(item.precio * item.quantity).toFixed(2)} POL</span>
                    </div>
                ))}
                <div className="border-t border-gray-700 pt-4 mt-6">
                    <div className="flex justify-between text-xl font-bold text-white">
                        <span>Total</span>
                        <span>{total.toFixed(2)} POL</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleCryptoPayment}
                        className={`${theme.button.primary} flex-1`}
                    >
                        <span className={theme.button.primaryGradient} />
                        <span className={theme.button.content}>
                            <WalletIcon className="h-5 w-5 mr-2" />
                            Pay with Crypto
                        </span>
                    </button>
                    <button
                        onClick={handleRedsysCheckout}
                        className={`${theme.button.secondary} flex-1`}
                    >
                        <span className={theme.button.secondaryGradient} />
                        <span className={theme.button.content}>
                            <CreditCardIcon className="h-5 w-5 mr-2" />
                            Pay with Card
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Checkout

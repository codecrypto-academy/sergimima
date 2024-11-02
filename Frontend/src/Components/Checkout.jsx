import React from 'react'
import { useCart } from '../Context/CartContext'
import { useWallet } from '../Context/WalletContext'
import { useTheme } from '../Context/ThemeContext'
import { Web3 } from 'web3'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../../../Backend/Contract.js'
import { WalletIcon, CreditCardIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
    const navigate = useNavigate()

    const theme = useTheme()
    const { cartItems, clearCart } = useCart()
    const { isConnected, currentAddress, connectWallet } = useWallet()



    const total = cartItems.reduce((sum, item) => sum + (parseFloat(item.precio) * item.quantity), 0)


    const handleCryptoPayment = async () => {
        try {
            console.log('Starting crypto payment process...')

            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            })
            const userAddress = accounts[0]
            const web3 = new Web3(window.ethereum)

            // First: Execute the payment transfer
            const gasEstimate = await web3.eth.estimateGas({
                from: userAddress,
                to: cartItems[0].empresa,
                value: web3.utils.toWei(total.toString(), 'ether')
            })

            const tx = await web3.eth.sendTransaction({
                from: userAddress,
                to: cartItems[0].empresa,
                value: web3.utils.toWei(total.toString(), 'ether'),
                gas: gasEstimate,
                gasPrice: await web3.eth.getGasPrice()
            })

            if (tx.status) {
                clearCart()
                navigate('/payment/success', {
                    state: {
                        txHash: tx.transactionHash,
                        amount: total,
                        customerAddress: userAddress,
                        companyAddress: cartItems[0].empresa,
                        items: cartItems,
                        method: 'Cryptocurrency'
                    }
                })
            }
        } catch (error) {
            console.error('Transaction failed:', error)
            navigate('/payment/error')
        }
    }

    const handleRedsysCheckout = async () => {
        try {
            if (total <= 0) {
                throw new Error('No hay nada en el carrito :(')
            }
            localStorage.setItem('redsysPaymentData', JSON.stringify({
                amount: total.toFixed(2),
                items: cartItems,
                method: 'Credit Card',  // This ensures it shows "Credit Card" instead of defaulting to "Cryptocurrency"
                currency: 'EUR',
                customerAddress: currentAddress,
                companyName: cartItems[0].nombreEmpresa
            }))

            const payload = {
                amount: Math.round(total * 100),
                orderId: `WEB3${Date.now().toString().slice(-8)}`
            }

            const response = await fetch('http://localhost:3001/payment/create-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = data.form.url;

            Object.entries(data.form.body).forEach(([key, value]) => {
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
            alert('Failed to create payment: ' + error.message);
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

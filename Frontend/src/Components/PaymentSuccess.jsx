import React from 'react'
import { useLocation } from 'react-router-dom'
import { usePDF } from 'react-to-pdf'
import { useEffect } from 'react'
import { useCart } from '../Context/CartContext'


const PaymentSuccess = () => {
    const location = useLocation()
    const { toPDF, targetRef } = usePDF({ filename: 'transaction-receipt.pdf' })
    const searchParams = new URLSearchParams(location.search)
    const redsysData = searchParams.get('data') ? JSON.parse(decodeURIComponent(searchParams.get('data'))) : null
    const storedPaymentData = JSON.parse(localStorage.getItem('redsysPaymentData'))
    const paymentDetails = location.state || redsysData || storedPaymentData || {}
    const { cartItems } = useCart()


    useEffect(() => {
        localStorage.removeItem('redsysPaymentData')
    }, [])
    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Receipt Preview */}
                <div ref={targetRef} className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Receipt</h2>
                    <div className="space-y-4">
                        <div className="border-b pb-4">
                            <p className="text-gray-600">Transaction Date: {new Date().toLocaleString()}</p>
                            {paymentDetails?.txHash && (
                                <p className="text-gray-600">Transaction Hash: {paymentDetails.txHash}</p>
                            )}
                        </div>
                        <div className="border-b pb-4">
                            <p className="text-gray-600">Amount Paid: {paymentDetails?.amount} {paymentDetails?.currency || 'POL'}</p>
                            <p className="text-gray-600">Payment Method: {paymentDetails?.method || 'Cryptocurrency'}</p>
                        </div>
                        <div className="border-b pb-4">
                            <p className="text-gray-600">Customer Address: {paymentDetails?.customerAddress?.slice(0, 6)}...{paymentDetails?.customerAddress?.slice(-4)}</p>
                            <p className="text-gray-600">Company: {paymentDetails?.companyName || cartItems?.[0]?.nombreEmpresa}</p>
                        </div>
                        {paymentDetails?.items && (
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">Items Purchased</h3>
                                <ul className="list-disc pl-5">
                                    {paymentDetails.items.map((item, index) => (
                                        <li key={index} className="text-gray-600">
                                            {item.nombreEmpresa} - {item.quantity}x {item.precio} {paymentDetails?.currency || 'POL'}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        Co
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-center space-x-4">
                    <button
                        onClick={() => toPDF()}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Download Receipt
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Print Receipt
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess

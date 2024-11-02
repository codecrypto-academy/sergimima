import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentError = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate('/checkout')
        }, 3000)
    }, [])

    return (
        <div className="text-center p-8">
            <h2 className="text-2xl text-red-500 mb-4">Payment Failed</h2>
            <p className="text-white">Redirecting back to checkout...</p>
        </div>
    )
}

export default PaymentError

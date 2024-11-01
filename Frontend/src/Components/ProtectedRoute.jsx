import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const checkConnection = async () => {
        const accounts = await window.ethereum.request({
            method: 'eth_accounts'
        })
        return accounts.length > 0
    }

    const isConnected = checkConnection()

    return isConnected ? children : <Navigate to="/" />
}

export default ProtectedRoute

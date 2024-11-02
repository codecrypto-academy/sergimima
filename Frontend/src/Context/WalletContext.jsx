import React, { createContext, useState, useContext, useEffect } from 'react'

const WalletContext = createContext()

export const WalletProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [currentAddress, setCurrentAddress] = useState(null)

    const connectWallet = async () => {
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            })
            setCurrentAddress(accounts[0])
            setIsConnected(true)
            return accounts[0]
        } catch (error) {
            console.error('Failed to connect wallet:', error)
            throw error
        }
    }

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    setCurrentAddress(accounts[0])
                    setIsConnected(true)
                } else {
                    setCurrentAddress(null)
                    setIsConnected(false)
                }
            })

            window.ethereum.on('chainChanged', () => {
                window.location.reload()
            })
        }
    }, [])

    return (
        <WalletContext.Provider value={{
            isConnected,
            setIsConnected,
            userInfo,
            setUserInfo,
            currentAddress,
            setCurrentAddress,
            connectWallet    // Add this line
        }}>
            {children}
        </WalletContext.Provider>
    )
}

export const useWallet = () => useContext(WalletContext)

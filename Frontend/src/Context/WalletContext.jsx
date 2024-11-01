import React, { createContext, useState, useContext } from 'react'

const WalletContext = createContext()

export const WalletProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [currentAddress, setCurrentAddress] = useState(null)

    return (
        <WalletContext.Provider value={{
            isConnected,
            setIsConnected,
            userInfo,
            setUserInfo,
            currentAddress,
            setCurrentAddress
        }}>
            {children}
        </WalletContext.Provider>
    )
}

export const useWallet = () => useContext(WalletContext)

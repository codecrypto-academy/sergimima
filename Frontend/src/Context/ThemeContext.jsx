import React, { createContext, useContext } from 'react'
import theme from '../styles/theme'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)

import './App.css'
import Header from './Components/header'
import ProductGrid from './Components/ProductGrid'
import Dashboard from './Components/Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/RegisterForm'
import ProtectedRoute from './Components/ProtectedRoute'
import { WalletProvider } from './Context/WalletContext'
import { CartProvider } from './Context/CartContext'
import { ThemeProvider } from './Context/ThemeContext'
import ParticleBackground from './Components/ParticleBackground'
import Checkout from './Components/Checkout'


function App() {
  return (

    <ThemeProvider>
      <WalletProvider>
        <CartProvider>
          <Router>
            <div className="relative min-h-screen">
              <ParticleBackground />
              <div className="relative z-10">
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<ProductGrid />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/checkout" element={<Checkout />} />


                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </main>
              </div>
            </div>
          </Router>
        </CartProvider>
      </WalletProvider>
    </ThemeProvider>
  )
}

export default App
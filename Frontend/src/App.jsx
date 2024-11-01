
import './App.css'
import Header from './Components/header'
import ProductGrid from './Components/ProductGrid'
import Dashboard from './Components/Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/RegisterForm'
import ProtectedRoute from './Components/ProtectedRoute'
import { WalletProvider } from './Context/WalletContext'



function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="w-full min-h-screen bg-gray-900">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<ProductGrid />} />
              <Route path="/login" element={<Login />} />
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
      </Router>
    </WalletProvider>
  )
}

export default App
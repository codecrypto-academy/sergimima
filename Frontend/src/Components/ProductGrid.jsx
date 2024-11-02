import React, { useState, useEffect } from 'react'
import { Web3 } from 'web3'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../../../Backend/Contract.js'
import { useCart } from '../Context/CartContext'
import { useTheme } from '../Context/ThemeContext'



const ProductGrid = () => {
  const theme = useTheme()
  const [products, setProducts] = useState([])
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const web3 = new Web3('https://rpc-amoy.polygon.technology')
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

    let productId = 1
    let productsList = []

    while (true) {
      try {
        const product = await contract.methods.productos(productId).call()
        if (product.addressEmpresa === '0x0000000000000000000000000000000000000000') {
          break
        }
        const empresa = await contract.methods.empresas(product.addressEmpresa).call()
        productsList.push({
          id: productId,
          empresa: product.addressEmpresa,
          nombreEmpresa: empresa.nombreEmpresa,
          precio: (web3.utils.fromWei(product.precioProducto.toString(), 'ether') * 10),
          image: product.ipfsHash
        })
        productId++
      } catch (error) {
        break
      }
    }

    setProducts(productsList)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className={theme.neonText.title}>Available Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className={`${theme.card.container} hover:transform hover:scale-105 transition-all duration-300`}
          >
            <span className={theme.card.gradient} />
            <div className={theme.card.content}>
              <img
                src={`http://127.0.0.1:8080/ipfs/${product.image}`}
                alt={`Product ${product.id}`}
                className="w-full h-64 object-cover rounded-lg mb-4 hover:shadow-lg hover:shadow-purple-500/25"
              />
              <p className={theme.neonText.title}>{product.name}</p>
              <p className="text-gray-400 mb-2">Seller: {product.nombreEmpresa}</p>
              <p className={`${theme.neonText.price} text-xl mb-4`}>{product.precio} POL</p>
              <button
                onClick={() => addToCart(product)}
                className={theme.button.primary}
              >
                <span className={theme.button.primaryGradient} />
                <span className={theme.button.content}>
                  Add to Cart
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


export default ProductGrid

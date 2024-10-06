import { useEffect, useState } from 'react'
import './App.css'
import { ethers } from 'ethers'

const provider = new ethers.BrowserProvider(window.ethereum);
const ethereum = (window).ethereum;
function App() {
  const [address, setAddress] = useState(null);
  
  useEffect(() =>{
    const accounts = ethereum.request({method: 'eth_requestAccounts',}).then(addresses => {setAddress(addresses[0])
      ethereum.on("accountsChanged",(addresses => {
        setAddress(addresses[0])
      }))
    })
  }, [])
  return (
    <>
      <div>
        <p>La cuenta es: {address}</p>
        </div>
    </>
  )
}

export default App

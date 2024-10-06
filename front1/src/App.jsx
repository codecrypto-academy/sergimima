import { useEffect, useState } from 'react'
import './App.css'
import { ethers, JsonRpcProvider } from 'ethers'

const sc = "0x90D3d13Eda8F15F0a0F0093f4Ca8Aa4846E8d119"
let httpProvider = new JsonRpcProvider('http://localhost:8545')
const abi = `[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"contador","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dec","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"inc","outputs":[],"stateMutability":"nonpayable","type":"function"}]`;

const ethereum = window.ethereum;

function App() {
  const [address, setAddress] = useState(null);
  const [contador, setContador] = useState(null);
  const [tx, setTx] = useState(null);

  useEffect(() => {
    const contract = new ethers.Contract(sc, abi, httpProvider);
    contract.contador().then(r => {setContador(r.toString());
    })
  }, [address])
  
  useEffect(() => {
    if (ethereum) {
      ethereum.request({method: 'eth_requestAccounts'}).then(addresses => {
        setAddress(addresses[0])
        ethereum.on("accountsChanged", (addresses => {
          setAddress(addresses[0])
        }))
      })
    } else {
      console.log("Please install MetaMask!")
    }
  }, [])

  async function op(valor) {
    if (!ethereum) {
      console.log("Please install MetaMask!")
      return
    }
    
    console.log(sc);
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    
    const contract = new ethers.Contract(sc, abi, signer);
    const tx  = valor == 1 ? await contract.inc(): await contract.dec()
    const receipt = await tx.wait();
    setTx(JSON.stringify({tx, receipt}, null, 4))
    const c = await contract.contador()
    console.log("nuevo contador ", c)
    setContador(c.toString())
  }

  return (
    <>
      <div>
        <h3>La cuenta es: {address}</h3>
        <p>Contador: {contador}</p>
        <pre>{tx}</pre>
        <button onClick={() => op(1)}>Incrementar</button>
        <button onClick={() => op(-1)}>Decrementar</button>
      </div>
    </>
  )
}

export default App
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [cuenta, setCuenta] = useState(null)
  const [receiptString, setTx] = useState(null)
  const [saldo, setSaldo] = useState(null)

  useEffect(() => {
    window.ethereum.request({
      method:"eth_requestAccounts"
    }).then(cuenta => {
      setCuenta(cuenta[0])
      window.ethereum.on("accountsChanged", (cuenta) => {
        setCuenta(cuenta[0])
      })
    })
  }, [])

  useEffect(() => {
    async function saldo(){
      const url = `http://localhost:3333/balance/${cuenta}`
      const response = await fetch(url)
      const saldoWei = await response.json()
      const saldo = saldoWei / 1e+18
      setSaldo(saldo)
    }
    if(cuenta)
    saldo()
  }, [cuenta])

  async function invocarFaucet(){
    const url = `http://localhost:3333/faucet/${cuenta}`
    const response = await fetch(url)
    const json = await response.json()
    const receiptString = JSON.stringify(json, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    );
    
    setTx(receiptString)
  }
  return (
    <div>
      <h1>{cuenta}</h1>
      <h2>Saldo: {saldo}</h2>
      <button onClick={() =>invocarFaucet()}>Enviar 0.1 eth</button>
      <div>
        {JSON.stringify(receiptString, null, 4)}
      </div>
    </div>
   
  )
}

export default App

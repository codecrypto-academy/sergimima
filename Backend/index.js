import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import Web3 from 'web3'
import router from './payment.js'
import paymentRoutes from './payment.js'


// Web3 and Network Configuration
const AMOY_RPC_URL = 'https://rpc-amoy.polygon.technology'

const web3 = new Web3(AMOY_RPC_URL)

const amoyNetwork = {
    chainId: '0x138C2',
    chainName: 'Amoy Testnet',
    rpcUrls: [AMOY_RPC_URL],
    nativeCurrency: {
        name: 'POL',
        symbol: 'POL',
        decimals: 18
    },
    blockExplorerUrls: ['https://amoy.blockscout.com']
}

// Contract setup
const CONTRACT_ADDRESS = '0xC6911a9789FAD5718FCc56630d34d4159F9b317A'
const CONTRACT_ABI = [
    {
        "inputs": [{ "internalType": "string", "name": "_nombreEmpresa", "type": "string" }],
        "name": "registrarEmpresa",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "registrarCliente",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

// Contract initialization
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

// Express Server Setup
const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json())

// Make sure we are connected to the network

app.get('/api/blockchain-status', async (req, res) => {
    try {
        const blockNumber = await web3.eth.getBlockNumber()
        const networkId = await web3.eth.net.getId()

        res.json({
            connected: true,
            blockNumber: blockNumber.toString(),
            networkId: networkId.toString(),
            networkName: 'Amoy Testnet'
        })
    } catch (error) {
        res.json({
            connected: false,
            error: error.message
        })
    }
})

// Routes


// Registration endpoint
app.post('/api/register', async (req, res) => {
    try {
        const { address, name, role } = req.body
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
        //console.log('Contract:', contract);

        if (role === 'empresa') {
            const tx = await contract.methods.registrarEmpresa(name).send({
                from: address,
                gas: 200000 // Add gas limit for the transaction
            })
            res.json({ success: true, transaction: tx })
        } else if (role === 'cliente') {
            const tx = await contract.methods.registrarCliente().send({
                from: address,
                gas: 200000
            })
            res.json({ success: true, transaction: tx })
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

app.use('/payment', router, paymentRoutes)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

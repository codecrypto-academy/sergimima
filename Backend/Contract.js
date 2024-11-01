const CONTRACT_ADDRESS = "0xC6911a9789FAD5718FCc56630d34d4159F9b317A"
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
    },
    {
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "name": "clientes",
        "outputs": [
            { "internalType": "address", "name": "addressCliente", "type": "address" },
            { "internalType": "address", "name": "addressEmpresa", "type": "address" },
            { "internalType": "uint256", "name": "ComprasTotales", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "name": "empresas",
        "outputs": [
            { "internalType": "address", "name": "addressEmpresa", "type": "address" },
            { "internalType": "string", "name": "nombreEmpresa", "type": "string" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

export { CONTRACT_ADDRESS, CONTRACT_ABI }
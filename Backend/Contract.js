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
        "inputs": [
            { "internalType": "uint256", "name": "_precio", "type": "uint256" },
            { "internalType": "string", "name": "_ipfsHash", "type": "string" }
        ],
        "name": "crearProducto",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "_addressCliente", "type": "address" },
            { "internalType": "uint256", "name": "_importeTotal", "type": "uint256" }
        ],
        "name": "crearFactura",
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
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "name": "productos",
        "outputs": [
            { "internalType": "address", "name": "addressEmpresa", "type": "address" },
            { "internalType": "uint256", "name": "idProducto", "type": "uint256" },
            { "internalType": "uint256", "name": "precioProducto", "type": "uint256" },
            { "internalType": "address", "name": "addressCliente", "type": "address" },
            { "internalType": "string", "name": "ipfsHash", "type": "string" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "name": "facturas",
        "outputs": [
            { "internalType": "address", "name": "addressEmpresa", "type": "address" },
            { "internalType": "address", "name": "addressCliente", "type": "address" },
            { "internalType": "uint256", "name": "numeroFactura", "type": "uint256" },
            { "internalType": "uint256", "name": "fechaaFactura", "type": "uint256" },
            { "internalType": "uint256", "name": "importeTotal", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "addressEmpresa", "type": "address" },
            { "indexed": false, "internalType": "string", "name": "nombreEmpresa", "type": "string" }
        ],
        "name": "EmpresaRegistrada",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "uint256", "name": "idProducto", "type": "uint256" },
            { "indexed": true, "internalType": "address", "name": "addressEmpresa", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "precio", "type": "uint256" }
        ],
        "name": "ProductoCreado",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "uint256", "name": "numeroFactura", "type": "uint256" },
            { "indexed": true, "internalType": "address", "name": "addressEmpresa", "type": "address" },
            { "indexed": true, "internalType": "address", "name": "addressCliente", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "importeTotal", "type": "uint256" }
        ],
        "name": "FacturaCreada",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "addressCliente", "type": "address" },
            { "indexed": true, "internalType": "address", "name": "addressEmpresa", "type": "address" }
        ],
        "name": "ClienteRegistrado",
        "type": "event"
    }
]


export { CONTRACT_ADDRESS, CONTRACT_ABI }
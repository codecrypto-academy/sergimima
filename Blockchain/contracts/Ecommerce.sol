// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ecommerce {
    struct Empresa {
        address addressEmpresa;
        string nombreEmpresa;
    }

    struct Producto {
        address addressEmpresa;
        uint256 idProducto;
        uint precioProducto;
        address addressCliente;
        string ipfsHash; // Add IPFS hash for product image
    }

    struct Factura {
        address addressEmpresa;
        address addressCliente;
        uint numeroFactura;
        uint fechaaFactura;
        uint importeTotal;
    }

    struct Cliente {
        address addressCliente;
        address addressEmpresa;
        uint ComprasTotales;
    }

    // Mappings
    mapping(address => Empresa) public empresas;
    mapping(uint256 => Producto) public productos;
    mapping(uint256 => Factura) public facturas;
    mapping(address => Cliente) public clientes;

    // Counters
    uint256 private productoCounter;
    uint256 private facturaCounter;

    // Events
    event EmpresaRegistrada(
        address indexed addressEmpresa,
        string nombreEmpresa
    );
    event ProductoCreado(
        uint256 indexed idProducto,
        address indexed addressEmpresa,
        uint precio
    );
    event FacturaCreada(
        uint256 indexed numeroFactura,
        address indexed addressEmpresa,
        address indexed addressCliente,
        uint importeTotal
    );
    event ClienteRegistrado(
        address indexed addressCliente,
        address indexed addressEmpresa
    );

    // Core functions
    function registrarEmpresa(string memory _nombreEmpresa) public {
        require(
            empresas[msg.sender].addressEmpresa == address(0),
            "Empresa ya registrada"
        );

        empresas[msg.sender] = Empresa({
            addressEmpresa: msg.sender,
            nombreEmpresa: _nombreEmpresa
        });

        emit EmpresaRegistrada(msg.sender, _nombreEmpresa);
    }

    function crearProducto(uint _precio, string memory _ipfsHash) public {
        require(
            empresas[msg.sender].addressEmpresa != address(0),
            "Empresa no registrada"
        );

        productoCounter++;
        productos[productoCounter] = Producto({
            addressEmpresa: msg.sender,
            idProducto: productoCounter,
            precioProducto: _precio,
            addressCliente: address(0),
            ipfsHash: _ipfsHash
        });

        emit ProductoCreado(productoCounter, msg.sender, _precio);
    }

    function registrarCliente() public {
        require(
            clientes[msg.sender].addressCliente == address(0),
            "Cliente ya registrado"
        );

        clientes[msg.sender] = Cliente({
            addressCliente: msg.sender,
            addressEmpresa: address(0),
            ComprasTotales: 0
        });

        emit ClienteRegistrado(msg.sender, address(0));
    }

    function crearFactura(address _addressCliente, uint _importeTotal) public {
        require(
            empresas[msg.sender].addressEmpresa != address(0),
            "Empresa no registrada"
        );
        require(
            clientes[_addressCliente].addressCliente != address(0),
            "Cliente no registrado"
        );

        facturaCounter++;
        facturas[facturaCounter] = Factura({
            addressEmpresa: msg.sender,
            addressCliente: _addressCliente,
            numeroFactura: facturaCounter,
            fechaaFactura: block.timestamp,
            importeTotal: _importeTotal
        });

        // Update client total purchases
        clientes[_addressCliente].ComprasTotales += _importeTotal;

        emit FacturaCreada(
            facturaCounter,
            msg.sender,
            _addressCliente,
            _importeTotal
        );
    }
}

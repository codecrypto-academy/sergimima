// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OrganizationRegistry {
    address public admin;
    
    struct Organization {
        string orgType;
        bool isRegistered;
    }
    
    mapping(address => Organization) public organizations;
    string[] public allowedTypes;
    
    event OrganizationRegistered(address indexed orgAddress, string orgType);
    event NewOrganizationTypeAdded(string newType);
    
    constructor() {
        admin = msg.sender;
        // Inicializar con los tipos básicos
        allowedTypes = ["Productor", "Almacen", "Distribuidor", "Minorista"];
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Solo el administrador puede realizar esta accion");
        _;
    }
    

    function transferAdminRole(address newAdmin) private {
        require(newAdmin != address(0), "Nueva direccion de admin invalida");
        address previousAdmin = admin;
        admin = newAdmin;
        emit AdminTransferred(previousAdmin, newAdmin);
    }

event AdminTransferred(address indexed previousAdmin, address indexed newAdmin);
    function registerOrganization(address _orgAddress, string memory _orgType) public onlyAdmin {
        require(!organizations[_orgAddress].isRegistered, "Organizacion ya registrada");
        require(isAllowedType(_orgType), "Tipo de organizacion no permitido");
        
        organizations[_orgAddress] = Organization(_orgType, true);
        emit OrganizationRegistered(_orgAddress, _orgType);
    }
    
    function isRegistered(address _orgAddress) public view returns (bool) {
        return organizations[_orgAddress].isRegistered;
    }
    
    function getOrganizationType(address _orgAddress) public view returns (string memory) {
        require(organizations[_orgAddress].isRegistered, "Organizacion no registrada");
        return organizations[_orgAddress].orgType;
    }
    
    function isAllowedType(string memory _type) public view returns (bool) {
        for (uint i = 0; i < allowedTypes.length; i++) {
            if (keccak256(bytes(allowedTypes[i])) == keccak256(bytes(_type))) {
                return true;
            }
        }
        return false;
    }
    
    function addOrganizationType(string memory _newType) public onlyAdmin {
        require(!isAllowedType(_newType), "Tipo de organizacion ya existe");
        allowedTypes.push(_newType);
        emit NewOrganizationTypeAdded(_newType);
    }
}



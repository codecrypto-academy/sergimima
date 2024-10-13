import React, { useState, useEffect } from 'react';
import Header from '../Header';
import WarehouseList from './adminComponents/AlmacenList';
import ProductorList from './adminComponents/ProductorList';
import MayoristaList from './adminComponents/MayoristaList';
import MinoristaList from './adminComponents/MinoristaList';
import { ethers } from 'ethers';
import OrganizationRegistryArtifact from "@blockchain/artifacts/contracts/OrganizationRegistry.sol/OrganizationRegistry.json";

const contractAddress = "0xC6911a9789FAD5718FCc56630d34d4159F9b317A";
const OrganizationRegistryABI = OrganizationRegistryArtifact.abi;

const Admin = () => {
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);
  const [activeSection, setActiveSection] = useState('usuarios');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    connectToBlockchain();
  }, []);

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  const connectToBlockchain = async () => {
    setIsLoading(true);
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setSigner(signer);

        const contractInstance = new ethers.Contract(contractAddress, OrganizationRegistryABI, signer);
        setContract(contractInstance);

        console.log("Conectado a la blockchain con éxito");
      } else {
        throw new Error("MetaMask no está instalado");
      }
    } catch (error) {
      console.error("Error connecting to blockchain:", error);
      setError("Error al conectar con la blockchain. Por favor, asegúrate de que MetaMask está instalado y conectado a la red correcta.");
    } finally {
      setIsLoading(false);
    }
  };

  const registerOrganizationOnBlockchain = async (walletAddress, role) => {
    if (!contract) {
      setError("Contract not initialized");
      return;
    }
    try {
      const tx = await contract.registerOrganization(walletAddress, role);
      await tx.wait();
      console.log(`${role} registrado en la blockchain con éxito`);
    } catch (error) {
      console.error(`Error al registrar el ${role} en la blockchain:`, error);
      setError(`Error al registrar el ${role}. Por favor, inténtalo de nuevo.`);
      throw error;
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'usuarios':
        return <div>Gestión de Usuarios</div>;
      case 'productores':
        return <ProductorList 
          contract={contract} 
          registerOrganizationOnBlockchain={(address) => registerOrganizationOnBlockchain(address, "Productor")}
        />;
      case 'productos':
        return <div>Gestión de Productos</div>;
      case 'almacenes':
        return <WarehouseList 
          contract={contract} 
          registerOrganizationOnBlockchain={(address) => registerOrganizationOnBlockchain(address, "Almacen")}
        />;
      case 'distribuidores':
        return <MayoristaList 
          contract={contract} 
          registerOrganizationOnBlockchain={(address) => registerOrganizationOnBlockchain(address, "Distribuidor")}
        />;
      case 'minoristas':
        return <MinoristaList 
          contract={contract} 
          registerOrganizationOnBlockchain={(address) => registerOrganizationOnBlockchain(address, "Minorista")}
        />;
      default:
        return <div>Seleccione una sección</div>;
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header title="Admin Dashboard">
        <nav className="flex items-center space-x-4">
          <button onClick={() => handleNavigation('usuarios')} className="text-white hover:text-gray-300">Usuarios</button>
          <button onClick={() => handleNavigation('productores')} className="text-white hover:text-gray-300">Productores</button>
          <button onClick={() => handleNavigation('almacenes')} className="text-white hover:text-gray-300">Almacenes</button>
          <button onClick={() => handleNavigation('distribuidores')} className="text-white hover:text-gray-300">Distribuidores</button>
          <button onClick={() => handleNavigation('minoristas')} className="text-white hover:text-gray-300">Minoristas</button>
          <button onClick={() => handleNavigation('productos')} className="text-white hover:text-gray-300">Productos</button>
        </nav>
      </Header>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-200 mb-6">Bienvenido al panel de administración</h1>
        {error && <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>}
        {isLoading ? (
          <div className="text-center">Conectando a la blockchain...</div>
        ) : (
          renderSection()
        )}
      </div>
    </div>
  );
};

export default Admin;

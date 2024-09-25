const Ethereum = {
    name: "Ethereum",
    hex: "0x1",
    rpcUrl: "https://eth-mainnet.g.alchemy.com/v2/57xdSdgthM9E3jC4ldeUhRgxLWiN-HTu",
    ticker: "ETH",
  };
  
  const SepoliaTestnet = {
    name: "Sepolia Testnet",
    hex: "0xAA36A7",
    rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/57xdSdgthM9E3jC4ldeUhRgxLWiN-HTu",
    ticker: "ETH",
  };
  
  export const CHAINS_CONFIG = {
    "0x1": Ethereum,
    "0xAA36A7": SepoliaTestnet,
  };
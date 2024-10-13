require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8000",  // Default Ganache GUI URL
      // or "http://127.0.0.1:8545" for Ganache CLI
      accounts: {
        mnemonic: "change range enter desk climb few core despair polar point trouble fury"
      }
    }
  }
};

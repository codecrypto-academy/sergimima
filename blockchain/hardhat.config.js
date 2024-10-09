require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",  // Default Ganache GUI URL
      // or "http://127.0.0.1:8545" for Ganache CLI
      accounts: {
        mnemonic: "your ganache mnemonic here"
      }
    }
  }
};

require("@nomicfoundation/hardhat-ignition");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    polygon_local: {
      url: "http://localhost:8546",
      accounts: ["91160fbe43418b382538a4093b1d3a140cf37e898c0323dcf20492aafc55dbec"]
    },
    polygon_amoy: {
      url: "https://rpc-amoy.polygon.technology/",
      chainId: 80002,
      accounts: ["91160fbe43418b382538a4093b1d3a140cf37e898c0323dcf20492aafc55dbec"],
      gasPrice: "auto"
    }
  }
};
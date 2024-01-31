const Web3 = require("web3")

const web3 = new Web3("http://localhost:8545")

web3.eth.getBalance("0x70e7C31D195dC1F08283cb850b9C14d64282f09A").then(saldo => {
    console.log(saldo)
} )
const {Web3} = require("web3")
const exp = require("express")
const fs = require("fs")

const web3 = new Web3("http://localhost:8545")
const app = exp();
const json = JSON.parse(fs.readFileSync("../nodo/data/keystore/UTC--2024-01-31T15-32-11.684783726Z--4624b064603f8e4c0e8cd4a8d68cea24afd868ab"))


app.get("/faucet/:address", async(req, res) => {
    const account = await web3.eth.accounts.decrypt(json, '1234')

    const tx = {
        chainId: 8888,
        to: req.params.address,
        from: account.address,
        gas: '30000',
        gasPrice: '1000',
        value: web3.utils.toWei("50", 'ether')
    }

    const txSigned = await account.signTransaction(tx)
    const respuesta = await web3.eth.sendSignedTransaction(txSigned.rawTransaction)
    res.send(respuesta)
})

app.get("/balance/:address", async (req, res) => {
    web3.eth.getBalance(req.params.address).then(saldo => {
        res.send(saldo.toString())
    } ).catch(err => {
        res.send(err)
    })
})

app.listen(3333)
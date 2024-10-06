const {ethers, JsonRpcProvider, Wallet} = require('ethers')
const httpProvider = new JsonRpcProvider('http://localhost:8545')
const fs = require('fs')

const abi = JSON.parse(fs.readFileSync('./out/contador_sol_Contador.abi').toString())
const bin = fs.readFileSync('./out/contador_sol_Contador.bin').toString()

const walletJson = `{
    "address": "96610b94e73c1504a212dc8af66a05a6a6553a4c",
    "crypto": {
        "cipher": "aes-128-ctr",
        "ciphertext": "75c9edc899f05cae0f1e0cca1e17bb50fc05ce74140c6c3527fb4e9c0aaaa157",
        "cipherparams": {
            "iv": "3d6f86e7c163d96a36592413c6b96365"
        },
        "kdf": "scrypt",
        "kdfparams": {
            "dklen": 32,
            "n": 262144,
            "p": 1,
            "r": 8,
            "salt": "39446b165b380ee762e4cc900f127affdbd9d5824fb91a087eb13a3e9a12d9f7"
        },
        "mac": "54b2d77454ef1116a6efd14979c35f28fcc8d6133e6517bbebf749b15f451695"
    },
    "id": "9e3ae26e-736a-48d6-bfe1-27ba574745e7",
    "version": 3
}`

async function main(){
    let wallet = await Wallet.fromEncryptedJsonSync(walletJson, "")
    wallet = wallet.connect(httpProvider);
    const factory = new ethers.ContractFactory(abi, bin, wallet);
    const contrato = await factory.deploy();
    await contrato.waitForDeployment();
    const contractAddress = await contrato.getAddress();
    fs.writeFileSync("./contractAddress.txt", contractAddress);
}

main()
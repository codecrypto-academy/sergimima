const fs = require("fs")
function generateGenesis(NETWORK_CHAINID, CUENTA, BALANCE, CUENTAS_ALLOC, NETWORK_DIR) {
    const timestamp = Math.round(((new Date()).getTime() / 1000)).toString(16)
    // leemos la plantilla del genesis
    let genesis = JSON.parse(fs.readFileSync('genesisbase.json').toString())

    // genesis.timestamp = `0x${timestamp}`
    genesis.config.chainId = NETWORK_CHAINID
    genesis.extraData = `0x${'0'.repeat(64)}${CUENTA}${'0'.repeat(130)}`


    genesis.alloc = CUENTAS_ALLOC.reduce((acc, item) => {
        acc[item] = { balance: BALANCE }
        return acc
    }, {})


    fs.writeFileSync(`${NETWORK_DIR}/genesis.json`, JSON.stringify(genesis))

}
const BALANCE = "0x200000000000000000000000000000000000000000000000000000000000000"
generateGenesis(3333, 
    "96610b94e73c1504a212dc8af66a05a6a6553a4c", BALANCE, 
    ["0xaE44CD32222724BBe8C474Bf358297F930b944AC",
     "0x70e7C31D195dC1F08283cb850b9C14d64282f09A", 
     "0xd1559e23f2be938d472843c8f334fff0573afd73",
        "0x96610b94e73c1504a212dc8af66a05a6a6553a4c"], ".")
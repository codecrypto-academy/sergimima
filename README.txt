docker run --rm -it -v ${PWD}/data:/data -v ${PWD}/genesis.json:/genesis.json ethereum/client-go:v1.11.5 init --datadir data /genesis.json  

docker run --rm -it -v ${PWD}/data/keystore:/data  ethereum/client-go:v1.11.5 account new --keystore /data   ###We get the address

docker run -d -p 8545:8545 --name eth-node-8888 -v ${PWD}/data:/data ethereum/client-gov:1.11.5 --datadir data --http --http.api persona,admin,eth,net,web3 --http.addr 0.0.0.0 --http.port 8545 --mine --miner.etherbase 13a9c2df3cae12ded2abd5cba0d23434d3459478 --miner.threads 1 --http.corsdomain="*" 

docker logs eth-node-8888   
const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3001;

app.use(cors());
app.use(express.json());
//0x70e7C31D195dC1F08283cb850b9C14d64282f09A

app.get("/getTokens", async (req, res) => {
    const {userAddress, chain} = req.query;
    const tokens = await Moralis.EvmApi.token.getWalletTokenBalances({
        chain: chain,
        address: userAddress,
    });

    const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
        chain: chain,
        address: userAddress,
        mediaItems: true,
    });
    
    const myNfts = nfts.raw.result.map((e, i) => {
        if (e?.media?.media_collection?.high?.url && !e.possible_spam && e?.media?.category !== "video"){
        }
    });

    const balance = await Moralis.EvmApi.balance.getNativeBalance({
        chain: chain,
        address: userAddress,
    });

    const jsonResponse = {
        tokens: tokens.raw,
        nfts: myNfts,
        balance: balance.raw.balance / (10 ** 18),
    };
    //console.log(tokens.raw);
    return res.status(200).json(jsonResponse);

});

Moralis.start({
    apiKey: process.env.MORALIS_KEY,
}).then(() => {
    app.listen(port, () => {
        console.log(`Listening for API Calls`);
    });
})


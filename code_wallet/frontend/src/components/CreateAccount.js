import React from "react";
import { Button, Card } from "antd";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {ethers} from "ethers";

const CreateAccount = ({setWallet, setSeedPhrase}) => {
  const [newSeedPhrase, setNewSeedPhrase] = useState(null);
  const navigate = useNavigate();

  function generateWallet(){
    const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
    setNewSeedPhrase(mnemonic)
  }

  function setWalletAndMnemonic(){
    setSeedPhrase(newSeedPhrase);
    setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address)
  }

  return (
    <>
    <div className="content">
      <div className="mnemonic">
        <ExclamationCircleOutlined style={{fontSize: "20px"}} />
        <div>
          Una vez que generes la frase semilla, guárdala de forma segura para poder recuperar tu billetera en el futuro.
        </div>
      </div>
      <Button className="frontPageButton" type="primary" onClick={() => generateWallet()}>Generar frase semilla</Button>
      <Card className="seedPhraseContainer">{newSeedPhrase && (<pre style={{whiteSpace: "pre-wrap"}}>{newSeedPhrase}</pre>)}</Card>
      <Button className="frontPageButton" type="default" onClick={() => setWalletAndMnemonic()}>Abrir tu billetera</Button>
      <p className="frontPageBottom" onClick={() => navigate("/")}>Regresar</p>
    </div>
    </>
  )
}

export default CreateAccount;
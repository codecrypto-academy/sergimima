import "./App.css";
import {useState} from "react";
import logo from "./logo.png";
import {Select} from "antd";
import {Routes, Route} from "react-router-dom";
import WalletView from "./components/WalletView";
import RecoverAccounts from "./components/RecoverAccount";
import CreateAccount from "./components/CreateAccount";
import Home from "./components/Home"


const App = () => {

  const [wallet, setWallet] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [selectedChain, setSelectedChain] = useState("0x1");

  return (
    <div className="App">
      <header>
        <img src={logo} className="headerLogo" alt="logo" />
        <Select 
        onChange={(val) => setSelectedChain(val)}
        value={selectedChain}
        options={[
          {
            label: "Ethereum",
            value: "0x1",
          },
          {
            label: "Mumbai Testnet",
            value: "0x13881",
          },
          {
            label: "Sepolia Testnet",
            value: "0xAA36A7",
          },
        ]}
        className="dropdown"
        ></Select>
      </header>

      {wallet && seedPhrase ? (
        <Routes>
          <Route path="/yourwallet" element={
              <WalletView
                wallet={wallet}
                setWallet={setWallet}
                seedPhrase = {seedPhrase}
                setSeedPhrase={setSeedPhrase}
                selectedChain={selectedChain}
                />
            }
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recover" element={
              <RecoverAccounts
                setSeedPhrase ={setSeedPhrase}
                setWallet = {setWallet}
                />
            }
          />
        <Route path="/yourwallet" element={
            <CreateAccount
              setSeedPhrase ={setSeedPhrase}
              setWallet = {setWallet}
              />
          }
          />
        </Routes>
      )}
      </div>
  );
};

export default App;

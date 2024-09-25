import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="content">
        <h2>CodeWallet</h2>
        <h4 className="h4">Bienvenido a tu Wallet</h4>
        <Button onClick={() => navigate("/yourwallet")}
        className="frontPageButton green"
        type="primary"
        >
          Crear una cuenta
        </Button>
        <Button onClick={() => navigate("/recover")}
        className="frontPageButton"
        type="default"
        >
          Accede con tu frase semilla
        </Button>
        <p className="frontPageBottom">
          Aprende Web3 en: {" "} <a href="https://codecrypto.academy/" target="_blank" rel="noreferrer">codecrypto.academy</a>
        </p>
      </div>
    </>

  );
};

export default Home;
import React, { useState } from "react";
import logo from "../img/logo.svg";
import { Container } from "../styles/LoginCadasterPageStyle";
import { TypesLoginData, TypesData, TypesLogged } from "../types/types";
import Login from "./Login";
import Cadaster from "./Cadaster";

export default function LoginCadasterPage(
  props: TypesLoginData & TypesData & TypesLogged
) {
  const [signUpMode, setSignUpMode] = useState(false);

  return (
    <>
      <Container signUpMode={signUpMode}>
        <div className="forms-container">
          <div className="sign-in-sign-up">
            <Login
              isLogged={props.isLogged}
              setIsLogged={props.setIsLogged}
              loginData={props.loginData}
              setLoginData={props.setLoginData}
            />
            <Cadaster data={props.data} setData={props.setData} />
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Quer mais segurança em suas corridas?</h3>
              <p>
                Crie agora seu círculo de amigos e compartilhe a sua
                localização.
              </p>
              <button
                className="btn transparent"
                onClick={() => setSignUpMode(true)}
                id="sign-up-btn"
              >
                Criar Conta
              </button>
            </div>
            <img src={logo} alt="" className="image" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Você já possuí uma conta?</h3>
              <p>
                Acesse agora a sua conta, compartilhe sua localização e tenha
                mais segurança!
              </p>
              <button
                className="btn transparent"
                onClick={() => {
                  setSignUpMode(false);
                }}
                id="sign-in-btn"
              >
                Faça Login
              </button>
            </div>
            <img src={logo} alt="" className="image" />
          </div>
        </div>
      </Container>
    </>
  );
}

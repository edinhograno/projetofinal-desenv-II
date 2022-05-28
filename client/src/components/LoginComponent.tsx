import React, { useState } from "react";
import styled from "styled-components";
import rocket from "../img/logo.svg";
import pressplay from "../img/pressplay.svg";

type Types = {
  signUpMode: boolean;
  setSignUpMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const Container = styled.div.attrs((props: Types) => ({
  signUpMode: props.signUpMode,
}))`
  font-family: "Poppins", sans-serif;
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  overflow: hidden;

  margin: 0 auto;

  &:before {
    content: "";
    position: absolute;
    width: 2000px;
    height: 2000px;
    border-radius: 50%;
    background: linear-gradient(-45deg, #181a1d 0%, #2f3131 100%);
    top: -10%;
    right: ${(props) => (props.signUpMode ? "52%" : "48%")};
    transform: ${(props) =>
      props.signUpMode ? "translate(100%, -50%)" : "translateY(-50%)"};
    z-index: 6;
    transition: 1.8s ease-in-out;
  }

  .forms-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .sign-in-sign-up {
    position: absolute;
    top: 50%;
    left: ${(props) => (props.signUpMode ? "25%" : "75%")};
    transform: translate(-50%, -50%);
    width: 50%;
    display: grid;
    grid-template-columns: 1fr;
    z-index: 5;
    transition: 1s 0.7s ease-in-out;
  }
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 5rem;
    overflow: hidden;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    transition: 0.2s 0.7s ease-in-out;
  }
  form.sign-in-form {
    z-index: ${(props) => (props.signUpMode ? "1" : "2")};
    opacity: ${(props) => (props.signUpMode ? "0" : "1")};
  }
  form.sign-up-form {
    z-index: ${(props) => (props.signUpMode ? "2" : "1")};
    opacity: ${(props) => (props.signUpMode ? "1" : "0")};
  }
  .title {
    font-size: 2.2rem;
    color: #444;
    margin-bottom: 10px;
  }
  .input-field {
    max-width: 380px;
    width: 100%;
    height: 55px;
    background-color: #f0f0f0;
    margin: 10px 0;
    border-radius: 55px;
    display: grid;
    grid-template-columns: 15% 85%;
    padding: 0 0.4rem;
  }
  .input-field i {
    text-align: center;
    line-height: 55px;
    color: #acacac;
    font-size: 1.1rem;
  }
  .input-field input {
    background: none;
    outline: none;
    border: none;
    line-height: 1;
    font-weight: 600;
    font-size: 1.1rem;
    color: #333;

    &::placeholder {
      color: #aaa;
      font-weight: 500;
    }
  }

  .btn {
    width: 150px;
    height: 49px;
    border: none;
    outline: none;
    border-radius: 49px;
    cursor: pointer;
    background-color: #4273b9;
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;
    margin: 10px 0;
    transition: 0.5s;

    &:hover {
      background-color: #4d84e2;
    }
  }
  .social-text {
    display: none;
    padding: 0.7rem 0;
    font-size: 1rem;
  }
  .social-media {
    display: none;
    justify-content: center;
  }
  .social-icon {
    height: 46px;
    width: 46px;
    border: 1px solid #333;
    margin: 0 0.45rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #333;
    font-size: 1.1rem;
    border-radius: 50%;
    transition: 0.3s;

    &:hover {
      color: #4273b9;
      border-color: #4273b9;
    }
  }
  .panels-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .panel {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    text-align: center;
    z-index: 6;
  }
  .panel .content {
    max-width: 600px;
    color: #fff;
    transition: 1.1s 0.4s ease-in-out;
  }
  .panel h3 {
    font-weight: 600;
    line-height: 1;
    font-size: 1.5rem;
  }
  .panel p {
    font-size: 0.95rem;
    padding: 0.7rem 0;
  }
  .btn.transparent {
    margin: 0;
    background: none;
    border: 2px solid #fff;
    width: 130px;
    height: 41px;
    font-weight: 600;
    font-size: 0.8rem;
  }
  .left-panel {
    pointer-events: ${(props) => (props.signUpMode ? "none" : "all")};
    padding: 3rem 17% 2rem 12%;
  }
  .right-panel {
    pointer-events: ${(props) => (props.signUpMode ? "all" : "none")};
    padding: 3rem 12% 2rem 17%;
  }
  .image {
    width: 100%;
    max-width: 600px;
    transition: 0.9s 0.6s ease-in-out;
  }
  .left-panel .image {
    opacity: ${(props) => (props.signUpMode ? "0" : "1")};
  }
  .right-panel .image {
    opacity: ${(props) => (props.signUpMode ? "1" : "0")};
  }

  .left-panel .content,
  .left-panel .image {
    transform: ${(props) => props.signUpMode && "translateX(-800px)"};
  }

  .right-panel .content,
  .right-panel .image {
    transform: ${(props) => (props.signUpMode ? "0px" : "translateX(800px)")};
  }

  /* animations */
`;

export default function LoginComponent() {
  const [signUpMode, setSignUpMode] = useState(false);
  return (
    <>
      <Container signUpMode={signUpMode}>
        <div className="forms-container">
          <div className="sign-in-sign-up">
            <form action="" className="sign-in-form">
              <h2 className="title">Login</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Email" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Senha" />
              </div>
              <input type="submit" value="Login" className="btn solid" />
              <p className="social-text">Login com</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
            <form action="" className="sign-up-form">
              <h2 className="title">Criar Conta</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Nome" />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="text" placeholder="E-mail" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Senha" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Confirmar Senha" />
              </div>
              <input type="submit" value="Sign up" className="btn solid" />
              <p className="social-text">Login com</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
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
            <img src={rocket} alt="" className="image" />
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
                onClick={() => setSignUpMode(false)}
                id="sign-in-btn"
              >
                Faça Login
              </button>
            </div>
            <img src={rocket} alt="" className="image" />
          </div>
        </div>
      </Container>
    </>
  );
}

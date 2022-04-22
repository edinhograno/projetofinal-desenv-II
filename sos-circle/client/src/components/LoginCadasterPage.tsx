import React from "react";
import styled from "styled-components";

type Types = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Login = styled.div.attrs((props: Types) => ({
  isLogin: props.isLogin,
}))`
  background-color: #111;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;

  .container-login {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 40px 15px 20px;
  }

  .logo {
    background-color: #f0f0f0;
    max-width: 390px;
    height: ${(props) => (props.isLogin ? "40%" : "15%")};
    width: 100%;
    border-radius: 20px 20px 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 50px;
  }
  .wrap-login {
    width: 100%;
    height: ${(props) => (props.isLogin ? "60%" : "85%")};
    max-width: 390px;
    background-color: #333;
    border-radius: 0px 0px 20px 20px;
    overflow: hidden;
    padding: 50px 55px 0px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
  }

  .login-form {
    width: 100%;
  }

  .login-form-title {
    display: block;
    font-size: 30px;
    color: azure;
    line-height: 1.2;
    text-align: center;
    padding-bottom: 50px;
  }

  .wrapper-input {
    width: 100%;
    position: relative;
    border-bottom: 2px solid #adadad;
    margin-bottom: 37px;
  }

  .input {
    font-size: 15px;
    color: #fff;
    line-height: 1.2;
    border: none;
    display: block;
    width: 100%;
    height: 45px;
    background-color: transparent;
    padding: 0 5px;
  }

  .input:focus {
    outline: none;
  }

  .focus-input {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    color: #adadad;
  }

  .focus-input::before {
    content: "";
    display: block;
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    transition: all 0.4s;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    -o-transition: all 0.4s;
    background: linear-gradient(to left, #21d4fd, #b721ff);
    background: -webkit-linear-gradient(to left, #21d4fd, #b721ff);
    background: -moz-linear-gradient(to left, #21d4fd, #b721ff);
    background: -o-linear-gradient(to left, #21d4fd, #b721ff);
  }

  .focus-input::after {
    font-size: 15px;
    color: #999;
    line-height: 1.2;
    content: attr(data-placeholder);
    display: block;
    width: 100%;
    position: absolute;
    top: 16px;
    left: 0px;
    padding-left: 5px;
    transition: all 0.4s;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    -o-transition: all 0.4s;
  }

  .input:focus + .focus-input::after {
    top: -15px;
  }
  .input:focus + .focus-input::before {
    width: 100%;
  }

  .has-value + .focus-input::after {
    top: -15px;
  }
  .has-value + .focus-input::before {
    width: 100%;
  }

  .container-login-form-btn {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 13px;
  }
  .login-form-btn {
    font-size: 15px;
    border: none;
    border-radius: 10px;
    color: #fff;
    line-height: 1.2;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    cursor: pointer;
    background: linear-gradient(to left, #21d4fd, #b721ff);
    background: -webkit-linear-gradient(to left, #21d4fd, #b721ff);
    background: -moz-linear-gradient(to left, #21d4fd, #b721ff);
    background: -o-linear-gradient(to left, #21d4fd, #b721ff);
  }

  .text-center {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  }
  .txt1,
  .txt2 {
    font-size: 14px;
    line-height: 1.5;
    text-decoration: none;
  }
  .txt2 {
    color: #6a7dfe;
    margin-left: 5px;
  }
  .txt1 {
    color: #adadad;
  }

  @media only screen and (min-width: 810px) {
    .container-login {
      max-width: 1200px;
    }
    .logo,
    .wrap-login {
      height: ${(props) => (props.isLogin ? "60%" : "85%")};
    }
    .logo {
      border-radius: 20px 0px 0px 20px;
    }
    .wrap-login {
      border-radius: 0px 20px 20px 0px;
    }
  }

  @media only screen and (min-width: 1100px) {
    .logo {
      max-width: 600px;
    }
  }
`;

export default function LoginCadasterPage(props: Types) {
  return (
    <Login isLogin={props.isLogin}>
      <div className="container-login">
        <div className="logo">LOGO</div>
        {props.isLogin ? (
          <div className="wrap-login">
            <form className="login-form">
              <span className="login-form-title">Bem vindo!</span>
              <div className="wrapper-input">
                <input
                  className={`input ${props.email && "has-value"}`}
                  type="email"
                  value={props.email}
                  onChange={(e) => props.setEmail(e.target.value)}
                />
                <span className="focus-input" data-placeholder="E-mail"></span>
              </div>
              <div className="wrapper-input">
                <input
                  className={`input ${props.password && "has-value"}`}
                  type="password"
                  value={props.password}
                  onChange={(e) => props.setPassword(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Senha"></span>
              </div>
              <div className="container-login-form-btn">
                <button className="login-form-btn">Entrar</button>
              </div>
              <div className="text-center">
                <span className="txt1">Não possui conta?</span>
                <a
                  href="#"
                  className="txt2"
                  onClick={() => props.setIsLogin(!props.isLogin)}
                >
                  Criar conta.
                </a>
              </div>
            </form>
          </div>
        ) : (
          <div className="wrap-login">
            <form className="login-form">
              <span className="login-form-title">Crie sua conta</span>
              <div className="wrapper-input">
                <input
                  className={`input ${props.name && "has-value"}`}
                  type="email"
                  value={props.name}
                  onChange={(e) => props.setName(e.target.value)}
                />
                <span
                  className="focus-input"
                  data-placeholder="Digite seu nome"
                ></span>
              </div>
              <div className="wrapper-input">
                <input
                  className={`input ${props.email && "has-value"}`}
                  type="email"
                  value={props.email}
                  onChange={(e) => props.setEmail(e.target.value)}
                />
                <span
                  className="focus-input"
                  data-placeholder="Digite seu e-mail"
                ></span>
              </div>
              <div className="wrapper-input">
                <input
                  className={`input ${props.password && "has-value"}`}
                  type="password"
                  value={props.password}
                  onChange={(e) => props.setPassword(e.target.value)}
                />
                <span
                  className="focus-input"
                  data-placeholder="Digite uma senha"
                ></span>
              </div>
              <div className="wrapper-input">
                <input
                  className={`input ${props.confirmPassword && "has-value"}`}
                  type="password"
                  value={props.confirmPassword}
                  onChange={(e) => props.setConfirmPassword(e.target.value)}
                />
                <span
                  className="focus-input"
                  data-placeholder="Confirme sua senha"
                ></span>
              </div>
              <div className="container-login-form-btn">
                <button className="login-form-btn">Criar conta</button>
              </div>
              <div className="text-center">
                <span className="txt1">Já possui conta?</span>
                <a
                  href="#"
                  className="txt2"
                  onClick={() => props.setIsLogin(!props.isLogin)}
                >
                  Faça Login.
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </Login>
  );
}

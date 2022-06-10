import axios from "axios";
import React from "react";
import { login } from "../api/api";
// import { login } from "../api/api";
import { TypesLogged, TypesLoginData } from "../types/types";

export default function Login(props: TypesLoginData & TypesLogged) {
  const checkUserCredentials = () => {
    const email = props.loginData.email;
    const password = props.loginData.password;
    const setIsLogged = props.setIsLogged;

    if (email === "" && password === "") {
      console.log("Digite os campos corretamente");
    } else {
      const data = login(email, password, setIsLogged);
      console.log(data);
    }
  };

  return (
    <div className="sign-in-form form">
      <h2 className="title">Login</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) =>
            props.setLoginData({
              ...props.loginData,
              email: e.target.value,
            })
          }
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) =>
            props.setLoginData({
              ...props.loginData,
              password: e.target.value,
            })
          }
        />
      </div>
      <button className="btn solid" onClick={() => checkUserCredentials()}>
        Login
      </button>
      {/* <p className="social-text">Login com</p>
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
      </div> */}
    </div>
  );
}

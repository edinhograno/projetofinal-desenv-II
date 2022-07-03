import React, { useState } from "react";
import { register } from "../api/api";
import { TypesData } from "../types/types";

export default function Cadaster(props: TypesData) {
  const [status, setStatus] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const registerChecker = () => {
    const email = props.data.email;
    const name = props.data.name;
    const password = props.data.password;
    const confirmPassword = props.data.confirmPassword;

    if (email !== "" && name !== "" && password !== "") {
      if (password !== confirmPassword) {
        setStatus({ ...status, password: true, confirmPassword: true });
      } else {
        register(name, email, password);
      }
    } else {
      if (name === "") {
        setStatus({ ...status, name: true });
      } else if (email === "") {
        setStatus({ ...status, email: true });
      } else if (password === "") {
        setStatus({ ...status, password: true });
      } else if (confirmPassword === "") {
        setStatus({ ...status, confirmPassword: true });
      }
    }
  };

  return (
    <div className="sign-up-form form">
      <h2 className="title">Criar Conta</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) =>
            props.setData({ ...props.data, name: e.target.value })
          }
        />
      </div>

      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input
          type="text"
          placeholder="E-mail"
          onChange={(e) =>
            props.setData({ ...props.data, email: e.target.value })
          }
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) =>
            props.setData({ ...props.data, password: e.target.value })
          }
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Confirmar Senha"
          onChange={(e) =>
            props.setData({
              ...props.data,
              confirmPassword: e.target.value,
            })
          }
        />
      </div>
      <button className="btn solid" onClick={() => registerChecker()}>
        Criar Conta
      </button>
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
    </div>
  );
}

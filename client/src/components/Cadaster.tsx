import React, { useState } from "react";
import { register } from "../api/api";
import { Types } from "../types/types";

export default function Cadaster(props: Types) {
  const [status, setStatus] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const registerChecker = () => {
    console.log(props.data);
    if (
      props.data.email !== "" &&
      props.data.name !== "" &&
      props.data.password !== ""
    ) {
      if (props.data.password !== props.data.confirmPassword) {
        setStatus({ ...status, password: true, confirmPassword: true });
        console.log(status);
      } else {
        register(props.data.name, props.data.email, props.data.password);
        console.log("foi pra api");
      }
    } else {
      if (props.data.name === "") {
        setStatus({ ...status, name: true });
        console.log(status);
      } else if (props.data.email === "") {
        setStatus({ ...status, email: true });
        console.log(status);
      } else if (props.data.password === "") {
        setStatus({ ...status, password: true });
        console.log(status);
      } else if (props.data.confirmPassword === "") {
        setStatus({ ...status, confirmPassword: true });
        console.log(status);
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

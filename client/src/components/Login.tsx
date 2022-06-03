import React from "react";
import { Types } from "../types/types";

export default function Login(props: Types) {
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
      <button
        className="btn solid"
        onClick={() => console.log("ainda não faz nada")}
      >
        Login
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

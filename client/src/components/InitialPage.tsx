import React, { useState } from "react";
import LoginCadasterPage from "./LoginCadasterPage";

export default function InitialPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <LoginCadasterPage
      isLogin={isLogin}
      setIsLogin={setIsLogin}
      name={name}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      setName={setName}
      setEmail={setEmail}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
    />
  );
}

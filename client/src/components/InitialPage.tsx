import React, { useState } from "react";
import LoginCadasterPage from "./LoginCadasterPage";

export default function InitialPage() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  return (
    <LoginCadasterPage
      loginData={loginData}
      setLoginData={setLoginData}
      data={data}
      setData={setData}
    />
  );
}

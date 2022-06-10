import React, { useState } from "react";
import LoginCadasterPage from "./LoginCadasterPage";
import { TypesLogged } from "../types/types";

export default function InitialPage(props: TypesLogged) {
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
      isLogged={props.isLogged}
      setIsLogged={props.setIsLogged}
      loginData={loginData}
      setLoginData={setLoginData}
      data={data}
      setData={setData}
    />
  );
}

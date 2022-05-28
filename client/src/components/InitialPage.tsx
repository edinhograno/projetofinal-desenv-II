import React, { useEffect, useState } from "react";
import LoginCadasterPage from "./LoginCadasterPage";

export default function InitialPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [teste, setTeste] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/user");
        const json = await response.json();
        setTeste(json.users);
        console.log(teste);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <LoginCadasterPage
      isLogin={isLogin}
      setIsLogin={setIsLogin}
      data={data}
      setData={setData}
    />
  );
}

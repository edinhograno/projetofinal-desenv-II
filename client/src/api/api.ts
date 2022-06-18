import axios from "axios";
import { baseURL } from "../types/types";

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  await axios
    .post(`${baseURL}/register`, {
      name: name,
      email: email,
      password: password,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const login = async (
  email: string,
  password: string,
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
) => {
  await axios
    .post(`${baseURL}/credentials`, {
      email: email,
      password: password,
    })
    .then((res) => {
      if (res.data === "False") {
        window.alert("Login ou senha errados");
      } else {
        const data = res.data[0];
        const values = [data.name, data.email, data.userid];
        setIsLogged(true);
        localStorage.setItem("userdata", JSON.stringify(values));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const newCircle = async (
  circlename: string,
  owneruserid: string,
  token: string
) => {
  await axios
    .post(`${baseURL}/newcircle`, {
      circlename: circlename,
      owneruserid: owneruserid,
      token: token,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const enterCircle = async (
  token: string,
  userid: string,
  online: boolean | number
) => {
  await axios
    .post(`${baseURL}/entercircle`, {
      token: token,
      userid: userid,
      online: online,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

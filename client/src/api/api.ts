import axios from "axios";

const baseURL = "http://localhost:5000";

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
    });
};

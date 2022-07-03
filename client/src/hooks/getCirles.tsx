import axios from "axios";
import { baseURL } from "./../types/types";

async function getCircles(userid: string) {
  let data;
  try {
    data = await axios.post(`${baseURL}/circles`, { userid: userid });
  } catch (err) {
    console.log(err);
  }
  return data;
}

export default getCircles;

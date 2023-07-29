import axios from "axios";

import { getToken } from "./storage";
const BASE_URL = "http://192.168.8.129:8080";

// const BASE_URL = "http://localhost:8000";
const instance = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   Accept: "application/json, text/plain, /",
  //   "Content-Type": "multipart/form-data",
  // },
});

instance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use((res) => {
  console.log(res);
  return res;
});

export { BASE_URL };
export default instance;

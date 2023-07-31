import axios from "axios";

import { getToken } from "./storage";
// const BASE_URL = "http://192.168.8.181:8000";

const BASE_URL = "http://localhost:8000";
const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use((res) => {
  return res;
});

export { BASE_URL };
export default instance;

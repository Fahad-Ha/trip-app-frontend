import axios from "axios";

const BASE_URL = "https://localhost:5000";
const instance = axios.create({
  baseURL: BASE_URL + "/api",
});
export { BASE_URL };
export default instance;

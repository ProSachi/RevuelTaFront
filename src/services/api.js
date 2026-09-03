import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  timeout: import.meta.env.VITE_TIMEOUT_PETICION, 
});

export default api;

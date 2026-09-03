import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  timeout: Number(import.meta.env.VITE_TIMEOUT_PETICION) || 10000,
});

export default api;
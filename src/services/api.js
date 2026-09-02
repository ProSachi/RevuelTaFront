import axios from 'axios'

// Instancia central de Axios. Cuando el backend esté disponible,
// solo se ajusta baseURL/interceptors aquí; las páginas no cambian.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para adjuntar el JWT cuando exista sesión (lo define el módulo de Autenticación).
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('revuelta_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api

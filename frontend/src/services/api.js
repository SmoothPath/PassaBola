// services/api.js (frontend)
import axios from "axios";

// Configurar a base URL da API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth",
});

// Interceptar respostas para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

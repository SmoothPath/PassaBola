// frontend/src/services/posts.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Configuração base do axios
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const postsService = {
  // Listar todos os posts
  async getAll() {
    const response = await api.get("/api/posts");
    return response.data;
  },

  // Buscar post por ID
  async getById(id) {
    const response = await api.get(`/api/posts/${id}`);
    return response.data;
  },

  // Criar novo post
  async create(postData) {
    const response = await api.post("/api/posts", postData);
    return response.data;
  },

  // Atualizar post
  async update(id, postData) {
    const response = await api.put(`/api/posts/${id}`, postData);
    return response.data;
  },

  // Deletar post
  async delete(id) {
    const response = await api.delete(`/api/posts/${id}`);
    return response.data;
  },
};
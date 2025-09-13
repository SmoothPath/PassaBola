// frontend/src/services/eventos.js
import api from './api';

// Lista eventos
export const listEventos = (params = {}) => api.get('/eventos', { params });

// Cria evento
export const createEvento = (payload) => api.post('/eventos', payload);

// Lê evento
export const getEvento = (id) => api.get(`/eventos/${id}`);

// Atualiza evento
export const updateEvento = (id, payload) => api.put(`/eventos/${id}`, payload);

// Remove evento
export const deleteEvento = (id) => api.delete(`/eventos/${id}`);

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

export const inscreverNoEvento = (id) => api.post(`/eventos/${id}/inscrever`);
export const desinscreverDoEvento = (id) => api.post(`/eventos/${id}/desinscrever`);

// (se aplicar o patch de backend para remover um inscrito específico)
export const removerInscrito = (id, email) => api.delete(`/eventos/${id}/inscritos/${encodeURIComponent(email)}`);

// Cria o qr code
export const getQrDoEvento = (id) => api.get(`/eventos/${id}/qrcode`);
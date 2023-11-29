// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Substitua pela URL da sua API
});

// Interceptador para tratar erros de requisição
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro de requisição:', error);
    return Promise.reject(error);
  }
);

export default api;

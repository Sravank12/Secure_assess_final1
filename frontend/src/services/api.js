import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return api.post('/auth/login', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getCurrentUser: () => api.get('/auth/me'),
};

// Services API
export const servicesAPI = {
  getAll: (serviceType = null) => {
    const params = serviceType ? { service_type: serviceType } : {};
    return api.get('/services', { params });
  },
  getOne: (id) => api.get(`/services/${id}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
};

// Bookings API
export const bookingsAPI = {
  getAll: () => api.get('/bookings'),
  getOne: (id) => api.get(`/bookings/${id}`),
  create: (data) => api.post('/bookings', data),
  verifyOTP: (id, otpCode) => api.post(`/bookings/${id}/verify-otp`, { otp_code: otpCode }),
  complete: (id) => api.post(`/bookings/${id}/complete`),
};

// Health API
export const healthAPI = {
  submitDeclaration: (data) => api.post('/health-declarations', data),
};

// Stats API
export const statsAPI = {
  getDashboard: () => api.get('/stats/dashboard'),
};

export default api;

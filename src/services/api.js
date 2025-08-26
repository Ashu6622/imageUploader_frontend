import axios from 'axios';
import { getToken, logout } from '../utils/auth';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
};

// Folder API calls
export const folderAPI = {
  getFolders: (parentId = null) => api.get('/folders', { params: { parentId } }),
  createFolder: (folderData) => api.post('/folders', folderData),
  getFolder: (id) => api.get(`/folders/${id}`),
  deleteFolder: (id) => api.delete(`/folders/${id}`),
};

// Image API calls
export const imageAPI = {
  uploadImage: (formData) => api.post('/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getImages: (folderId = null, search = '') => api.get('/images', {
    params: { folderId, search }
  }),
  deleteImage: (id) => api.delete(`/images/${id}`),
};

export default api;
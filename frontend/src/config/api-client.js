import axios from 'axios';
import { getTokenFromStorage } from '../services/storageService';

const apiUrl = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
    baseURL: '/api',
});

apiClient.interceptors.request.use(
    config => {
        if (!config.url?.includes('/login') && !config.url?.includes('/register')) {
            const token = getTokenFromStorage();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    error => Promise.reject(error)
);

export default apiClient;
import axios from 'axios';
import * as authHelper from './../../helpers/auth-helper';
// Create an Axios instance
const api = axios.create({
    baseURL: process.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor if you need to attach token dynamically
api.interceptors.request.use(
    (config) => {

        const token = authHelper.getAuth(); //localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
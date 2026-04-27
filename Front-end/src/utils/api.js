import axios from 'axios';
import toast from 'react-hot-toast';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Implement secure setup, fetch token from localStorage/cookies
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Universal success handling
    // We only show success toast if the API returned a specific success message,
    // to avoid spamming the user on normal GET requests.
    if (response.data && response.data.message) {
      // You can refine this check based on your actual API structure
      if (['post', 'put', 'patch', 'delete'].includes(response.config.method?.toLowerCase())) {
        toast.success(response.data.message);
      }
    }
    return response;
  },
  (error) => {
    // Universal error handling
    let errorMessage = 'An unexpected error occurred';

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorMessage = error.response.data?.message || error.response.data?.error || `Error ${error.response.status}: Request failed`;
      
      if (error.response.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('token');
        // Prevent multiple redirects if we have multiple failing requests
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'No response from server. Please check your connection.';
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message;
    }

    toast.error(errorMessage);
    return Promise.reject(error);
  }
);

export default api;

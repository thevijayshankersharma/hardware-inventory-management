import axios from 'axios';

// Use environment variable for API URL or fallback to production URL
const API_URL = process.env.REACT_APP_API_URL || 'https://hardware-inventory-management.onrender.com/api';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: API_URL,
});

// Intercept requests to include the token for authorization, if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Generic request function with error handling
const request = async (method, url, data = null) => {
  try {
    const response = await api({
      method,
      url,
      data,
    });
    return response.data; // Return the response data
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Request failed';
    throw new Error(errorMessage); // Handle errors gracefully
  }
};

// API functions
export const register = (credentials) => request('post', '/auth/register', credentials);
export const login = (credentials) => request('post', '/auth/login', credentials);
export const getHardware = () => request('get', '/hardware');
export const addHardware = (hardware) => request('post', '/hardware', hardware);
export const updateHardware = (id, hardware) => request('put', `/hardware/${id}`, hardware);
export const deleteHardware = (id) => request('delete', `/hardware/${id}`);

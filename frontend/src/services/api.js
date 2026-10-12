/**
 * API Service
 * Handles all HTTP requests to the backend API
 */

import axios from 'axios';

// Base API URL - uses proxy configured in vite.config.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🌐 API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Employee API Service
 */
export const employeeService = {
  /**
   * Get all employees
   */
  getAll: async () => {
    try {
      const response = await api.get('/api/employees');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch employees');
    }
  },

  /**
   * Get single employee by ID
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/api/employees/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch employee');
    }
  },

  /**
   * Create new employee
   */
  create: async (employeeData) => {
    try {
      const response = await api.post('/api/employees', employeeData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to create employee');
    }
  },

  /**
   * Update employee
   */
  update: async (id, employeeData) => {
    try {
      const response = await api.put(`/api/employees/${id}`, employeeData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update employee');
    }
  },

  /**
   * Delete employee
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/api/employees/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete employee');
    }
  },

  /**
   * Check API health
   */
  checkHealth: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('API health check failed');
    }
  }
};

export default api;

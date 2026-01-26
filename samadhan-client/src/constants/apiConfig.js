// API Configuration
export const API_BASE_URL = 'http://localhost:8080';

// API Endpoints
export const API_ENDPOINTS = {
  GRIEVANCE: {
    CREATE: '/grievance',
    GET_ALL: '/grievance',
    UPDATE: (id) => `/grievance/${id}`,
    DELETE: (id) => `/grievance/${id}`,
  },
  CATEGORY: {
    GET_ALL: '/category',
    GET_BY_ID: (id) => `/category/${id}`,
  },
};

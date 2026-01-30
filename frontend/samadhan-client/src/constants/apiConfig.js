// API Configuration
export const API_BASE_URL = "http://localhost:8080";
export const API_AUTH_BASE_URL = "http://localhost:8081";
export const API_NOTIFICATION_BASE_URL = "http://localhost:8083";


// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  GRIEVANCE: {
    CREATE: "/grievance",
    GET_ALL: "/grievance",
    GET_COUNT: "/grievance/count",
    UPDATE: (id) => `/grievance/${id}`,
    DELETE: (id) => `/grievance/${id}`,
    STATUS_CHANGE: '/grievance/statusChange',
    ASSIGN: (id) => `/grievance/${id}/assign`,
  },
  CATEGORY: {
    GET_ALL: "/category",
    GET_BY_ID: (id) => `/category/${id}`,


    ADD_DEPARTMENT: "/category",
  },
};

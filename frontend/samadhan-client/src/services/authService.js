import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/auth';

// Register user
export const register = async (name, email, password, role = 'USER', deptId = null, deptName = null) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      name,
      email,
      password,
      role,
      deptId,
      deptName,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login user
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all authorities
export const getAllAuthorities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/authorities`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
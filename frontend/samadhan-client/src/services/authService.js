import axios from "axios";

const API_BASE_URL = "http://localhost:8081/auth";

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper to extract clean message
const getErrorMessage = (error) => {
  if (error.response?.data) {
    if (typeof error.response.data === "string") return error.response.data;
    if (error.response.data.message) return error.response.data.message;
    return JSON.stringify(error.response.data);
  }
  return error.message || "Something went wrong";
};

// ================= USER REGISTER =================
export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post("/register", {
      name,
      email,
      password,
      role: "USER",
    });
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

// ================= CREATE AUTHORITY =================
export const createAuthority = async (name, email, password, deptId, deptName) => {
  try {
    const response = await api.post("/create-authority", {
      name,
      email,
      password,
      role: "AUTHORITY",
      deptId: Number(deptId),
      deptName,
    });
    return response.data;
  } catch (error) {
    console.error("Create authority error:", error.response?.data);
    throw getErrorMessage(error);
  }
};

// ================= LOGIN =================
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });

    const data = response.data;

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    return data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

// ================= GET AUTHORITIES =================
export const getAllAuthorities = async () => {
  try {
    const response = await api.get("/authorities");
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

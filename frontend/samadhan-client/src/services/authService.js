import axios from "axios";

const API_BASE_URL = "http://localhost:8081/auth";

// ✅ Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Automatically attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// ================= USER REGISTER (PUBLIC) =================
export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post("/register", {
      name,
      email,
      password,
      role: "USER", // Backend will treat this as normal user
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


// ================= ADMIN CREATES AUTHORITY (PROTECTED) =================
export const createAuthority = async (name, email, password, deptId, deptName) => {
  try {
    const response = await api.post("/create-authority", {
      name,
      email,
      password,
      deptId,
      deptName,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
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

    // ✅ Save token + role for future requests
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


// ================= GET ALL AUTHORITIES (ADMIN ONLY) =================
export const getAllAuthorities = async () => {
  try {
    const response = await api.get("/authorities");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

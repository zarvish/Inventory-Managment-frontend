import axios from "axios";

const api = axios.create({
  baseURL: "https://inventory-management-backend-ipnz.onrender.com/",
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to the Authorization header
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

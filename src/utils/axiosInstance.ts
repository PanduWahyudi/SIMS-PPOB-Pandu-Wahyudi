import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivateInstance = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosPrivateInstance.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem("token");
    const token = tokenString ? JSON.parse(tokenString).value : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

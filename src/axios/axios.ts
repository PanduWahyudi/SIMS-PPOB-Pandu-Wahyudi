import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.com", // Use the proxy path
  headers: {
    "Content-Type": "application/json",
  },
});

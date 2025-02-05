import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api", // Use the proxy path
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivateInstance = axios.create({
  baseURL: "/api", // Use the proxy path
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

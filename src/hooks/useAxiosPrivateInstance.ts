import { useEffect } from "react";
import { axiosInstance } from "../axios/axios";

const useAxiosPrivateInstance = () => {
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const token = JSON.parse(localStorage.getItem("token") || "").value;
        // const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return axiosInstance;
};

export default useAxiosPrivateInstance;

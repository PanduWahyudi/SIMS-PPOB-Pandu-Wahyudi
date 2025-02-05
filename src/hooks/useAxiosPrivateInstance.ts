import { useEffect } from "react";
import { axiosPrivateInstance } from "../axios/axios";

const useAxiosPrivateInstance = () => {
  useEffect(() => {
    const requestInterceptor = axiosPrivateInstance.interceptors.request.use(
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
      axiosPrivateInstance.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return axiosPrivateInstance;
};

export default useAxiosPrivateInstance;

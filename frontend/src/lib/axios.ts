// lib/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    "X-SHPAZY-AUTH": "4sa2e7shpazy1b3f9a",
  },
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const sellerToken = localStorage.getItem("auth-storage")
      ? JSON.parse(localStorage.getItem("auth-storage")!)?.state?.token
      : "";
    const token =
      sellerToken ?? localStorage.getItem(process.env.SHOP_AZANY_Token_Name!); // or use another secure storage method
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

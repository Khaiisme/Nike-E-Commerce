import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";
console.log(REACT_APP_API_URL);

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // To include cookies if needed
});

export default axiosInstance;

import axios from "axios";

// Configuración global de Axios
const axiosInstance = axios.create({
  baseURL: "https://ramoja-tours.up.railway.app", // Tu base URL
});

// Interceptor para agregar el token a todas las solicitudes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

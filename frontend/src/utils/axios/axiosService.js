import axios from "axios";

const axiosApi = axios.create({
  baseURL: "https://ramoja-tours.up.railway.app/api",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default axiosApi;



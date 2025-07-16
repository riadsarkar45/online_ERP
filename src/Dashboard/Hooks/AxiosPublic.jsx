
import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: "http://localhost:3000/api",
  // baseURL: "https://server-seven-rho-30.vercel.app/api",
});

export default axiosPublic;

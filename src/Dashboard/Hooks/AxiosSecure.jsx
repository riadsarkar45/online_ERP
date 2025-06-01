import axios from 'axios';

const axiosSecure = axios.create({
    // baseURL: "http://localhost:3000/api",
     baseURL: "https://server-seven-rho-30.vercel.app/api",
  });
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;
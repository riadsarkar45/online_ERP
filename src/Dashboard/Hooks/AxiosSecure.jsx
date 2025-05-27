import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: "http://localhost:3000/api",
    //  baseURL: "https://southdragon.mygamesonline.org",
  });
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;
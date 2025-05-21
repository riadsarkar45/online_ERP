import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: "http://localhost/southDragon/phpServer/pages/",
    //  baseURL: "https://southdragon.mygamesonline.org",
  });
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AuthContext } from './Firebase/AuthProvider';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
    baseURL: "https://server-seven-rho-30.vercel.app/api",
    // baseURL: "http://localhost:3000/api", // use this for local
});

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('access-token');
                if (token && token !== 'null' && token !== 'undefined') {
                    config.headers.Authorization = `Bearer ${token}`;
                } else {
                    delete config.headers.Authorization;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response?.status;
                if (status === 401 || status === 403) {
                    await logOut();
                    navigate('/');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;

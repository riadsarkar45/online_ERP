import { useContext } from 'react';
import { AuthContext } from './Firebase/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './AxiosSecure';
const useUserRole = () => {
    const { user, isLoading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const token = localStorage.getItem('access-token');
    const {
        data: usersRole,
        isPending: isUserRoleLoading,
        error
    } = useQuery({
        queryKey: [user?.email, 'userRole'],
        enabled: !!user?.email && !!token && !isLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/role/${user?.email}`);
            return res.data;
        },
        retry: false
    });

    return [usersRole, isUserRoleLoading, error];
};

export default useUserRole;

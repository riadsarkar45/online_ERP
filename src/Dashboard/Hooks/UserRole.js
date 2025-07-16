import { useContext } from 'react';
import { AuthContext } from './Firebase/AuthProvider';
import useAxiosSecure from './AxiosSecure';
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from 'react-router';

const UserRole = () => {
    const { user, isLoading, logOut } = useContext(AuthContext)
    const navigate = useNavigate();
    const AxiosSecure = useAxiosSecure();
    const { data: usersRole, isPending: isUserRoleLoading } = useQuery({
        queryKey: [user?.email, 'userRole'],
        enabled: !isLoading && !!user?.email,
        queryFn: async () => {
            const res = await AxiosSecure.get(`/user/role/${user?.email}`);
            console.log(res.data);
            if(!res.data.role) {
                await logOut();
                return navigate('/');
            }
            return res.data;
        }
    })
    return [usersRole, isUserRoleLoading];
};
export default UserRole;
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UserRole from '../UserRole';
import { AuthContext } from '../Firebase/AuthProvider';

const AdminRoute = ({ children }) => {
  const [usersRole, isUserRoleLoading] = UserRole();
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading || isUserRoleLoading) return <div>Loading...</div>;

  if (user && usersRole?.role === 'admin') {
    return children;
  }

  const previousPath = location.state?.from || '/dashboard';
  return <Navigate to={previousPath} replace />;
};

export default AdminRoute;

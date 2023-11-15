import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

const PrivateRoutes = () => {
  const { authState } = useAuth();
  
  return (
    authState.isAuthenticated? <Outlet /> : <Navigate to='/login' />
  );
};

export default PrivateRoutes;

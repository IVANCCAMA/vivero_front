import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

const PrivateRoute = ({ element: Element, requiredRole, ...rest }) => {
  const { authState } = useAuth();
  
  return (
    <Route
      {...rest}
      element={(
        authState.isAuthenticated
          ? (requiredRole ? <Element /> : <Navigate to="/" />)
          : <Navigate to="/" />
      )}
    />
  );
};

export default PrivateRoute;

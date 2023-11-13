import {  Route, Navigate } from 'react-router-dom';
import {  useAuth } from './AuthContext';

function ProtectedRoute({ element, ...rest }) {
    const { authState } = useAuth();
  
    // Si el usuario está autenticado, renderiza el elemento, de lo contrario, redirige a la página de inicio de sesión
    return authState.isAuthenticated ? (
      <Route {...rest} element={element} />
    ) : (
      <Navigate to="/" replace state={{ from: rest.location }} />
    );
}

export default ProtectedRoute;
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '@/context/contexts';

const ProtectedRoute = ({ element, allowedRoles, isDevMode = false }) => {
  const { userRole } = useContext(UserContext);

  // If in dev mode, allow access to all routes
  if (isDevMode) {
    return element;
  }

  // If user's role is included in allowedRoles, grant access
  return allowedRoles.includes(userRole) ? element : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;

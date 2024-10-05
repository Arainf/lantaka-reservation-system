import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '@/context/contexts';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { userRole } = useContext(UserContext);

  // If user's role is included in allowedRoles, grant access
  return allowedRoles.includes(userRole) ? element : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;

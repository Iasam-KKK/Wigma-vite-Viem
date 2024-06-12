import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const accessToken = localStorage.getItem('access_token');

  return accessToken ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
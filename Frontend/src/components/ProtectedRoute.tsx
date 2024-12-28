import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


// Define the JWT payload interface to match your backend structure
interface JWTPayload {
  sub: string;      // email/username (from UserDetails)
  role: string;     // role without ROLE_ prefix
  iss: string;      // "Parker"
  iat: number;      // issued at timestamp
  exp: number;      // expiration timestamp
}

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

// Helper function to get redirect path based on role
const getRedirectPath = (role: string): string => {
  switch (role) {
    case 'SYSTEM_ADMIN':
      return '/superAdminHomePage';
    case 'PARKING_MANAGER':
      return '/ParkingManagerHomePage';
    case 'DRIVER':
      return '/driverHomePage';
    default:
      return '/login';
  }
};

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const decoded = jwtDecode<JWTPayload>(token);
    
    // Check token expiration
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check if user has required role
    if (!allowedRoles.includes(decoded.role)) {
      // Redirect to appropriate homepage based on role
      const redirectPath = getRedirectPath(decoded.role);
      return <Navigate to={redirectPath} replace />;
    }

    return <>{children}</>;
  } catch (error) {
    // Handle invalid token
    console.error('Token validation error:', error);
    localStorage.removeItem('token');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};
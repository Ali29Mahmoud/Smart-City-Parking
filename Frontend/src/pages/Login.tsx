import { useNavigate } from 'react-router-dom';

// ...existing code...

export default function Login() {
  const navigate = useNavigate();
  // ...existing code...

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, userId, role } = response.data;
      
      setUserData(token, userId, role);
      console.log('Login successful:', { userId, role });
      
      // Force reload user data
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (role === 'DRIVER') {
        navigate('/driver/home', { replace: true });
      } else if (role === 'ADMIN') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        console.error('Unknown role:', role);
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid credentials');
    }
  };

  // ...existing code...
}

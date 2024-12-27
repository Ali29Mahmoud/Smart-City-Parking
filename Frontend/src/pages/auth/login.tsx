import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        await login('google', response.access_token);
        navigate('/dashboard');
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to SmartPark
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <Button
            onClick={() => googleLogin()}
            className="w-full flex items-center justify-center"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-6 h-6 mr-2"
            />
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';
import axios from 'axios';
import api from '../api/axios';
import {jwtDecode} from 'jwt-decode'; // You'll need to install this: npm install jwt-decode

interface JWTPayload {
  sub: string;
  role: string;
  iss: string;
  iat: number;
  exp: number;
}

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const getRedirectPath = (role: string): string => {
    switch (role) {
      case 'SYSTEM_ADMIN':
        return '/systemAdminHomePage';
      case 'PARKING_MANAGER':
        return '/ParkingManagerHomePage';
      case 'DRIVER':
        return '/driverHomePage';
      default:
        return '/login';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await api.post('/login', {
      email: email,
      password: password,
    });

    if (response.status === 200) {
      const {token, userId} = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId.toString());

      // Set the default Authorization header for all future axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Decode the JWT to get the role
      const decoded: JWTPayload = jwtDecode<JWTPayload>(token);
      const redirectPath = getRedirectPath(decoded.role);

      // Store role in localStorage for future use if needed
      localStorage.setItem('userRole', decoded.role);

      navigate(redirectPath);
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};


  return (
    <AuthLayout title="Sign in to ParkSmart">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <AuthInput
          label="Email address"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthInput
          label="Password"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign in
        </button>
      </form>

      <div className="mt-6">
        <div className="text-sm text-center">
          <span className="text-gray-600">Don't have an account?</span>{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
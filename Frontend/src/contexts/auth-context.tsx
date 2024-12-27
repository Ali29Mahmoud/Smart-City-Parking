import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@/types';
import { parkingApi } from '@/services/api';

interface AuthContextType {
  user: User | null;
  login: (provider: 'google', token: string) => Promise<void>;
  logout: () => void;
  updateUserRole: (role: User['role']) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      parkingApi.getCurrentUser()
        .then(response => setUser(response.data))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (provider: 'google', token: string) => {
    try {
      const response = await parkingApi.loginWithGoogle(token);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const updateUserRole = async (role: User['role']) => {
    try {
      const response = await parkingApi.updateUserRole(role);
      setUser(response.data);
    } catch (error) {
      console.error('Role update failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
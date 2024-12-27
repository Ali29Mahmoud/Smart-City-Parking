import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Car, Building2, Shield } from 'lucide-react';

export const RoleSelectionPage = () => {
  const navigate = useNavigate();
  const { updateUserRole } = useAuth();

  const handleRoleSelect = async (role: 'driver' | 'manager' | 'admin') => {
    await updateUserRole(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Choose your role
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Select how you'll be using SmartPark
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Button
            onClick={() => handleRoleSelect('driver')}
            className="w-full flex items-center justify-center space-x-2 p-4"
          >
            <Car className="w-6 h-6" />
            <span>Driver</span>
          </Button>

          <Button
            onClick={() => handleRoleSelect('manager')}
            className="w-full flex items-center justify-center space-x-2 p-4"
          >
            <Building2 className="w-6 h-6" />
            <span>Parking Lot Manager</span>
          </Button>

          <Button
            onClick={() => handleRoleSelect('admin')}
            className="w-full flex items-center justify-center space-x-2 p-4"
          >
            <Shield className="w-6 h-6" />
            <span>System Administrator</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
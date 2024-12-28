import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthInput } from '../components/auth/AuthInput';

export function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    licensePlate: '',
    phoneNumber: '',
  });
  const navigate = useNavigate();


  interface DriverDTO {
    id?: number;
    email: string;
    hashedPassword: string;
    phoneNumber: string;
    licencePlate: string;
    name: string;
    hasUnpaidPenalties?: boolean;
    createdAt?: string;
    updatedAt?: string;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create the DTO object from your form data
      const driverDTO: DriverDTO = {
        email: formData.email,
        hashedPassword: formData.password, // Note: You might want to hash this before sending
        phoneNumber: formData.phoneNumber,
        licencePlate: formData.licensePlate,
        name: formData.name,
        hasUnpaidPenalties: false, // Default value
      };
  
      const response = await fetch('http://localhost:8081/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(driverDTO),
      });
  
      if (!response.ok) {
        throw new Error(`Registration failed: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Registration successful:', data);
      
      // If registration is successful, navigate to the app
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <AuthLayout title="Create your account">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <AuthInput
          label="Full name"
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <AuthInput
          label="Email address"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <AuthInput
          label="Password"
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <AuthInput
          label="License plate number"
          id="licensePlate"
          name="licensePlate"
          type="text"
          required
          value={formData.licensePlate}
          onChange={handleChange}
        />

        <AuthInput
          label="Phone Number"
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          required
          value={formData.phoneNumber}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create account
        </button>
      </form>

      <div className="mt-6">
        <div className="text-sm text-center">
          <span className="text-gray-600">Already have an account?</span>{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
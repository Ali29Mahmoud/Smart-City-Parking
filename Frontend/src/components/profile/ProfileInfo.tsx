import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Icons } from '../icons';
import type { Profile } from '../../types/Profile';

export function ProfileInfo() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:8081/api/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile information');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const getInitials = (email: string, name: string | null) => {
    if (name) {
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
    }
    return email.slice(0, 2).toUpperCase();
  };

  const getRandomColor = (email: string) => {
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-purple-100 text-purple-600',
      'bg-green-100 text-green-600',
      'bg-pink-100 text-pink-600',
      'bg-indigo-100 text-indigo-600',
    ];
    const index = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-gray-200 p-8 rounded-full" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-48" />
            <div className="h-3 bg-gray-200 rounded w-32" />
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="h-3 bg-gray-200 rounded w-24 mb-1" />
              <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 text-red-600">
          <Icons.AlertCircle className="h-5 w-5" />
          <p>{error || 'Profile not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <div className={`p-6 rounded-full ${getRandomColor(profile.email)}`}>
            <span className="text-2xl font-semibold">
              {getInitials(profile.email, profile.name)}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{profile.name}</h2>
            <div className="flex items-center space-x-2 text-gray-600">
              <Icons.Mail className="h-4 w-4" />
              <p>{profile.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <Icons.Phone className="h-4 w-4" />
                <span className="text-sm font-medium">Phone Number</span>
              </div>
              <p className="text-gray-900">{profile.phoneNumber}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <Icons.Car className="h-4 w-4" />
                <span className="text-sm font-medium">License Plate</span>
              </div>
              <p className="text-gray-900">{profile.licensePlate}</p>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Account Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <Icons.Shield className="h-4 w-4" />
                <span className="text-sm font-medium">Role</span>
              </div>
              <p className="text-gray-900 capitalize">{profile.role.toLowerCase()}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <Icons.Calendar className="h-4 w-4" />
                <span className="text-sm font-medium">Member Since</span>
              </div>
              <p className="text-gray-900">
                {format(new Date(profile.createdAt), 'MMMM d, yyyy')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 bg-gray-50 rounded-b-xl border-t border-gray-100">
        <div className="flex space-x-3">
          <button 
            onClick={() => setIsEditing(true)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg 
                     hover:bg-blue-700 transition-colors duration-150
                     flex items-center justify-center space-x-2"
          >
            <Icons.Edit2 className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
          <button 
            className="bg-gray-100 text-gray-600 py-2 px-4 rounded-lg 
                     hover:bg-gray-200 transition-colors duration-150
                     flex items-center justify-center space-x-2"
          >
            <Icons.Download className="h-4 w-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Icons } from '../icons';

export function ProfileInfo() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-full">
          <Icons.User className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="text-gray-600">john.doe@example.com</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">License Plate</label>
          <p className="mt-1 text-gray-900">ABC 123</p>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700">Phone Number</label>
          <p className="mt-1 text-gray-900">+1 (555) 123-4567</p>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700">Member Since</label>
          <p className="mt-1 text-gray-900">January 2024</p>
        </div>
      </div>
      
      <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
        Edit Profile
      </button>
    </div>
  );
}
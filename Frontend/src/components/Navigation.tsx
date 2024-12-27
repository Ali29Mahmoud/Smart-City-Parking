import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icons } from './icons';

export function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Icons.Car className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">ParkSmart</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 ${
                location.pathname === '/' ? 'bg-gray-100' : ''
              }`}
            >
              <Icons.Dashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/profile"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 ${
                location.pathname === '/profile' ? 'bg-gray-100' : ''
              }`}
            >
              <Icons.User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            
            <button className="flex items-center space-x-2 px-4 py-2 text-red-600 rounded-lg hover:bg-red-50">
              <Icons.LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
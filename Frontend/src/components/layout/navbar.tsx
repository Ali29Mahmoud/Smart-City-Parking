import React from 'react';
import { Link } from 'react-router-dom';
import { Car, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Car className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl">SmartPark</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link to="/reservations">
              <Button variant="ghost">My Reservations</Button>
            </Link>
            <div className="border-l border-gray-200 h-6 mx-2" />
            <Link to="/profile">
              <Button variant="ghost" className="p-2">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" className="p-2">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
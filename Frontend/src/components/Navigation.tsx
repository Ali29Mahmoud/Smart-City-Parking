import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icons } from "./icons";

export function Navigation() {
  const location = useLocation();

  // Helper to determine the base path based on current location
  const getBasePath = () => {
    if (location.pathname.includes('driverHomePage')) return '/driverHomePage';
    if (location.pathname.includes('parkingManagerHomePage')) return '/parkingManagerHomePage';
    if (location.pathname.includes('systemAdminHomePage')) return '/systemAdminHomePage';
    return '';
  };

  const getNavItemClass = (path: string) => {
    const fullPath = `${getBasePath()}${path}`;
    return `flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors ${
      location.pathname === fullPath ? "bg-gray-100 text-blue-600" : "text-gray-700"
    }`;
  };

  // Don't show navigation on login or signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Main Logo/Home Link */}
          <Link
            to={getBasePath()}
            className="flex items-center space-x-3 text-gray-900"
          >
            <Icons.Car className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">ParkSmart</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <Link
              to={`${getBasePath()}/notifications`}
              className={getNavItemClass("/notifications")}
            >
              <div className="relative">
                <Icons.Bell className="h-5 w-5" />
                {/* Notification badge - show when there are notifications */}
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </div>
              <span className="hidden sm:inline">Notifications</span>
            </Link>

            {/* Profile */}
            <Link
              to={`${getBasePath()}/profile`}
              className={getNavItemClass("/profile")}
            >
              <Icons.User className="h-5 w-5" />
              <span className="hidden sm:inline">Profile</span>
            </Link>

            {/* Logout */}
            <button
              className="flex items-center space-x-2 px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              onClick={() => window.location.href = "/login"}
            >
              <Icons.LogOut className="h-5 w-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

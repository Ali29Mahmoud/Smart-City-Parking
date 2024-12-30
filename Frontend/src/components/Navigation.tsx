import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icons } from "./icons";
import { useNotifications } from '../contexts/NotificationContext';

export function Navigation() {
  const location = useLocation();
  const { unreadCount, updateUnreadCount } = useNotifications();

  // Initial fetch
  useEffect(() => {
    updateUnreadCount();
  }, [updateUnreadCount]);

  // Polling
  useEffect(() => {
    const interval = setInterval(() => {
      updateUnreadCount();
    }, 30000);

    return () => clearInterval(interval);
  }, [updateUnreadCount]);

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
            {/* Reservations */}
            <Link
              to={`${getBasePath()}/reservations`}
              className={getNavItemClass("/reservations")}
            >
              <Icons.Calendar className="h-5 w-5" />
              <span className="hidden sm:inline">Reservations</span>
            </Link>

            {/* Notifications with Badge */}
            <Link
              to={`${getBasePath()}/notifications`}
              className={getNavItemClass("/notifications")}
            >
              <div className="relative">
                <Icons.Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full border-2 border-white">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
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

import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icons } from "./icons";
import { getNotifications, markNotificationAsRead, logout } from "../api/axios";
import { Notification } from "../types/notification";
import { NotificationItem } from './NotificationItem';
import { getUserId } from "../utils/auth";

export function Navigation() {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      console.log('Starting notification fetch...');
      const data = await getNotifications();
      console.log(getUserId());
      console.log('Received notifications:', data);
      setNotifications(data);
    } catch (error) {
      console.error('Navigation component fetch error:', error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchNotifications();
    // Fetch notifications every minute
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = async (id: number) => {
    try {
      await markNotificationAsRead(id);
      setNotifications(notifications.map(notif => 
        notif.id === id ? { ...notif, status: 'READ' } : notif
      ));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const getNavItemClass = (path: string) => {
    return `flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors ${
      location.pathname === path ? "bg-gray-100 text-blue-600" : "text-gray-700"
    }`;
  };

  const unreadCount = notifications.filter(n => n.status === 'UNREAD').length;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Main Logo/Home Link */}
          <Link
            to="/"
            className={`flex items-center space-x-3 ${
              location.pathname === "/" ? "text-blue-600" : "text-gray-900"
            }`}
          >
            <Icons.Car className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">ParkSmart</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={async () => {
                  setShowNotifications(!showNotifications);
                  if (!showNotifications) {
                    console.log('Fetching fresh notifications...');
                    await fetchNotifications();
                  }
                }}
                className={getNavItemClass("/notifications")}
              >
                <div className="relative">
                  <Icons.Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">{unreadCount}</span>
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Notifications</span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="text-xs text-gray-500">{unreadCount} unread</span>
                    )}
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {loading ? (
                      <div className="flex justify-center items-center py-8">
                        <Icons.Loader className="h-6 w-6 animate-spin text-blue-500" />
                      </div>
                    ) : notifications.length === 0 ? (
                      <div className="px-4 py-6 text-center text-gray-500">
                        <Icons.InboxX className="h-8 w-8 mx-auto mb-2" />
                        <p>No notifications</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                          onClick={handleNotificationClick}
                        />
                      ))
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <Link 
                      to="/notifications" 
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      onClick={() => setShowNotifications(false)}
                    >
                      View all notifications
                      <Icons.ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Penalties */}
            <Link to="/penalties" className={getNavItemClass("/penalties")}>
              <Icons.AlertTriangle className="h-5 w-5" />
              <span className="hidden sm:inline">Penalties</span>
            </Link>

            {/* Profile */}
            <Link to="/profile" className={getNavItemClass("/profile")}>
              <Icons.User className="h-5 w-5" />
              <span className="hidden sm:inline">Profile</span>
            </Link>

            {/* Logout */}
            <button
              className="flex items-center space-x-2 px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              onClick={logout}
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

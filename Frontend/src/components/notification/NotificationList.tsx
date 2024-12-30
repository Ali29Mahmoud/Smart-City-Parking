import React, { useState, useEffect } from "react";
import { NotificationCard } from "./NotificationCard";
import { Notification } from "../../types/Notification";
import { useNotifications } from "../../contexts/NotificationContext";
import { Icons } from "../icons";

export function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { decrementCount, updateUnreadCount } = useNotifications();

  const driverId = localStorage.getItem("userId");
  const API_BASE_URL = "http://localhost:8081/api/notifications";

  const fetchNotifications = async () => {
    if (!driverId) {
      setError("User ID not found");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/${driverId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const data: Notification[] = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setError("Failed to load notifications");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/markAsRead/${id}`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      // Optimistically update the count
      decrementCount();
      
      // Update local state
      setNotifications(
        notifications.map((notification) =>
          notification.id === id
            ? { ...notification, status: "READ" }
            : notification
        )
      );

      // Update the actual count in the background
      updateUnreadCount();
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      setError("Failed to mark notification as read");
    }
  };

  const handleDelete = async (id: number) => {
    if (!driverId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${id}/${driverId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete notification");
      }

      // Update local state
      setNotifications(notifications.filter((n) => n.id !== id));
      // Update the count in case we deleted an unread notification
      updateUnreadCount();
    } catch (error) {
      console.error("Failed to delete notification:", error);
      setError("Failed to delete notification");
    }
  };

  const handleDeleteAll = async () => {
    if (!driverId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/all/${driverId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete all notifications");
      }

      // Clear local state
      setNotifications([]);
      // Update the count
      updateUnreadCount();
    } catch (error) {
      console.error("Failed to delete all notifications:", error);
      setError("Failed to delete all notifications");
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-red-600">
          <Icons.AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={fetchNotifications}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isLoading ? "Loading..." : "Refresh"}
          </button>
          {notifications.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No notifications found</p>
      ) : (
        <div className="space-y-2">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              {...notification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

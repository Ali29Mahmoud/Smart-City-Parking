import React, { useState, useEffect } from "react";
import { NotificationCard } from "./NotificationCard";
import { Notification, NotificationStatus } from "../../types/Notification";

export function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Fetch notifications when component mounts
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

      // Update local state
      setNotifications(
        notifications.map((notification) =>
          notification.id === id
            ? { ...notification, status: NotificationStatus.READ }
            : notification
        )
      );
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
    } catch (error) {
      console.error("Failed to delete all notifications:", error);
      setError("Failed to delete all notifications");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Notifications</h2>
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

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

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

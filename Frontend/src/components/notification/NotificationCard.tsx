import React from "react";
import { Icons } from "../icons";
import {
  Notification,
  NotificationPriority,
  NotificationStatus,
  NotificationType,
} from "../../types/Notification";

interface NotificationCardProps extends Notification {
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
}

export function NotificationCard({
  id,
  message,
  createdAt,
  priority,
  status,
  type,
  onMarkAsRead,
  onDelete,
}: NotificationCardProps) {
  const getPriorityColor = (priority: NotificationPriority) => {
    switch (priority) {
      case NotificationPriority.HIGH:
        return "text-red-600";
      case NotificationPriority.MEDIUM:
        return "text-yellow-600";
      case NotificationPriority.LOW:
        return "text-blue-600";
    }
  };

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.ALERT:
        return <Icons.AlertTriangle className="h-5 w-5" />;
      case NotificationType.PAYMENT:
        return <Icons.DollarSign className="h-5 w-5" />;
      case NotificationType.REMINDER:
        return <Icons.Clock className="h-5 w-5" />;
    }
  };

  const isUnread = status === NotificationStatus.SENT;
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <div
      className={`p-4 mb-2 rounded-lg border ${
        !isUnread ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={getPriorityColor(priority)}>
              {getTypeIcon(type)}
            </span>
            <p className={`${!isUnread ? "text-gray-600" : "text-gray-900"}`}>
              {message}
            </p>
          </div>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
        <div className="flex space-x-2">
          {isUnread && (
            <button
              onClick={() => onMarkAsRead(id)}
              className="text-blue-600 hover:text-blue-800"
              title="Mark as read"
            >
              <Icons.Check className="h-5 w-5" />
            </button>
          )}
          <button
            onClick={() => onDelete(id)}
            className="text-red-600 hover:text-red-800"
            title="Delete"
          >
            <Icons.Trash className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Notification } from '../types/notification';
import { Icons } from './icons';

interface NotificationItemProps {
  notification: Notification;
  onClick: (id: number) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClick }) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'ALERT':
        return <Icons.AlertCircle className="h-6 w-6 text-red-500" />;
      case 'REMINDER':
        return <Icons.Clock className="h-6 w-6 text-yellow-500" />;
      case 'PAYMENT':
        return <Icons.CreditCard className="h-6 w-6 text-green-500" />;
      default:
        return <Icons.Bell className="h-6 w-6 text-blue-500" />;
    }
  };

  return (
    <div
      onClick={() => onClick(notification.id)}
      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-start space-x-3 
        ${!notification.isRead ? 'bg-blue-50' : ''}`}
    >
      <div className="flex-shrink-0">
        {getNotificationIcon(notification.type)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800">{notification.message}</p>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(notification.timestamp).toLocaleString()}
        </p>
      </div>
      {!notification.isRead && (
        <div className="flex-shrink-0">
          <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
        </div>
      )}
    </div>
  );
};

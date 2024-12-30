import React from "react";
import { NotificationList } from "../components/notification/NotificationList";

export function NotificationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h1>
        <NotificationList />
      </div>
    </div>
  );
}

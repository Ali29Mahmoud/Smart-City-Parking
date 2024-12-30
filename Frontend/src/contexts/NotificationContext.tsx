import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface NotificationContextType {
  unreadCount: number;
  updateUnreadCount: () => Promise<void>;
  decrementCount: () => void;
  resetCount: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0);

  const updateUnreadCount = useCallback(async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `http://localhost:8081/api/notifications/unread/count/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch notifications count");
      const count = await response.json();
      setUnreadCount(count);
    } catch (error) {
      console.error("Error updating unread notifications:", error);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    updateUnreadCount();
  }, [updateUnreadCount]);

  // Polling at a shorter interval (10 seconds)
  useEffect(() => {
    const interval = setInterval(updateUnreadCount, 10000);
    return () => clearInterval(interval);
  }, [updateUnreadCount]);

  // Optimistic updates
  const decrementCount = useCallback(() => {
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const resetCount = useCallback(() => {
    setUnreadCount(0);
  }, []);

  return (
    <NotificationContext.Provider value={{ 
      unreadCount, 
      updateUnreadCount, 
      decrementCount,
      resetCount 
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}; 
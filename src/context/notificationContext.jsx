import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const NotificationContext = createContext(undefined);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Use environment variable for the API base URL
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const fetchUnreadNotifications = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notifications/unread`);
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }, [API_BASE_URL]);

  const createNotification = useCallback(async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notifications/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to create notification');
      }
      await fetchUnreadNotifications(); // Refresh the list after creating
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  }, [API_BASE_URL, fetchUnreadNotifications]);

  const markAllAsRead = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notifications/markRead`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error('Failed to mark notifications as read');
      }
      setNotifications([]); // Clear the notifications list
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  }, [API_BASE_URL]);

  // Add real-time polling
  useEffect(() => {
    const pollInterval = setInterval(() => {
      fetchUnreadNotifications();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(pollInterval);
  }, [fetchUnreadNotifications]);

  const value = {
    notifications,
    fetchUnreadNotifications,
    createNotification,
    markAllAsRead,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

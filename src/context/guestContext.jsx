'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNotifications } from "@/context/notificationContext";

const GuestContext = createContext();

export const useGuestContext = () => {
  const context = useContext(GuestContext);
  if (!context) {
    throw new Error('useGuestContext must be used within a GuestProvider');
  }
  return context;
};

export const GuestProvider = ({ children }) => {
  const [guests, setGuests] = useState([]);
  const [selectedGuestId, setSelectedGuestId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { createNotification } = useNotifications();

  // Use environment variable for the API base URL
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const fetchGuests = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/guests`);
      if (!response.ok) {
        throw new Error('Failed to fetch guests');
      }
      const data = await response.json();
      setGuests(data);
    } catch (err) {
      setError(err.message);
      createNotification({
        type: 'Error',
        description: 'Failed to fetch guests. Please try again.',
        role: 'employee',
      });
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL, createNotification]);

  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  const selectGuest = (guestId) => {
    setSelectedGuestId(guestId);
  };

  const deleteGuest = async (guestId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/deleteGuests/${guestId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the guest');
      }
      setGuests(prevGuests => prevGuests.filter(guest => guest.guest_id !== guestId));
      if (selectedGuestId === guestId) {
        setSelectedGuestId(null);
      }
      createNotification({
        type: 'Deleted',
        description: `Guest with ID ${guestId} has been deleted.`,
        role: 'employee',
      });
      return { success: true, message: 'Guest deleted successfully' };
    } catch (err) {
      setError(err.message);
      createNotification({
        type: 'Error',
        description: `Failed to delete guest: ${err.message}`,
        role: 'employee',
      });
      return { success: false, message: err.message };
    }
  };

  const value = {
    guests,
    selectedGuestId,
    isLoading,
    error,
    selectGuest,
    deleteGuest,
    refreshGuests: fetchGuests,
  };

  return <GuestContext.Provider value={value}>{children}</GuestContext.Provider>;
};

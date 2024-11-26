import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNotifications } from "@/context/notificationContext"; // Assuming a notification context is used.

const RoomTypeContext = createContext(undefined);

export const useRoomTypeContext = () => {
  const context = useContext(RoomTypeContext);
  if (!context) {
    throw new Error('useRoomTypeContext must be used within a RoomTypeProvider');
  }
  return context;
};

export const RoomTypeProvider = ({ children }) => {
  const [roomTypes, setRoomTypes] = useState([]);
  const { createNotification } = useNotifications();

  const fetchRoomTypes = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/roomTypes');
      if (!response.ok) {
        throw new Error('Failed to fetch room types');
      }
      const data = await response.json();
      setRoomTypes(data);
    } catch (error) {
      console.error('Error fetching room types:', error);
    }
  }, []);

  const addRoomType = useCallback(async (roomType) => {
    try {
      const response = await fetch('http://localhost:5000/api/roomTypes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomType),
      });
      if (!response.ok) {
        throw new Error('Failed to add room type');
      }
      await fetchRoomTypes();
      createNotification({
        type: 'Added',
        description: `Room type "${roomType.room_type_name}" was added.`,
        role: 'employee',
      });
    } catch (error) {
      console.error('Error adding room type:', error);
    }
  }, [fetchRoomTypes, createNotification]);

  const updateRoomType = useCallback(async (id, roomType) => {
    try {
      const response = await fetch(`http://localhost:5000/api/roomTypes/${id}`, {
        method: 'PUT',
        body: roomType instanceof FormData ? roomType : JSON.stringify(roomType),
        headers: roomType instanceof FormData ? {} : { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Failed to update room type');
      }
      await fetchRoomTypes();
      createNotification({
        type: 'Modified',
        description: `Room type "${roomType.room_type_name || id}" was updated.`,
        role: 'employee',
      });
    } catch (error) {
      console.error('Error updating room type:', error);
    }
  }, [fetchRoomTypes, createNotification]);

  const deleteRoomType = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/deleteRoomTypes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete room type');
      }
      await fetchRoomTypes();
      createNotification({
        type: 'Deleted',
        description: `Room type with ID "${id}" was removed.`,
        role: 'employee',
      });
    } catch (error) {
      console.error('Error deleting room type:', error);
    }
  }, [fetchRoomTypes, createNotification]);

  useEffect(() => {
    fetchRoomTypes();
  }, [fetchRoomTypes]);

  return (
    <RoomTypeContext.Provider
      value={{ roomTypes, fetchRoomTypes, addRoomType, updateRoomType, deleteRoomType }}
    >
      {children}
    </RoomTypeContext.Provider>
  );
};

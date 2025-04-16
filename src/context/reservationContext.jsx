import React, { createContext, useContext, useState, useEffect } from 'react';

const ReservationContext = createContext();

export const useReservationsContext = () => useContext(ReservationContext);

export const ReservationsProvider = ({ children }) => {
  const [reservationsData, setReservationsData] = useState([]);
  const [deleteData, setDeleteData] = useState(0);
  const [saveNotes, setSaveNotes] = useState(0);

  // Use environment variable for the API base URL
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const fetchReservations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/getReservations`);
      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }
      const reservationsData = await response.json();
      setReservationsData(reservationsData);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [deleteData, saveNotes]);

  const contextValue = {
    reservationsData,
    fetchReservations,
    setReservationsData,
    deleteData,
    setDeleteData,
    saveNotes,
    setSaveNotes,
  };

  return (
    <ReservationContext.Provider value={contextValue}>
      {children}
    </ReservationContext.Provider>
  );
};
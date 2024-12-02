import React, { createContext, useContext, useState, useEffect } from 'react';

const ReservationContext = createContext();

export const useReservationsContext = () => useContext(ReservationContext);

export const ReservationsProvider = ({ children }) => {
  const [reservationsData, setReservationsData] = useState([]); 
  const [deleteData, setDeleteData] = useState(0);
  const [saveNotes, setSaveNotes] = useState(0)

  const fetchReservations = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getReservations`);
      if (!response.ok) {
        throw new Error("Failed to fetch guests");
      }
      const reservationsData = await response.json();
      setReservationsData(reservationsData);
    } catch (error) {
      console.error("Error fetching Guests", error);
    }
  };


  useEffect(() => {
    fetchReservations();
  }, [deleteData, setDeleteData]);



  const contextValue = {
    reservationsData,
    fetchReservations,
    setReservationsData,
    deleteData,
    setDeleteData,
    saveNotes,
    setSaveNotes
  };

  return (
    <ReservationContext.Provider value={contextValue}>
      {children}
    </ReservationContext.Provider>
  );
};
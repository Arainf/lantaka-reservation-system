import React, { createContext, useContext, useState, useEffect } from 'react';

const ReservationContext = createContext();

export const useReservationsContext = () => useContext(ReservationContext);

export const ReservationsProvider = ({ children }) => {
  const [reservationsData, setReservationsData] = useState([]); 

  const fetchReservations = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reservations`);
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
  }, []);

  console.log("guests data:" , reservationsData);


  const contextValue = {
    reservationsData
  };

  return (
    <ReservationContext.Provider value={contextValue}>
      {children}
    </ReservationContext.Provider>
  );
};
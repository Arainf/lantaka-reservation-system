import React, { createContext, useContext, useState, useEffect } from 'react';

const GuestContext = createContext();

export const useGuestContext = () => useContext(GuestContext);

export const GuestProvider = ({ children }) => {
  const [guestsData, setGuestsData] = useState([]); 

  const fetchGuests = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/guests`);
      if (!response.ok) {
        throw new Error("Failed to fetch guests");
      }
      const dataGuest = await response.json();
      setGuestsData(dataGuest);
    } catch (error) {
      console.error("Error fetching Guests", error);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  console.log("guests data:" , guestsData);


  const contextValue = {
    guestsData
  };

  return (
    <GuestContext.Provider value={contextValue}>
      {children}
    </GuestContext.Provider>
  );
};
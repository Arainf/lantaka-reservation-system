import React, { createContext, useContext, useState, useEffect } from 'react';

const RoomVenueContentsContext = createContext();

export const useRoomVenueContentsContext = () => useContext(RoomVenueContentsContext);

export const RoomVenueContentsProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [venues, setVenues] = useState([]);
  const [room_Types, setRoom_Types] = useState([]);

  const fetchRoomAndVenue = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getRoomandVenue`);
      if (!response.ok) {
        throw new Error("Failed to fetch room and venue data");
      }
      const data = await response.json();
      setRooms(data.rooms || []); // Assuming the API response has a `rooms` field
      setVenues(data.venues || []); // Assuming the API response has a `venues` field
    } catch (error) {
      console.error("Error fetching room and venue data:", error);
    }
  };

  const fetchRoomTypes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getRoomTypes`);
      if (!response.ok) {
        throw new Error("Failed to fetch room types");
      }
      const data = await response.json();
      setRoom_Types(data || []); // Assuming the API response has a `room_types` field
    } catch (error) {
      console.error("Error fetching room types:", error);
    }
  }

  useEffect(() => {
    fetchRoomAndVenue();
    fetchRoomTypes();
  }, []);

  const contextValue = {
    rooms,
    venues,
    setRooms,
    setVenues,
    fetchRoomAndVenue,
    room_Types,
  };

  return (
    <RoomVenueContentsContext.Provider value={contextValue}>
      {children}
    </RoomVenueContentsContext.Provider>
  );
};

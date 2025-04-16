import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { formatDateToYYYYMMDD } from "@/utils/colorsUtils";
import axios from 'axios';
import moment from 'moment';

// Use environment variable for the API base URL
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// User Context
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    const storedUserData = localStorage.getItem('userData');

    let parsedUserData = null;
    if (storedUserData) {
      try {
        parsedUserData = JSON.parse(storedUserData);
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
      }
    }

    if (storedRole) {
      setUserRole(storedRole);
    }

    if (parsedUserData) {
      setUserData(parsedUserData);
    }

    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({ userRole, userData, setUserRole, setUserData, loading }),
    [userRole, userData]
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Account Context
export const AccountContext = createContext(null);

export const useAccountContext = () => useContext(AccountContext);

export const AccountProvider = ({ children }) => {
  const [accountData, setAccountData] = useState(null);

  const fetchAccountData = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/accounts`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setAccountData(data);
    } catch (error) {
      console.error('Error fetching account data:', error);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  return (
    <AccountContext.Provider value={{ accountData, fetchAccountData }}>
      {children}
    </AccountContext.Provider>
  );
};

// Data Context
export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource(`${API_BASE_URL}/CustomerData`);

    eventSource.onmessage = (event) => {
      const updatedData = JSON.parse(event.data);
      setData(updatedData);
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      eventSource.close();
    };

    // Cleanup on component unmount
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

// Reservation Context
export const ReservationContext = createContext();

export const useReservations = () => useContext(ReservationContext);

export const ReservationProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [bookingSummary, setBookingSummary] = useState({ total: 0, rooms: 0, venues: 0 });
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/getreservationCalendar`);
      const formattedEvents = response.data.map(event => ({
        reservation: event.reservationid,
        id: event.id,
        title: `${event.id} - ${event.guests}`,
        start: moment(`${event.dateStart}T${event.checkIn}`).toDate(),
        end: moment(`${event.dateEnd}T${event.checkOut}`).toDate(),
        allDay: true,
        resource: {
          employee: event.employee,
          guests: event.guests,
          type: event.type,
          status: event.status,
        },
      }));

      const groupedEvents = groupEventsByDay(formattedEvents);
      setEvents(groupedEvents);
      updateBookingSummary(formattedEvents);
      updateUpcomingBookings(formattedEvents);
      generateRecentActivities(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const groupEventsByDay = (events) => {
    const grouped = events.reduce((acc, event) => {
      const dateKey = moment(event.start).format('YYYY-MM-DD');
      if (!acc[dateKey]) {
        acc[dateKey] = { rooms: [], venues: [] };
      }
      if (event.resource.type.toLowerCase() === 'room') {
        acc[dateKey].rooms.push(event);
      } else if (event.resource.type.toLowerCase() === 'venue') {
        acc[dateKey].venues.push(event);
      }
      return acc;
    }, {});

    return Object.entries(grouped).map(([date, { rooms, venues }]) => ({
      start: moment(date).toDate(),
      end: moment(date).toDate(),
      allDay: true,
      title: `${rooms.length + venues.length} Bookings`,
      extendedProps: { rooms, venues, date },
    }));
  };

  const updateBookingSummary = (events) => {
    const summary = events.reduce((acc, event) => {
      acc.total++;
      if (event.resource.type.toLowerCase() === 'room') {
        acc.rooms++;
      } else if (event.resource.type.toLowerCase() === 'venue') {
        acc.venues++;
      }
      return acc;
    }, { total: 0, rooms: 0, venues: 0 });
    setBookingSummary(summary);
  };

  const updateUpcomingBookings = (events) => {
    const upcoming = events
      .filter(event => moment(event.start).isAfter(moment()))
      .sort((a, b) => moment(a.start).diff(moment(b.start)))
      .slice(0, 5);
    setUpcomingBookings(upcoming);
  };

  const generateRecentActivities = (events) => {
    const activities = events
      .sort((a, b) => moment(b.start).diff(moment(a.start)))
      .slice(0, 5)
      .map(event => ({
        id: event.id,
        action: `${event.resource.type} ${event.id} ${event.resource.status}`,
        time: moment(event.start).fromNow(),
      }));
    setRecentActivities(activities);
  };

  return (
    <ReservationContext.Provider value={{ events, bookingSummary, upcomingBookings, recentActivities, fetchEvents }}>
      {children}
    </ReservationContext.Provider>
  );
};

// Initialize the context
const RoomandVenueContext = createContext();

// Custom hook to use the RoomandVenueContext
export const useRoomVenueProvider = () => {
  return useContext(RoomandVenueContext);
};

// Provider component
export const RoomandVenueProvider = ({ children }) => {
  const [availableRooms, setAvailableRooms] = useState({
    double_rooms: [],
    triple_rooms: [],
    matrimonial_rooms: [],
  });
  const [availableVenues, setAvailableVenues] = useState({
    venues_holder: [],
  });
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedVenues, setSelectedVenues] = useState([]);
  const [reservationType, setReservationType] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  // Fetch all available rooms when the component mounts
  const fetchEverythingAvailable = async () => {
    setIsFetching(true); // Set loading state to true
    try {
      // Make the fetch request to your API
      const response = await fetch(`${API_BASE_URL}/api/everythingAvailable`);

      // Check if the response is not OK
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the response data as JSON
      const data = await response.json();

      // Update the state with the fetched data
      setAvailableRooms({
        double_rooms: data.double_rooms.map((room) => ({
          ...room,
          is_available: room.room_status, // Adjust based on the room data structure
        })),
        triple_rooms: data.triple_rooms.map((room) => ({
          ...room,
          is_available: room.room_status,
        })),
        matrimonial_rooms: data.matrimonial_rooms.map((room) => ({
          ...room,
          is_available: room.room_status,
        }))
      });
      setAvailableVenues({
        venues_holder: data.venues_holder.map((room) => ({
          ...room,
          is_available: room.room_status,
        }))
      });
    } catch (error) {
      console.error("Error fetching everything available:", error); // Log any errors
    } finally {
      setIsFetching(false); // Set loading state to false after the fetch
    }
  };

  // Fetch available rooms based on the selected date range and reservation type
  const fetchAvailableRoom = async (dateRangeRoom) => {
    if (!dateRangeRoom) return;

    const { from, to } = dateRangeRoom;
    if (!from || !to) return;

    const formattedFrom = formatDateToYYYYMMDD(from);
    const formattedTo = formatDateToYYYYMMDD(to);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/availableRooms/${formattedFrom}/${formattedTo}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const availableData = await response.json();

      setAvailableRooms({
        double_rooms: availableData.double_rooms,
        triple_rooms: availableData.triple_rooms,
        matrimonial_rooms: availableData.matrimonial_rooms,
      });
    } catch (error) {
      console.error("Error fetching available rooms:", error);
    }
  };

  const fetchAvailableVenue = async (dateRangeVenue) => {
    if (!dateRangeVenue) return;

    const { from, to } = dateRangeVenue;
    if (!from || !to) return;

    const formattedFrom = formatDateToYYYYMMDD(from);
    const formattedTo = formatDateToYYYYMMDD(to);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/availableVenues/${formattedFrom}/${formattedTo}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const availableData = await response.json();

      setAvailableVenues({
        venues_holder: availableData.venues_holder,
      });
    } catch (error) {
      console.error("Error fetching available Venues:", error);
    }
  }

  // Expose the state and functions to be used by the components
  const contextValue = {
    availableRooms,
    availableVenues,
    selectedRooms,
    selectedVenues,
    reservationType,
    setReservationType,
    setSelectedRooms,
    setSelectedVenues,
    fetchAvailableRoom,
    fetchAvailableVenue,
    fetchEverythingAvailable,
    isFetching,
  };

  return (
    <RoomandVenueContext.Provider value={contextValue}>
      {children}
    </RoomandVenueContext.Provider>
  );
};
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const HeroContext = createContext();

export function HeroProvider({ children }) {
  const [data, setData] = useState(null);
  const [calendarReservations, setCalendarReservations] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(false);
  const [error, setError] = useState(null);

  // Use environment variable for the API base URL
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingCards(true);
        const response = await fetch(`${API_BASE_URL}/api/getCards`);
        if (!response.ok) {
          throw new Error('Failed to fetch card data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoadingCards(false);
      }
    };

    fetchData();
  }, [API_BASE_URL]);

  useEffect(() => {
    const fetchCalendarReservations = async () => {
      try {
        setIsLoadingCalendar(true);
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        const response = await fetch(`${API_BASE_URL}/api/getreservationCalendar/${formattedDate}`);
        if (!response.ok) {
          throw new Error('Failed to fetch calendar reservations');
        }
        const reservationsData = await response.json();
        setCalendarReservations(reservationsData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch calendar reservations'));
      } finally {
        setIsLoadingCalendar(false);
      }
    };

    fetchCalendarReservations();
  }, [selectedDate, API_BASE_URL]);

  const updateSelectedDate = (newDate) => {
    setSelectedDate(newDate);
  };

  const isLoading = isLoadingCards || isLoadingCalendar;

  return (
    <HeroContext.Provider
      value={{
        data,
        isLoading,
        error,
        calendarReservations,
        selectedDate,
        updateSelectedDate,
      }}
    >
      {children}
    </HeroContext.Provider>
  );
}

HeroProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useHero() {
  const context = useContext(HeroContext);
  if (context === undefined) {
    throw new Error('useHero must be used within a HeroProvider');
  }
  return context;
}
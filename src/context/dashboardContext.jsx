import React, { createContext, useContext, useState, useEffect } from 'react';

const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('daily');
  const [startDate, setStartDate] = useState(() => {
    // Ensure consistent date handling by setting time to start of day
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    if (viewMode === 'monthly') {
      date.setMonth(date.getMonth() - 2);
      date.setDate(1);
    } else {
      date.setDate(date.getDate() - 7);
    }
    return date;
  });
  
  const [endDate, setEndDate] = useState(() => {
    // Ensure consistent date handling by setting time to end of day
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    if (viewMode === 'monthly') {
      date.setMonth(date.getMonth() + 1);
      date.setDate(0);
    }
    return date;
  });

  // Update date range when view mode changes
  useEffect(() => {
    const now = new Date();
    now.setHours(23, 59, 59, 999);
    
    if (viewMode === 'monthly') {
      const newStartDate = new Date(now);
      newStartDate.setMonth(now.getMonth() - 2);
      newStartDate.setDate(1);
      newStartDate.setHours(0, 0, 0, 0);
      setStartDate(newStartDate);

      const newEndDate = new Date(now);
      newEndDate.setMonth(newEndDate.getMonth() + 1);
      newEndDate.setDate(0);
      newEndDate.setHours(23, 59, 59, 999);
      setEndDate(newEndDate);
    } else {
      const newStartDate = new Date(now);
      newStartDate.setDate(now.getDate() - 7);
      newStartDate.setHours(0, 0, 0, 0);
      setStartDate(newStartDate);
      setEndDate(now);
    }
  }, [viewMode]);

  const fetchDashboardData = async (start, end) => {
    setLoading(true);
    try {
      // Ensure consistent date format for API calls
      const formattedStartDate = start.toISOString().split('T')[0];
      const formattedEndDate = end.toISOString().split('T')[0];
      
      const response = await fetch(
        `http://localhost:5000/api/dashboardData?startDate=${formattedStartDate}&endDate=${formattedEndDate}&viewMode=${viewMode}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(startDate, endDate);
  }, [startDate, endDate, viewMode]);

  const contextValue = {
    dashboardData,
    loading,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    viewMode,
    setViewMode,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};


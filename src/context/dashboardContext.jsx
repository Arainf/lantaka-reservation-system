import React, { createContext, useContext, useState, useEffect } from 'react';

const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('monthly');

  // Initialize dates based on view mode
  const initializeDates = (mode) => {
    const now = new Date();
    let start = new Date(now);
    let end = new Date(now);
    
    if (mode === 'monthly') {
      // For monthly view: Start from beginning of 2 months ago, end at end of current month
      start.setMonth(now.getMonth() - 2, 1);
      end.setMonth(end.getMonth() + 1, 0);
    } else {
      // For daily view: Start from 6 days ago, end today
      start.setDate(now.getDate() - 6);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    }

    return { start, end };
  };

  const [dateRange, setDateRange] = useState(() => initializeDates(viewMode));

  // Update dates when view mode changes
  useEffect(() => {
    const newDateRange = initializeDates(viewMode);
    setDateRange(newDateRange);
  }, [viewMode]);

  const fetchDashboardData = async (start, end) => {
    setLoading(true);
    try {
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

  // Fetch data when dates change
  useEffect(() => {
    fetchDashboardData(dateRange.start, dateRange.end);
  }, [dateRange, viewMode]);

  const setStartDate = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    setDateRange(prev => ({
      ...prev,
      start: newDate
    }));
  };

  const setEndDate = (date) => {
    const newDate = new Date(date);
    newDate.setHours(23, 59, 59, 999);
    setDateRange(prev => ({
      ...prev,
      end: newDate
    }));
  };

  const contextValue = {
    dashboardData,
    loading,
    startDate: dateRange.start,
    endDate: dateRange.end,
    setStartDate,
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
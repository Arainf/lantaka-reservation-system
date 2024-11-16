import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Dashboard context
const DashboardContext = createContext();

// Custom hook to use the Dashboard context
export const useDashboardContext = () => useContext(DashboardContext);

// Dashboard provider to wrap the application with context data
export const DashboardProvider = ({ children }) => {
  // State for various dashboard data
  const [occupancyData, setOccupancyData] = useState([]);
  const [visitorData, setVisitorData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [roomTypeData, setRoomTypeData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example: Fetching data from an API (you can replace this with your actual API call)
  const fetchDashboardData = async () => {
    try {
      // Simulating fetching data with setTimeout
      setTimeout(() => {
        setOccupancyData([
          { month: "Jan", occupancy: 65 },
          { month: "Feb", occupancy: 70 },
          { month: "Mar", occupancy: 75 },
          { month: "Apr", occupancy: 80 },
          { month: "May", occupancy: 85 },
          { month: "Jun", occupancy: 90 },
          { month: "Jul", occupancy: 95 },
          { month: "Aug", occupancy: 100 },
          { month: "Sep", occupancy: 90 },
          { month: "Oct", occupancy: 85 },
          { month: "Nov", occupancy: 80 },
          { month: "Dec", occupancy: 75 },
        ]);
        setVisitorData([
          { name: "Venue", visitors: 275, fill: "hsl(216, 72%, 50%)" },
          { name: "Room", visitors: 200, fill: "hsl(216, 72%, 60%)" },
          { name: "Other", visitors: 287, fill: "hsl(216, 72%, 70%)" },
        ]);
        setRevenueData([
          { month: "Jan", revenue: 10000 },
          { month: "Feb", revenue: 12000 },
          { month: "Mar", revenue: 11000 },
          { month: "Apr", revenue: 15000 },
          { month: "May", revenue: 18000 },
          { month: "Jun", revenue: 24000 },
          { month: "Jul", revenue: 22000 },
          { month: "Aug", revenue: 19000 },
          { month: "Sep", revenue: 17000 },
          { month: "Oct", revenue: 16000 },
          { month: "Nov", revenue: 20000 },
          { month: "Dec", revenue: 22000 },
        ]);
        setRoomTypeData([
          { roomType: "Double Bed", bookingFrequency: 75, avgStayDuration: 3.1 },
          { roomType: "Triple Bed", bookingFrequency: 45, avgStayDuration: 4.2 },
          { roomType: "Matrimonial", bookingFrequency: 35, avgStayDuration: 3.8 },
        ]);
        setLoading(false); // Stop loading once data is fetched
      }, 300); 
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  // Call the fetch function on mount
  useEffect(() => {
    fetchDashboardData();
  }, []); // Empty dependency array means this runs once after the initial render

  // The value provided to the context consumers
  const contextValue = {
    occupancyData,
    visitorData,
    revenueData,
    roomTypeData,
    loading,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

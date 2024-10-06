import React, { createContext, useState, useEffect, useMemo } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    const storedUserData = localStorage.getItem('userData');
    const storedUserImg = localStorage.getItem('userImg');

    let parsedUserData = null;
    if (storedUserData) {
      try {
        parsedUserData = JSON.parse(storedUserData);
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
      }
    }

    if (storedUserImg) {
      setUserImg(storedUserImg);
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
    () => ({ userRole, userData, userImg, setUserRole, setUserData, setUserImg, loading }),
    [userRole, userData, userImg]
  );

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const DataContext = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource('https://localhost:5000/CustomerData');

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



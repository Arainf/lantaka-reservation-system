import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import LoginPage from '@/auth/login/login-page'; 
import Dashboard from '@/pages/(admin-pages)/dashboard';
import Reservation from '@/pages/(admin-pages)/reservation';
import { UserContext } from '@/context/contexts';
import ProtectedRoute from './protectedRoutes'; 
import Unauthorize from '@/pages/unathorize'

const AppRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUsername] = useState("");
  const [userRole, setUserRole] = useState(""); 

  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole'); 
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userName, setUsername, userRole, setUserRole }}>
      <Routes>
        {/* Redirect to login if no role */}
        <Route path="/" element={<Navigate to="/auth/login" />} />
        
        {/* Login Page */}
        <Route path="/auth/login" element={<LoginPage />} />

        {/* Admin Dashboard: Protected for Admin Role */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={<Dashboard sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
              allowedRoles={['Administrator']}
            />
          }
        />

        {/* Unauthorized page */}
        <Route path="/unauthorized" element={< Unauthorize />} />
        
        {/* Redirect based on user role after login */}
        <Route
          path="/auth/login"
          element={
            userRole === 'Administrator' ? (
              <Navigate to="/dashboard" />
            ) : userRole === 'Employee' ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginPage />
            )
          }
        />
      </Routes>
    </UserContext.Provider>
  );
};

export default AppRoutes;

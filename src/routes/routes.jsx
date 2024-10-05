import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import LoginPage from '@/auth/login/login-page';
import Dashboard from '@/pages/(admin-pages)/dashboard';
import DashboardRegistrationForm from '@/pages/test/test';
import Reservation from '@/pages/(admin-pages)/reservation';
import { Component as BarChartComponent } from '@/components/common/charts/BarChartComponent';
import { UserContext } from '@/context/contexts';
import ProtectedRoute from './protectedRoutes';

const AppRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");

  const isDevMode = true; // Set this to true to disable route protection for developers

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
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/login" element={<LoginPage />} />
        
        {/* Admin Dashboard: Protected, but bypassable in Dev Mode */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={<Dashboard sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
              allowedRoles={['Administrator']} // Add actual roles here
              isDevMode={isDevMode} // Enable/disable protection based on dev mode
            />
          }
        />
        
        <Route
          path="/reservations"
          element={
            <ProtectedRoute
              element={<Reservation sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
              allowedRoles={['Administrator']} // Add actual roles here
              isDevMode={isDevMode}
            />
          }
        />

        {/* Test Route */}
        <Route path="/test" element={<DashboardRegistrationForm />} />

        {/* Unauthorized page */}
        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />

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

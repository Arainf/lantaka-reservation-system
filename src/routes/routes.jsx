import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import LoginPage from '@/auth/login/login-page'; // Your Login Page
import Dashboard from '@/pages/(admin-pages)/dashboard';
import DashboardRegistrationForm from '@/pages/test/test';
import { Component as BarChartComponent } from '@/components/common/charts/BarChartComponent';
import { UserContext } from '@/context/contexts';
import ProtectedRoute from './protectedRoutes'; // Import the ProtectedRoute component

const AppRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUsername] = useState("");
  const [userRole, setUserRole] = useState(""); // State to manage user roles (admin/employee)

  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  // Effect to simulate a role being set after login (replace with actual login logic)
  useEffect(() => {
    // Simulate setting role (admin or employee) after login
    const storedRole = localStorage.getItem('userRole'); // Assume role is stored in localStorage after login
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

        {/* Employee Dashboard: Placeholder Route (uncomment when ready) */}
        {/* 
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute
              element={<EmployeeDashboard sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
              allowedRoles={['employee']}
            />
          }
        /> 
        */}

        {/* Test Route for possible design */}
        <Route path="/test" element={<DashboardRegistrationForm/>} />

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

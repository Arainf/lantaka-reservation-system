import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import LoginPage from '@/auth/login/login-page';
import Dashboard from '@/pages/(admin-pages)/dashboard';
<<<<<<< HEAD
=======
// import DashboardRegistrationForm from '@/pages/test/test';
>>>>>>> 40256dc4164b9835b283096d41cf7cc8493d6bcd
import Reservation from '@/pages/(admin-pages)/reservation';
import { Component as BarChartComponent } from '@/components/common/charts/BarChartComponent';
import { UserContext } from '@/context/contexts';
import ProtectedRoute from './protectedRoutes';
import Unauthorize from '@/pages/unathorize';

const AppRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Access context values
  const { userRole, userData } = useContext(UserContext);

  const isDevMode = true; // Set this to true to disable route protection for developers

  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" />} />
      <Route path="/auth/login" element={<LoginPage />} />

      {/* Admin Dashboard: Protected, but bypassable in Dev Mode */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            element={<Dashboard sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
            allowedRoles={['Administrator']}
            isDevMode={isDevMode}
          />
        }
      />

      <Route
        path="/reservations"
        element={
          <ProtectedRoute
            element={<Reservation sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
            allowedRoles={['Administrator']}
            isDevMode={isDevMode}
          />
        }
      />

<<<<<<< HEAD
=======
      {/* Test Route */}
      {/* <Route path="/test" element={<DashboardRegistrationForm />} /> */}

>>>>>>> 40256dc4164b9835b283096d41cf7cc8493d6bcd
      {/* Unauthorized page */}
      <Route path="/unauthorized" element={<Unauthorize />} />

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
  );
};

export default AppRoutes;

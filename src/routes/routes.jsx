import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import LoginPage from '@/auth/login/login-page';


// import Test Files here
import DashboardRegistrationForm from '@/pages/Rainier-Test/RegistrationForm';



import { Component as BarChartComponent } from '@/components/common/charts/BarChartComponent';
import { UserContext } from '@/context/contexts';
import ProtectedRoute from './protectedRoutes';
import Unauthorize from '@/pages/unathorize';


// admin pages import routes
import AdminDashboard from '@/pages/(admin-pages)/dashboard';
import AdminEventLogs from '@/pages/(admin-pages)/eventlogs';
import AdminReservation from '@/pages/(admin-pages)/reservation';
import AdminGuestList from '@/pages/(admin-pages)/guestlist';

// employee pages import routes
import EmployeeDashboard from '@/pages/(employee-pages)/dashboard';


const AppRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Access context values
  const { userRole, userData } = useContext(UserContext);

  console.log(userRole);
  const isDevMode = false; // Set this to true to disable route protection for developers

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
            element={<AdminDashboard sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
            allowedRoles={['Administrator']}
            isDevMode={isDevMode}
          />
        }
      />

      <Route
        path="/reservations"
        element={
          <ProtectedRoute
            element={<AdminReservation sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
            allowedRoles={['Administrator']}
            isDevMode={isDevMode}
          />
        }
      />
      
      <Route
        path="/guestlist"
        element={
          <ProtectedRoute
            element={<AdminGuestList sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
            allowedRoles={['Administrator']}
            isDevMode={isDevMode}
          />
        }
      />

      <Route
        path="/eventlogs"
        element={
          <ProtectedRoute
            element={<AdminEventLogs sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
            allowedRoles={['Administrator']}
            isDevMode={isDevMode}
          />
        }
      />




      {/* Admin Dashboard: Protected, but bypassable in Dev Mode */}
      <Route
        path="/home"
        element={
          <ProtectedRoute
            element={<EmployeeDashboard toggleSidebar={toggleSidebar} />}
            allowedRoles={['Employee', 'Administrator']}
            isDevMode={isDevMode}
          />
        }
      />

      {/* Unauthorized page */}
      <Route path="/unauthorized" element={<Unauthorize />} />



      {/* Test Routes */}

      <Route path="/Rainiertest" element={<DashboardRegistrationForm />} />
    </Routes>
  );
};

export default AppRoutes;

import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import LoginPage from '@/auth/login/login-page';


// import Test Files here
import Rainiertest from '@/pages/Rainier-Test/rainiertest';
import Keantest from '@/pages/Kean-test/kean'



import { Component as BarChartComponent } from '@/components/common/charts/BarChartComponent';
import { UserContext } from '@/context/contexts';
import ProtectedRoute from './protectedRoutes';
import Unauthorize from '@/pages/unathorize';


// admin pages import routes
import AdminDashboard from '@/pages/(admin-pages)/dashboard';
import AdminEventLogs from '@/pages/(admin-pages)/eventlogs';
import AdminReservation from '@/pages/(admin-pages)/reservation';
import AdminGuestList from '@/pages/(admin-pages)/guestlist';
import AdminAccounts from '@/pages/(admin-pages)/accounts';
// employee pages import routes
import EmployeeDashboard from '@/pages/(employee-pages)/dashboard';
import JoshTest from '@/pages/Josh-Test/JoshTest';


const AppRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Access context values
  const { userRole, userData } = useContext(UserContext);

  console.log(userRole);
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

<Route
        path="/accounts"
        element={
          <ProtectedRoute
            element={<AdminAccounts sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
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
            allowedRoles={['Employee']}
            isDevMode={isDevMode}
          />
        }
      />

      {/* Unauthorized page */}
      <Route path="/unauthorized" element={<Unauthorize />} />



      {/* Test Routes */}

      <Route path="/Rainiertest" element={<Rainiertest />} />
      <Route path="/Joshtest" element={<JoshTest/>} />
      <Route path="/Keantest" element={<Keantest/>} />
    </Routes>
  );
};

export default AppRoutes;

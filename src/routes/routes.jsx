import { Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import LoginPage from "@/auth/login/login-page";
import { AccountProvider } from "@/context/contexts";

// import Test Files here
import DashboardRegistrationForm from "@/components/common/login-form/RegistrationForm";

import { Component as BarChartComponent } from "@/components/common/charts/BarChartComponent";
import { UserContext } from "@/context/contexts";
import ProtectedRoute from "./protectedRoutes";
import Unauthorize from "@/pages/unathorize";

// admin pages import routes
import AdminDashboard from "@/pages/(admin-pages)/dashboard";
import AdminReservation from "@/pages/(admin-pages)/reservation";
import AdminGuestList from "@/pages/(admin-pages)/guestlist";
import AdminAccounts from "@/pages/(admin-pages)/accounts";
import AdminRoomVenue from "@/pages/(admin-pages)/roomvenue";
import AdminUtilies from "@/pages/(admin-pages)/utilities";
// employee pages import routes
import Home from "@/pages/(employee-pages)/Home";
import Reservation from "@/pages/(employee-pages)/Reservation";
import Account from "@/pages/(employee-pages)/Account";
import CalendarPage from "@/pages/(employee-pages)/Calendar";
import Bookings from "@/pages/(employee-pages)/Bookings";

const AppRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Access context values
  const { userRole, userData } = useContext(UserContext);

  console.log(userRole);
  const isDevMode = true; // Set this to true to disable route protection for developers

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
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
            element={
              <AdminDashboard
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            }
            allowedRoles={["Administrator"]}
            isDevMode={isDevMode}
          />
        }
      />

      <Route
        path="/reservations"
        element={
          <ProtectedRoute
            element={
              <AdminReservation
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            }
            allowedRoles={["Administrator"]}
            isDevMode={isDevMode}
          />
        }
      />

      <Route
        path="/guestlist"
        element={
          <ProtectedRoute
            element={
              <AdminGuestList
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            }
            allowedRoles={["Administrator"]}
            isDevMode={isDevMode}
          />
        }
      />
      
      <Route
        path="/accounts"
        element={
          <ProtectedRoute
            element={
              <AdminAccounts
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            }
            allowedRoles={["Administrator"]}
            isDevMode={isDevMode}
          />
        }
      />
      
      <Route
        path="/roomvenue"
        element={
          <ProtectedRoute
            element={
              <AdminRoomVenue
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            }
            allowedRoles={["Administrator"]}
            isDevMode={isDevMode}
          />
        }
      />

      <Route
        path="/utilities"
        element={
          <ProtectedRoute
            element={
              <AdminUtilies
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            }
            allowedRoles={["Administrator"]}
            isDevMode={isDevMode}
          />
        }
      />



      {/* Admin Dashboard: Protected, but bypassable in Dev Mode */}
      <Route
        path="/Home"
        element={
          <ProtectedRoute
            element={<Home toggleSidebar={toggleSidebar} />}
            allowedRoles={["Employee", "Administrator"]}
            isDevMode={isDevMode}
          />
        }
      />
      <Route
        path="/Reservation"
        element={
          <ProtectedRoute
            element={<Reservation toggleSidebar={toggleSidebar} />}
            allowedRoles={["Employee" , "Administrator"]}
            isDevMode={isDevMode}
          />
        }
      />
      <Route
        path="/Bookings"
        element={
          <ProtectedRoute
            element={<Bookings />}
            allowedRoles={["Employee" , "Administrator"]}
            isDevMode={isDevMode}
          />
        }
      />
      <Route
        path="/Account"
        element={
          <ProtectedRoute
            element={<Account />}
            allowedRoles={["Employee" , "Administrator"]}
            isDevMode={isDevMode}
          />
        }
      />

    <Route
            path="/Calendar"
            element={
              <ProtectedRoute
                element={<CalendarPage />}
                allowedRoles={["Employee" , "Administrator"]}
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

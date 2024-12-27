import React, { useState, useContext, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "@/context/contexts";
import LoadingOverlay from "@/components/ui/loadingOverlay";

// Lazy load components
const LazyProtectedRoute = React.lazy(() => import('./protectedRoutes'));
const LazyLoginPage = React.lazy(() => import('@/auth/login/login-page'));
const LazyUnauthorize = React.lazy(() => import('@/pages/unathorize'));
const LazyAdminDashboard = React.lazy(() => import('@/pages/(admin-pages)/dashboard'));
const LazyAdminReservation = React.lazy(() => import('@/pages/(admin-pages)/reservation'));
const LazyAdminGuestList = React.lazy(() => import('@/pages/(admin-pages)/guestlist'));
const LazyAdminAccounts = React.lazy(() => import('@/pages/(admin-pages)/accounts'));
const LazyAdminRoomVenue = React.lazy(() => import('@/pages/(admin-pages)/roomvenue'));
const LazyAdminUtilies = React.lazy(() => import('@/pages/(admin-pages)/utilities'));
const LazyHome = React.lazy(() => import('@/pages/(employee-pages)/Home'));
const LazyReservation = React.lazy(() => import('@/pages/(employee-pages)/Reservation'));
const LazyAccount = React.lazy(() => import('@/pages/(employee-pages)/Account'));
const LazyCalendarPage = React.lazy(() => import('@/pages/(employee-pages)/Calendar'));
const LazyBookings = React.lazy(() => import('@/pages/(employee-pages)/Bookings'));

const AppRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { userRole } = useContext(UserContext);
  const isDevMode = false; // Set this to true to disable route protection for developers

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  // Function to wrap lazy-loaded components and manage loading state
  const withLoadingState = (Component) => (props) => {
    React.useEffect(() => {
      setIsLoading(false);
      return () => setIsLoading(true);
    }, []);

    return <Component {...props} />;
  };

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <Suspense fallback={<LoadingOverlay isLoading={true} />}>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/login" element={<LazyLoginPage />} />

          {/* Admin Routes */}
          <Route path="/dashboard" element={
            <LazyProtectedRoute
              element={withLoadingState(LazyAdminDashboard)({ sidebarOpen, toggleSidebar })}
              allowedRoles={["Administrator"]}
              isDevMode={isDevMode}
            />
          } />
          <Route path="/reservations" element={
            <LazyProtectedRoute
              element={withLoadingState(LazyAdminReservation)({ sidebarOpen, toggleSidebar })}
              allowedRoles={["Administrator"]}
              isDevMode={isDevMode}
            />
          } />
          <Route path="/guestlist" element={
            <LazyProtectedRoute
              element={withLoadingState(LazyAdminGuestList)({ sidebarOpen, toggleSidebar })}
              allowedRoles={["Administrator"]}
              isDevMode={isDevMode}
            />
          } />
          <Route path="/accounts" element={
            <LazyProtectedRoute
              element={withLoadingState(LazyAdminAccounts)({ sidebarOpen, toggleSidebar })}
              allowedRoles={["Administrator"]}
              isDevMode={isDevMode}
            />
          } />
          <Route path="/roomvenue" element={
            <LazyProtectedRoute
              element={withLoadingState(LazyAdminRoomVenue)({ sidebarOpen, toggleSidebar })}
              allowedRoles={["Administrator"]}
              isDevMode={isDevMode}
            />
          } />
          <Route path="/utilities" element={
            <LazyProtectedRoute
              element={withLoadingState(LazyAdminUtilies)({ sidebarOpen, toggleSidebar })}
              allowedRoles={["Administrator"]}
              isDevMode={isDevMode}
            />
          } />

          {/* Employee Routes */}
          <Route path="/Home" element={
            <LazyProtectedRoute
              element={withLoadingState(LazyHome)({ toggleSidebar })}
              allowedRoles={["Employee", "Administrator"]}
              isDevMode={isDevMode}
            />
          } />
          <Route path="/Reservation" element={
            <LazyProtectedRoute
              element={withLoadingState(LazyReservation)({ toggleSidebar })}
              allowedRoles={["Employee", "Administrator"]}
              isDevMode={isDevMode}
            />
          } />
          <Route path="/Bookings" element={
            <LazyProtectedRoute
              element={withLoadingState(LazyBookings)()}
              allowedRoles={["Employee", "Administrator"]}
              isDevMode={isDevMode}
            />
          } />
          <Route path="/Account" element={
            <LazyProtectedRoute
              element={withLoadingState(LazyAccount)()}
              allowedRoles={["Employee", "Administrator"]}
              isDevMode={isDevMode}
            />
          } />
          <Route path="/Calendar" element={
            <LazyProtectedRoute
              element={withLoadingState(LazyCalendarPage)()}
              allowedRoles={["Employee", "Administrator"]}
              isDevMode={isDevMode}
            />
          } />

          {/* Unauthorized page */}
          <Route path="/unauthorized" element={<LazyUnauthorize />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;


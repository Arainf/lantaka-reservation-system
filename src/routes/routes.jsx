import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import LoginPage from '@/auth/login/login-page'; // Your Login Page
import Dashboard from '@/pages/(admin-pages)/dashboard';
import Reservation from '@/pages/(admin-pages)/reservation';
import Test from '@/pages/test/test';
import { Component as BarChartComponent } from '@/components/common/charts/BarChartComponent';

const AppRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" />} />
      <Route path="/dashboard" element={<Dashboard sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/reservations" element={<Reservation sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
      <Route path="/test" element={<BarChartComponent />} />
    </Routes>
  );
};

export default AppRoutes;

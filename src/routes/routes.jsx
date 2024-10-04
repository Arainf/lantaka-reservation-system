import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import LoginPage from '@/auth/login/login-page'; // Your Login Page
import Dashboard from '@/pages/(admin-pages)/dashboard';

const AppRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
  setSidebarOpen(prevState => !prevState);
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" />} />
      <Route path="/dashboard" element={<Dashboard sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
      <Route path="/auth/Login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
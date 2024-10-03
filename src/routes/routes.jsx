import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/auth/login/login-page'; // Your Login Page
import Dashboard from '@/pages/(admin-pages)/dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* <Route path="/" element={<Navigate to="/auth/login" />} /> */}
      <Route path="/auth/Login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
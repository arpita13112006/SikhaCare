import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import GirlDashboardPage from './pages/GirlDashboardPage';
import WomanDashboardPage from './pages/WomanDashboardPage';

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/girl-dashboard" element={<GirlDashboardPage />} />
          <Route path="/woman-dashboard" element={<WomanDashboardPage />} />
          <Route path="/women-dashboard" element={<Navigate to="/woman-dashboard" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

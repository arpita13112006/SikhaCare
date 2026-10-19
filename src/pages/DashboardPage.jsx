import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import GirlDashboardPage from './GirlDashboardPage';
import WomanDashboardPage from './WomanDashboardPage';

/**
 * Smart Dashboard Gateway
 * Inspects the authenticated user's selected mode and directs
 * to the exclusive Girl Dashboard or Woman Dashboard.
 */
export default function DashboardPage() {
  const { user } = useUser();

  if (user.mode === 'Girl Mode') {
    return <Navigate to="/girl-dashboard" replace />;
  }

  return <Navigate to="/woman-dashboard" replace />;
}

import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Protected route component that checks for admin authentication
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  const loginTime = localStorage.getItem('adminLoginTime');
  
  // Check if token exists and is not older than 24 hours
  const isAuthenticated = token && loginTime && Date.now() - parseInt(loginTime) <= 24 * 60 * 60 * 1000;
  
  if (!isAuthenticated) {
    // Clear expired tokens
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminLoginTime');
    return <Navigate to="/admin" replace />;
  }
  
  return children;
};

export default ProtectedRoute;


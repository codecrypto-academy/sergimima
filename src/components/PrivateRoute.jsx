import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import Admin from './Admin'; // Assuming Admin component is in the same directory

const PrivateRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;

// Usage example
<Route 
  path="/admin" 
  element={
    <PrivateRoute allowedRoles={['Admins']}>
      <Admin />
    </PrivateRoute>
  } 
/>
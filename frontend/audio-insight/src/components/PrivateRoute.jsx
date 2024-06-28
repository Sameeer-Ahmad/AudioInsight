// ProtectedRoute.js
import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Loading from '../utils/loading/Loading';


const PrivateRoutes = () => {
    const { isAuthenticated, loading } = useContext(AuthContext);// Assuming useAuth provides isAuthenticated state
  if (loading) {
    return <div><Loading/></div>; // Adjust with a spinner or loading indicator
  }


  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login"  />
  );
};

export default PrivateRoutes;

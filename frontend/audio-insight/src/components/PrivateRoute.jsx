import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Loading from '../utils/loading/Loading';


const PrivateRoutes = () => {
    const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) {
    return <div><Loading/></div>; 
  }


  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login"  />
  );
};

export default PrivateRoutes;

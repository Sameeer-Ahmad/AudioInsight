import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../utils/loading/Loading";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Simulate API call success
      setTimeout(() => {
        setIsAuthenticated(true);
        setLoading(false);
      }, 1000); // Adjust time according to your actual API call time
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div> 
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

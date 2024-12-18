import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLogged = sessionStorage.getItem("isLoggedIn") === "true";

  return isLogged ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

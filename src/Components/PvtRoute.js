import React from "react";
import { Navigate } from "react-router-dom";

const PvtRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PvtRoute;

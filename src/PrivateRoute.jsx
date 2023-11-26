import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token || token == "undefined") {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/sign-in" />;
  }

  // Render the protected content if the user is authenticated
  return children;
};

export default PrivateRoute;

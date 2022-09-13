import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const GuestRoute = ({ element }) => {
  const { isAuth } = useSelector((state) => state.auth);

  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  return element;
};

export default GuestRoute;

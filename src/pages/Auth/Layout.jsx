import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Layout = () => {
  const { isAuth } = useSelector((state) => state.auth);
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default Layout;
